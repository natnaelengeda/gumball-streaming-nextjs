"use client";
import React, { useState } from 'react'

import { useParams } from 'next/navigation';
import Header from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetEpisode } from '@/query/api';
import { Badge } from '@/components/ui/badge';
import { Clock, Send, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/video-player';
import { fixTime } from '@/utils/fixTime';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function Page() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = idStr ? parseInt(idStr, 10) : null;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")

  const { data, isPending, isError } = useGetEpisode(id, {
    enabled: id !== null,
  });

  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const imageUrl = data && `${url}/image/${data.thumbnail}`;
  const videoUrl = data && `${url}/episode/video/${id}/${data.name}`;

  const handleLike = () => {
    if (userVote === "like") {
      setLikes(likes - 1)
      setUserVote(null)
    } else {
      if (userVote === "dislike") {
        setDislikes(dislikes - 1)
      }
      setLikes(likes + 1)
      setUserVote("like")
    }
  }

  const handleDislike = () => {
    if (userVote === "dislike") {
      setDislikes(dislikes - 1)
      setUserVote(null)
    } else {
      if (userVote === "like") {
        setLikes(likes - 1)
      }
      setDislikes(dislikes + 1)
      setUserVote("dislike")
    }
  }

  const handleAddComment = () => {
    if (newComment.trim() && userName.trim()) {
      const comment: any = {
        id: Date.now().toString(),
        // name: userName.trim(),
        // content: newComment.trim(),
        // timestamp: new Date().toLocaleString(),
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black ">
      <Header />

      <div className="container px-4 py-8 mx-auto md:px-20">
        {/* Video Player Section */}
        <div className="mb-8">
          {data ?
            <div className="relative mb-4 overflow-hidden bg-black shadow-2xl aspect-video rounded-xl">
              <video
                className="w-full h-full"
                controls
                preload="metadata"
                poster={imageUrl}>
                <source
                  src={videoUrl}
                  type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* <VideoPlayer
                src={videoUrl}
                poster={imageUrl} /> */}
            </div> :
            <div className="relative mb-4 overflow-hidden bg-black shadow-2xl aspect-video rounded-xl animate-pulse">
              {/* Simulate the video thumbnail / player */}
              <div className="absolute inset-0 bg-white/10"></div>

              {/* Optional: play button shimmer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 bg-white/20 rounded-full"></div>
              </div>
            </div>
          }

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {data ? <div>
              <h1
                className="mb-2 text-3xl font-bold text-white">
                {data.name}
              </h1>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-white bg-purple-600">
                  <Clock className="w-3 h-3 mr-1" />
                  {fixTime(data.length)}
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  Episode {" "}
                  {data.id}
                </Badge>
              </div>
            </div> :
              <div className="space-y-2 animate-pulse">
                {/* Title skeleton */}
                <div className="h-10 w-2/3 bg-white/20 rounded-md"></div>

                {/* Badges skeleton */}
                <div className="flex items-center gap-4 mt-1">
                  {/* Clock badge */}
                  <div className="h-6 w-20 bg-purple-600/40 rounded-full"></div>

                  {/* Episode number badge */}
                  <div className="h-6 w-16 bg-white/20 rounded-full"></div>
                </div>
              </div>}

            {/* Like/Dislike Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={userVote === "like" ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className={`${userVote === "like"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
                  } bg-transparent border cursor-pointer`}>
                <ThumbsUp
                  className="w-4 h-4 mr-1 text-white" />
                {likes}
              </Button>
              <Button
                variant={userVote === "dislike" ? "default" : "outline"}
                size="sm"
                onClick={handleDislike}
                className={`${userVote === "dislike"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
                  } bg-transparent border cursor-pointer`}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                {dislikes}
              </Button>
            </div>
          </div>
        </div>

        {/* Episode Description */}
        {
          data &&
            data.description ? <Card
              className="mb-8 text-white bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle>Episode Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className="leading-relaxed text-white/90">
                {data.fullDescription || data.description}
              </p>
            </CardContent>
          </Card> :
            <div className="mb-8 text-white bg-white/10 border-white/20 rounded-xl p-4 animate-pulse">
              {/* CardHeader skeleton */}
              <div className="mb-3">
                <div className="h-6 w-1/3 bg-white/20 rounded-md"></div>
              </div>

              {/* CardContent skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/20 rounded-md"></div>
                <div className="h-4 w-5/6 bg-white/20 rounded-md"></div>
                <div className="h-4 w-4/6 bg-white/20 rounded-md"></div>
              </div>
            </div>}

        {/* Comments Section */}
        <div className='w-full grid grid-cols-2 gap-5'>
          <Card className="text-white bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p
                    className="py-8 text-center text-white/70">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments.map((comment, index: number) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/5">
                      {/* <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-white/70" />
                        <span className="font-semibold text-white">{comment.name}</span>
                        <span className="text-sm text-white/50">{comment.timestamp}</span>
                      </div> */}
                      {/* <p className="text-white/90">{comment.content}</p> */}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="text-white bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle>Add Comments</CardTitle>
              <CardDescription className="text-white/70">Share your thoughts about this episode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment Form */}
              <div className="flex flex-col items-end p-4 space-y-4 rounded-lg bg-white/5">
                <div className="w-full ">
                  <Input
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full text-white bg-white/10 border-white/20 placeholder:text-white/50"
                  />
                </div>
                <Textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || !userName.trim()}
                  className="bg-primary hover:bg-primary/95">
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
