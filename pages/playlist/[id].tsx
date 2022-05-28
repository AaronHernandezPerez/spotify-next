import { NextApiRequest } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import React from "react";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { getBgColor } from "../../lib/colors";

export const getServerSideProps = async ({
  query,
  req,
}: {
  query: NextParsedUrlQuery & { id: string };
  req: NextApiRequest;
}) => {
  const { id } = validateToken(req.cookies.token);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: parseInt(query.id, 10),
      userId: id,
    },
    include: {
      songs: {
        // join
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

type ServerSideProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

const Playlist = ({ playlist }: ServerSideProps) => {
  return (
    <GradientLayout
      color={getBgColor(playlist.id)}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/id/${playlist.id + 10}/300/300`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export default Playlist;
