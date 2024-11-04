import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const data = await req.json();

    revalidateTag(data.tag);
    
    return NextResponse.json(true);
}