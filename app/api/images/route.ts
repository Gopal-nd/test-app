import { readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(req: NextRequest) {
    try {
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        const files = await readdir(uploadsDir);

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        
        
        return NextResponse.json({ success: true, images: imageFiles });
    } catch (error) {
        console.error('Error reading directory:', error);
        return NextResponse.json({ success: false, message: "Error reading directory" });
    }
}
