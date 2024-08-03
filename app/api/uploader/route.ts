import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { dirname, join } from "path";

export async function POST(req:NextRequest,res:NextResponse){
    const data = await req.formData()

    const file:File=data.get('file') as File
    if(!file){
        return NextResponse.json({
            status:400
        })
    }
    const bytes = await file.arrayBuffer()
    const buffer:any = Buffer.from(bytes)

    console.log('value of cwd', process.cwd())
    const path = join(process.cwd(),'public','newupload',file.name)
    console.log(path)
    try {
        const dir = dirname(path)
       await mkdir(dir, { recursive: true })

        if(!buffer){
            return NextResponse.json({
                status:400
            })
        }
       await writeFile(path,buffer)

       return NextResponse.json({
        status:200,success:true
    })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status:400
        })
    }


}