import { useQuery } from "@tanstack/react-query"
import axios from "@/utils/axios";


// Queries
const getEpisodesFunction = async () => {
  const response = await axios.get("/");
  return response.data;
}

export const useGetAllEpisodes = () => {
  return useQuery({
    queryKey: ['episodes'],
    queryFn: getEpisodesFunction,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

const getEpisodeFunction = async (id: number | null) => {
  const response = await axios.get(`/episode/${id}`);
  return response.data;
}

export const useGetEpisode = (id: number | null, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [`episode-${id}`],
    queryFn: () => getEpisodeFunction(id),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  })
}

const getComments = async (id: number | null) => {
  const response = await axios.get(`/comments/${id}`);
  return response.data;
}

export const useGetComments = (id: number | null) => {
  return useQuery({
    queryKey: [`episode-comment-${id}`],
    queryFn: () => getComments(id),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}