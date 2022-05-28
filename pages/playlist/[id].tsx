import { NextApiRequest } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import React from "react";
import GradientLayout from "../../components/GradientLayout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { UnwrappedPromiseType } from "../../utils/types";
// interface PrismPlaylist{}
const getBgColor = id => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple", 
    "gray",
    "teal",
    "yellow"
  ]
  
  let index = id-1
  if (index > colors.length) {
    index = index % colors.length
  }

  return colors[index]
}

export const getServerSideProps = async ({
  query,
  req,
}: {
  query: NextParsedUrlQuery & { id: string };
  req: NextApiRequest;
}) => {
  console.log(query);
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

type ServerSideProps =  UnwrappedPromiseType<typeof getServerSideProps>;
type PlaylistQuery  = Pick<ServerSideProps, "props">["props"]["playlist"]

const Playlist = ({ playlist }: {playlist: PlaylistQuery} ) => {
  return <GradientLayout color={getBgColor(playlist.id)}></GradientLayout>>
};



export default Playlist;
