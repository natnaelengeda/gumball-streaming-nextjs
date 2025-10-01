import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { useGetComments } from '@/query/api'
import { User } from 'lucide-react';

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString(); // e.g. "10/1/2025, 11:01:46 AM" in your local timezone
}

export default function ViewComments({ id }: any) {
  const { data, isPending } = useGetComments(id);

  return (
    <Card className="text-white bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comments List */}
        <div className="space-y-4">
          {
            !isPending &&
              data &&
              data.length === 0 ? (
              <p
                className="py-8 text-center text-white/70">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              data &&
              data.map((comment: { name: string, comment: string, createdAt: string }, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-white/70" />
                    <span className="font-semibold text-white">{comment.name}</span>
                    <span className="text-sm text-white/50">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-white/90">{comment.comment}</p>
                </div>
              ))
            )}
        </div>
      </CardContent>
    </Card>
  )
}
