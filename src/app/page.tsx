"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

// components
import Header from "@/components/header";
import Footer from "@/components/footer";
import VideoCard from "@/components/video-card";
import SkeletonCard from "@/components/video-card-skeleton";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// api
import { useGetAllEpisodes } from "@/query/api";

// icons
import { Play, Star } from "lucide-react";

import AppAsset from "@/core/AppAsset";
import { useEffect } from "react";

export type Episode = {
  id: number;
  name: string;
  length: string; // formatted like "00:12:07"
  description: string;
  thumbnail: string;
};

export default function Home() {
  const router = useRouter();
  const { data, isPending } = useGetAllEpisodes();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black ">
      {/* Header */}
      <Header />

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
                  onClick={() => {
                    router.push("/episode/1")
                  }}
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
              data &&
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
              Array.from({ length: 8 }).map((_, index: number) => {
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
