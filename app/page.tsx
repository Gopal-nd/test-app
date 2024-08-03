 'use client'
import AnimationControle from '@/components/AnimationControle'
import Button from '@/components/Button'
import Scroll from '@/components/Scroll'
import WhileInView from '@/components/WhileInView'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface FILE {
  src:string,
  name:string
}
const Home = () => {

  const [file, setFile] = useState<File>()
  const [files, setFiles] = useState<FILE[]>([])
  const router = useRouter()
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) return

    const data = new FormData()
    data.set('file', file)

    const res = await fetch('/api/uploader', {
      method: 'post',
      body: data
    })
    const result = await res.json()
    if(result.success){
      window.location.reload()
    }
  }

  async function handledelete(filename:string){
    const res = await fetch('/api/delete',{
      method:'post',
      // headers:'Application/json',
      body:JSON.stringify({filename}) 
    })
    const result =await res.json()
    if(result.success){
      window.location.reload()
    }
  }  

  const isVideoFile = (fileName: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  async function GetFiles(){
    const res = await fetch('api/getfiles',{
      method:'get'
    })
    const result = await res.json()
    if(result.success){
      console.log(result.file)
      const files = result.file.map((file:string)=>(
        {
          src:`/newupload/${file}`,
          name:file
        }
      ))
      setFiles(files)
    }
  }

  useEffect(()=>{
    GetFiles()
  },[])
  return (
    <div className='flex flex-col gap-5 p-10 mx-auto'>

      <h1>Uloade Images</h1>
      <form onSubmit={handleSubmit}>
        <input type="file"
          onChange={(e) => setFile(e.target.files?.[0])} />
        <button className='p-4 m-3 border-2 shadow-md' type='submit'>Upload</button>
      </form>
    <hr />

    <section style={{ marginTop: '20px' }}>
        <h2>Uploaded Files</h2>
        <div  className=' gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {files.map(file => (
            <div key={file.name} className='flex gap-3 p-3 flex-col shadow-lg'>

{isVideoFile(file.name) ? (
                <video width="320" height="240" controls>
                  <source src={file.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
              
                 <img src={file.src} alt={file.name} style={{ maxWidth: '200px', margin: '10px' }} />
              )}
              <p>{file.name}</p>
              <div className='flex justify-between'>

              <a href={file.src} download={`${Date.now()}_${file.name}`}>
                <button>Download</button>
              </a>
              <button onClick={()=>handledelete(file.name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
     
    </div>
  )
}

export default Home


{/* <Button />
 <AnimationControle />
 <WhileInView />
 <Scroll /> */}