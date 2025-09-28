import React from 'react'
import Image from "next/image";

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from "@/components/ui/badge"

// icons
import { Clock, Play } from 'lucide-react'
import AppAsset from '@/core/AppAsset';
import { truncateText } from '@/utils/truncateText';

interface IVideoCard {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export default function VideoCard({ id, title, thumbnail, duration, description }: IVideoCard) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${thumbnail}`;

  return (
    <Link
      href={`/episode/${id}`}>
      <Card className="pt-0 transition-all duration-300 cursor-pointer bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105 group">
        <div className="relative overflow-hidden rounded-t-lg aspect-video">
          <Image
            src={imageUrl || AppAsset.gumballPoter}
            alt={title}
            fill
            // sizes='100vw'
            sizes="(max-width: 768px) 50vw, 300px" // small screens: 50% viewport, otherwise 300px
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
          <p className='text-sm'>{truncateText(description, 70)}</p>
        </div>
      </Card>
    </Link>
  )
}
