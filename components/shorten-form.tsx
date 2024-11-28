'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface ShortenFormProps {
  handleUrlShortened: () => void
}

function ShortenForm({handleUrlShortened}:ShortenFormProps) {

  const [url,setUrl] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const responce = await fetch('/api/shorten/',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          url,
        }),
      })
      await responce.json();
      setUrl('')
      handleUrlShortened();
    } catch (error) {
      console.log('Error:',error);
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className="space-y-4">
        <Input value={url} onChange={(e) => setUrl(e.target.value)} className='h-12' type='url' placeholder='Enter URL to shorten' required />
        <Button className='w-full p-2' type='submit' disabled={isLoading}>{isLoading ? "Shortening..." : "Shorten URL"}</Button>
      </div>
    </form>
  )
}

export default ShortenForm