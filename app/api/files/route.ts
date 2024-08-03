import { readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { dirname, join } from "path";

export async function GET(req: NextRequest) {
    try {
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        const files = await readdir(uploadsDir);
        console.log(files)

        return NextResponse.json({ success: true, files });
    } catch (error) {
        console.error('Error reading directory:', error);
        return NextResponse.json({ success: false, message: "Error reading directory" });
    }
}
// const uploaddir = join(process.cwd(),'public','uploads')
// const file = await readdir(uploaddir)