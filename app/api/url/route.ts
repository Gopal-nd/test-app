import { NextResponse } from "next/server";

export  async function GET(req:Request,res:Response){
   

    return NextResponse.redirect('https://google.com')
}