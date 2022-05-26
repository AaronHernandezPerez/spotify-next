import useSWR from "swr";
import fetcher from "./fetcher";

export const useGetUser = () => {
  const { data, error } = useSWR("/getuser", fetcher);

  return {
    data,
    error,
    loading: !data && !error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlista", fetcher);

  return {
    data: (data as any) || [],
    error,
    loading: !data && !error,
  };
};
