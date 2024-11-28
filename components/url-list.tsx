'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { CheckIcon, CopyIcon, EyeIcon } from 'lucide-react'

type Url = {
  id: string,
  shortCode: string,
  originUrl: string,
  visits: number
}

function UrlList() {

  const [urls, setUrls] = useState<Url[]>([])
  const [copied, setCopied] = useState<boolean>(false)
  const [copyUrl, setCopyurl] = useState<string>('')


  const shortenerUrl = (code: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls');
      const data = await response.json()
      setUrls(data)
    } catch (error) {
      console.log('Error:', error);
    }
  }
  const handleCopyUrl = (code: string) => {
    const fullUrl = `${shortenerUrl(code)}`
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true)
      setCopyurl(code)
      setTimeout(() => {
        setCopied(false)
        setCopyurl('')
      }, 3000)
    })
  }

  useEffect(() => {
    fetchUrls();
  }, [])

  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
      <ul className='space-y-2'>
        {
          urls.map((url) => (
            <li key={url.id} className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3">
              <Link className='text-blue-500' target='_blank' href={`/${url.shortCode}`}>{shortenerUrl(url.shortCode)}</Link>
              <div className='flex items-center gap-3'>
                <Button onClick={() => handleCopyUrl(url.shortCode)} variant='ghost' size='icon' className='text-muted-foreground hover:bg-muted'>
                  {
                    copied && copyUrl == url.shortCode ? <CheckIcon className='w-4 h-4' /> : <CopyIcon className='w-4 h-4' />
                  }
                  <span className='sr-only'>Copy URL</span>
                </Button>
                <span className='flex items-center gap-1'>
                  <EyeIcon className='h-4 w-4' />
                  {url.visits} views
                </span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default UrlList