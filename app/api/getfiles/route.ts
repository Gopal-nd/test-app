import { readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(req:NextRequest,res:NextResponse){
    const uploadeddir = join(process.cwd(),'public','newupload');
    const files = await readdir(uploadeddir)

    return NextResponse.json({
        success:true,file:files
    })
}