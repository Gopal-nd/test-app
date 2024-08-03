'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Image {
  src: string;
  name: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<Image[]>([]);

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
      fetchImages(); // Fetch updated list of images
    } else {
      console.log('File upload failed:', result.message);
    }
  };

  const fetchImages = async () => {
    const res = await fetch('/api/images');
    const result = await res.json();
    setImages(result)
    // if (result.success) {
    //   const imageFiles = result.images.map((file: string) => ({
    //     src: `/uploads/${file}`,
    //     name: file,
    //   }));

    //   console.log(imageFiles)
    //   setImages(imageFiles);
    // } else {
    //   console.log('Failed to fetch images:', result.message);
    // }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {images.map(image => (
          <div key={image.name} style={{ display: 'inline-block', margin: '10px' }}>
            <img src={image.src} alt={image.name} style={{ maxWidth: '200px', margin: '10px' }} />
            <p>{image.name}</p>
            <a href={image.src} download={image.name}>
              <button>Download</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
