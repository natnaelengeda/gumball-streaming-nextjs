import React from 'react'
import { useRouter } from 'next/navigation';

import { Badge } from './ui/badge'

export default function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            onClick={() => {
              router.push("/")
            }}
            className="text-2xl font-bold text-white cursor-pointer">Gumball Stream</h1>
          <Badge
            onClick={() => {
              router.push("/")
            }}
            variant="secondary"
            className="bg-blue-600 text-white cursor-pointer">
            20 Episodes
          </Badge>
        </div>
      </div>
    </header>
  )
}
