import React from 'react'
import Image from "next/image";

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from "@/components/ui/badge"

// icons
import { Clock, Play } from 'lucide-react'
import AppAsset from '@/core/AppAsset';

interface IVideoCard {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export default function VideoCard({ id, title, thumbnail, duration, description }: IVideoCard) {
  return (
    <Link key={id} href={`/episode/${id}`}>
      <Card className="pt-0 transition-all duration-300 cursor-pointer bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 group">
        <div className="relative overflow-hidden rounded-t-lg aspect-video">
          <Image
            src={thumbnail || AppAsset.gumballPoter}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110 " />
          <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 bg-black/0 group-hover:bg-black/30">
            <Play className="w-8 h-8 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </div>
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="text-xs text-white bg-black/60">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </Badge>
          </div>
        </div>
        <div className='flex flex-col items-start justify-start text-white gap-2 px-2'>
          <h1 className='font-bold'>{title}</h1>
          <p className='text-sm'>{description}</p>
        </div>
        {/* <CardHeader className="pb-2">
          <CardTitle
            className="text-lg text-white">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription
            className="text-sm text-white/70">
            {description}
          </CardDescription>
        </CardContent> */}
      </Card>
    </Link>
  )
}
