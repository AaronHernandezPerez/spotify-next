import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const userEmail = "aaron@test.com";
  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      firstName: "Aaron",
      lastName: "Hernandez",
      email: userEmail,
      password: bcrypt.hashSync("password", salt),
    },
  });

  const songs = await prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      // Will fail if the data is not deleted
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i}`,
          userId: user.id,
          songs: {
            connect: songs.map((song) => ({ id: song.id })),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
