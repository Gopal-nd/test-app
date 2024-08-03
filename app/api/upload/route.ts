import { Buffer } from "buffer";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join, dirname } from "path";

export async function POST(req: NextRequest) {
    const data = await req.formData();

    const file = data.get('file') as File | null;
    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = join(process.cwd(), 'public', 'uploads', file.name);

    try {
        // Ensure the directory exists
        const dir = dirname(filePath);
        await mkdir(dir, { recursive: true });

        // Write the file to the desired location
        await writeFile(filePath, buffer);
        console.log(`File saved at ${filePath}`);
        return NextResponse.json({ success: true, path: filePath });
    } catch (error) {
        console.error('Error saving file:', error);
        return NextResponse.json({ success: false, message: "Error saving file" });
    }
}
