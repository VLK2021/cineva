import { NextRequest, NextResponse } from "next/server";
import { searchMultiLanguages } from "@/src/services";

const MIN_QUERY_LENGTH = 2;

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const query = searchParams.get("query")?.trim() || "";
    const page = Number(searchParams.get("page") || 1);

    if (query.length < MIN_QUERY_LENGTH) {
        return NextResponse.json({
            page: 1,
            results: [],
            total_pages: 0,
            total_results: 0,
        });
    }

    try {
        const data = await searchMultiLanguages({
            query,
            page: Number.isFinite(page) && page > 0 ? page : 1,
        });

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { message: "Search request failed" },
            { status: 500 }
        );
    }
}