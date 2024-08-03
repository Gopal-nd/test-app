import { readdir, stat, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(req: NextRequest) {
    const uploadeddir = join(process.cwd(), 'public', 'newupload');

    try {
        // Check if the directory exists
        await stat(uploadeddir);
    } catch (err:Error|any) {
        if (err.code === 'ENOENT') {
            // Directory does not exist, create it
            await mkdir(uploadeddir, { recursive: true });
        } else {
            return NextResponse.json({ success: false, message: 'Error accessing upload directory' });
        }
    }

    try {
        const files = await readdir(uploadeddir);
        return NextResponse.json({ success: true, files });
    } catch (err) {
        return NextResponse.json({ success: false, message: 'Error reading files from directory' });
    }
}
