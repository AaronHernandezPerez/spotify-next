import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

export const useGetUser = () => {
  const { data, error } = useSWR<User & { playlistsCount: number }>(
    "/getuser",
    fetcher
  );

  return {
    data,
    error,
    loading: !data && !error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR<Playlist[]>("/playlist", fetcher);

  return {
    data: data || [],
    error,
    loading: !data && !error,
  };
};
