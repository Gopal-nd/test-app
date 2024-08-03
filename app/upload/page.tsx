'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FileItem {
  src: string;
  name: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      console.log('File uploaded successfully:', result.path);
      fetchFiles(); // Fetch updated list of files
    } else {
      console.log('File upload failed:', result.message);
    }
  };

  const fetchFiles = async () => {
    const res = await fetch('/api/files');
    const result = await res.json();
    console.log(result)
    if (result.success) {
      const fileItems = result.files.map((file: string) => ({
        src: `/uploads/${file}`,
        name: file,
      }));
      console.log(fileItems)
      setFiles(fileItems);
    } else {
      console.log('Failed to fetch files:', result.message);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      {/* Upload Section */}
      <section>
        <h2>Upload File</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </section>
      
      {/* Display and Download Section */}
      <section style={{ marginTop: '20px' }}>
        <h2>Uploaded Files</h2>
        <div>
          {files.map(file => (
            <div key={file.name} style={{ display: 'inline-block', margin: '10px' }}>
                 <img src={file.src} alt={file.name} style={{ maxWidth: '200px', margin: '10px' }} />
              <p>{file.name}</p>
              <a href="" ></a>
              <a href={file.src} download={`${Date.now()}_${file.name}`}>
                <button>Download</button>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
