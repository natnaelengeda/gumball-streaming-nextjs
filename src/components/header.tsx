import React from 'react'
import { Badge } from './ui/badge'

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Gumball Stream</h1>
          <Badge variant="secondary" className="bg-blue-600 text-white">
            20 Episodes
          </Badge>
        </div>
      </div>
    </header>
  )
}
