import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "GPTBot",
                disallow: "/",
            },
            {
                userAgent: "CCBot",
                disallow: "/",
            },
            {
                userAgent: "ClaudeBot",
                disallow: "/",
            },
            {
                userAgent: "Bytespider",
                disallow: "/",
            },
            {
                userAgent: "Amazonbot",
                disallow: "/",
            },
        ],
    };
}