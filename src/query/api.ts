import { useQuery } from "@tanstack/react-query"
import axios from "@/utils/axios";


// Queries
const getEpisodesFunction = async () => {
  const response = await axios.get("/");
  return response.data;
}

export const getAllEpisodes = () => {
  return useQuery({
    queryKey: ['episodes'],
    queryFn: getEpisodesFunction,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}