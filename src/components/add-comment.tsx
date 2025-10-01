import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import axios from "@/utils/axios";
import { useQueryClient } from "@tanstack/react-query";

type CommentFormValues = {
  userName?: string;
  comment: string;
};

export default function AddComment({ id }: any) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormValues>({
    defaultValues: {
      userName: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CommentFormValues) => {
    console.log(data)
    return axios
      .post(`/comments/${id}`, {
        name: data.userName ?? "", // optional
        comment: data.comment,
      })
      .then(() => {
        // notify react-query
        queryClient.invalidateQueries({ queryKey: [`episode-comment-${id}`] });
        reset(); // clear form
      })
      .catch((err) => {
        console.error("Error adding comment:", err);
      });
  };

  return (
    <Card className="text-white bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle>Add Comments</CardTitle>
        <CardDescription className="text-white/70">
          Share your thoughts about this episode
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end p-4 space-y-4 rounded-lg bg-white/5"
        >
          <div className="w-full">
            <Input
              placeholder="Your name (optional)"
              {...register("userName")}
              className="w-full text-white bg-white/10 border-white/20 placeholder:text-white/50"
            />
          </div>

          <div className="w-full">
            <Textarea
              placeholder="Write your comment..."
              {...register("comment", { required: "Comment is required" })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-400">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/95"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}