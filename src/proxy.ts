import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_ROUTE = 40;
const MAX_REQUESTS_GLOBAL = 120;

const routeRequests = new Map<string, { count: number; resetAt: number }>();
const globalRequests = new Map<string, { count: number; resetAt: number }>();

const BLOCKED_USER_AGENTS = [
    "ahrefs",
    "semrush",
    "mj12bot",
    "dotbot",
    "bytespider",
    "gptbot",
    "chatgpt-user",
    "ccbot",
    "claudebot",
    "anthropic-ai",
    "amazonbot",
    "dataforseo",
    "blexbot",
    "petalbot",
    "yandexbot",
    "baiduspider",
    "sogou",
    "exabot",
    "seznambot",
    "qwantify",
    "duckduckbot",
    "slurp",
    "applebot",
    "facebookexternalhit",
    "meta-externalagent",
    "twitterbot",
    "linkedinbot",
    "pinterestbot",
    "telegrambot",
    "discordbot",
    "whatsapp",
    "scrapy",
    "python-requests",
    "aiohttp",
    "httpx",
    "node-fetch",
    "axios",
    "got",
    "curl",
    "wget",
    "java/",
    "go-http-client",
    "libwww-perl",
    "php/",
    "ruby",
    "mechanize",
    "headlesschrome",
    "phantomjs",
    "puppeteer",
    "playwright",
    "selenium",
];

const BLOCKED_PATH_PARTS = [
    "/wp-admin",
    "/wp-login",
    "/xmlrpc.php",
    "/.env",
    "/config",
    "/admin",
    "/phpmyadmin",
    "/server-status",
    "/.git",
];

function getClientIp(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

function isBlockedUserAgent(userAgent: string): boolean {
    const normalized = userAgent.toLowerCase();

    if (!normalized) {
        return true;
    }

    return BLOCKED_USER_AGENTS.some((bot) => normalized.includes(bot));
}

function isBlockedPath(pathname: string): boolean {
    const normalized = pathname.toLowerCase();

    return BLOCKED_PATH_PARTS.some((path) => normalized.includes(path));
}

function checkRateLimit(
    store: Map<string, { count: number; resetAt: number }>,
    key: string,
    limit: number
): boolean {
    const now = Date.now();
    const current = store.get(key);

    if (!current || current.resetAt < now) {
        store.set(key, {
            count: 1,
            resetAt: now + WINDOW_MS,
        });

        return true;
    }

    if (current.count >= limit) {
        return false;
    }

    current.count += 1;
    store.set(key, current);

    return true;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get("user-agent") || "";
    const ip = getClientIp(request);

    if (isBlockedPath(pathname)) {
        console.warn(`[BLOCKED_PATH] ${ip} | ${pathname} | ${userAgent}`);
        return new NextResponse("Forbidden", { status: 403 });
    }

    if (isBlockedUserAgent(userAgent)) {
        console.warn(`[BLOCKED_UA] ${ip} | ${pathname} | ${userAgent}`);
        return new NextResponse("Forbidden", { status: 403 });
    }

    const globalKey = ip;
    const routeKey = `${ip}:${pathname}`;

    const allowedGlobally = checkRateLimit(
        globalRequests,
        globalKey,
        MAX_REQUESTS_GLOBAL
    );

    if (!allowedGlobally) {
        console.warn(`[RATE_LIMIT_GLOBAL] ${ip} | ${pathname} | ${userAgent}`);
        return new NextResponse("Too Many Requests", { status: 429 });
    }

    const allowedForRoute = checkRateLimit(
        routeRequests,
        routeKey,
        MAX_REQUESTS_PER_ROUTE
    );

    if (!allowedForRoute) {
        console.warn(`[RATE_LIMIT_ROUTE] ${ip} | ${pathname} | ${userAgent}`);
        return new NextResponse("Too Many Requests", { status: 429 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|otf|mp4|webm|mp3|wav)$).*)",
    ],
};