import fetcher from "./fetcher";

export type Mode = "signin" | "signup";

export const auth = async (
  mode: Mode,
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
