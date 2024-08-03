import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req:NextRequest,res:NextResponse){
    const {filename} = await req.json()
try {
    
    const dir = join(process.cwd(),'public','newupload',filename)
    await unlink(dir)

    return NextResponse.json({
        success:true
    })
} catch (error) {
    return NextResponse.json({
        success:false
    })
}
}