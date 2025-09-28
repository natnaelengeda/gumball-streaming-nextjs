"use client";

import Image from "next/image";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoCard from "@/components/video-card";
import AppAsset from "@/core/AppAsset";
import { Play, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllEpisodes } from "@/query/api";
import SkeletonCard from "@/components/video-card-skeleton";

// Mock data for episodes
const episodes = [
  {
    id: 1,
    title: "The DVD",
    description: "Gumball and Darwin try to rent a DVD but encounter unexpected obstacles.",
    duration: "11:30",
    thumbnail: "/gumball-dvd-cartoon.png",
    featured: true,
  },
  {
    id: 2,
    title: "The Responsible",
    description: "Gumball tries to prove he's responsible enough to have a pet.",
    duration: "11:45",
    thumbnail: "/gumball-responsible-episode.png",
  },
  {
    id: 3,
    title: "The Third",
    description: "A new student arrives and disrupts Gumball and Darwin's friendship.",
    duration: "11:20",
    thumbnail: "/gumball-third-episode.png",
  },
  {
    id: 4,
    title: "The Debt",
    description: "Gumball owes Darwin a favor and tries to repay it.",
    duration: "11:35",
    thumbnail: "/gumball-debt-scene.png",
  },
  {
    id: 5,
    title: "The End",
    description: "The world seems to be ending, but is it really?",
    duration: "11:40",
    thumbnail: "/gumball-end-episode.png",
  },
  {
    id: 6,
    title: "The Dress",
    description: "Gumball has to wear a dress to school.",
    duration: "11:25",
    thumbnail: "/gumball-dress-episode.png",
  },
  {
    id: 7,
    title: "The Quest",
    description: "Gumball goes on an epic quest to find Anais's lost doll.",
    duration: "11:50",
    thumbnail: "/gumball-quest.png",
  },
  {
    id: 8,
    title: "The Spoon",
    description: "A simple spoon causes chaos in the Watterson household.",
    duration: "11:30",
    thumbnail: "/gumball-spoon-episode.png",
  },
  {
    id: 9,
    title: "The Pressure",
    description: "Gumball feels pressured to get his first kiss.",
    duration: "11:45",
    thumbnail: "/gumball-pressure.png",
  },
  {
    id: 10,
    title: "The Painting",
    description: "The family discovers a valuable painting in their house.",
    duration: "11:35",
    thumbnail: "/gumball-painting.png",
  },
  {
    id: 11,
    title: "The Laziest",
    description: "Gumball and Darwin compete to see who is the laziest.",
    duration: "11:40",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 12,
    title: "The Ghost",
    description: "Carrie the ghost tries to possess Gumball.",
    duration: "11:30",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 13,
    title: "The Mystery",
    description: "Someone has been leaving messes around the school.",
    duration: "11:45",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 14,
    title: "The Prank",
    description: "Gumball and Darwin's prank goes too far.",
    duration: "11:25",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 15,
    title: "The Gi",
    description: "Gumball learns martial arts to impress a girl.",
    duration: "11:50",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 16,
    title: "The Kiss",
    description: "Gumball accidentally kisses his grandmother.",
    duration: "11:35",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 17,
    title: "The Party",
    description: "The kids throw a party while their parents are away.",
    duration: "11:40",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 18,
    title: "The Refund",
    description: "Gumball tries to return a defective product.",
    duration: "11:30",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 19,
    title: "The Robot",
    description: "Gumball builds a robot to do his chores.",
    duration: "11:45",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 20,
    title: "The Picnic",
    description: "The family goes on a disastrous picnic.",
    duration: "11:55",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

const customNotes = [
  {
    id: 1,
    title: "🎉 Season Premiere!",
    content: "Welcome to The Amazing World of Gumball! Get ready for hilarious adventures with Gumball and Darwin.",
    type: "announcement",
  },
  {
    id: 2,
    title: "💡 Fun Fact",
    content:
      "Did you know? The show combines multiple animation styles including traditional 2D animation, CGI, and live-action!",
    type: "trivia",
  },
  {
    id: 3,
    title: "🔥 Fan Favorites",
    content: "Episodes 15-20 are some of the most beloved by fans. Don't miss these incredible adventures!",
    type: "update",
  },
]

type Episode = {
  id: number;
  name: string;
  length: string; // formatted like "00:12:07"
  description: string;
  thumbnail: string;
};

export default function Home() {
  const router = useRouter();

  const { data, isPending } = getAllEpisodes();

  console.log(data);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black ">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="container px-4 py-8 pt-24 mx-auto md:px-20">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Featured Video Player */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-black shadow-2xl aspect-video rounded-xl">
              <Image
                src={AppAsset.gumballPoter}
                alt={"Gumball Poster"}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Button
                  size="lg"
                  className="text-white cursor-pointer bg-white/20 hover:bg-white/30 border-white/30">
                  <Play className="w-6 h-6 mr-2" />
                  Watch Featured Episode
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl font-bold mb-2">The Burger</h3>
                <p className="text-white/80 text-sm">Find out what the burger bring to their life</p>
              </div>
            </div>
          </div>

          {/* Show Notes Panel */}
          <Card className="h-full text-white bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                About The Amazing World of Gumball
              </CardTitle>
            </CardHeader>
            <CardContent className=" h-full space-y-4 flex flex-col items-center justify-between">
              <div className="space-y-4">
                <p className="text-white/90">
                  Follow the misadventures of Gumball Watterson, a twelve-year-old cat, and his best friend Darwin, a
                  goldfish, as they navigate the surreal world of Elmore.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Episodes:</span>
                    <span className="font-semibold text-white">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Genre:</span>
                    <span className="font-semibold text-white">Comedy, Animation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Rating:</span>
                    <span className="font-semibold text-white">★★★★☆</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  router.push("/episode/1")
                }}
                className="w-full bg-primary cursor-pointer hover:bg-opacity-40">
                Start Watching
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="container px-4 py-8 mx-auto md:px-20">
        <h2 className="mb-8 text-3xl font-bold text-white">All Episodes</h2>

        <div className="space-y-8">
          {/* First batch of episodes */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
              !isPending &&
              data.length != 0 &&
              data.map((data: Episode, index: number) => (
                <VideoCard
                  key={index}
                  id={data.id}
                  title={data.name}
                  thumbnail={data.thumbnail}
                  duration={data.length}
                  description={data.description} />
              ))
            }
            {
              isPending &&
              Array.from({ length: 3 }).map((_, index: number) => {
                return (
                  <SkeletonCard key={index} />
                );
              })
            }
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
