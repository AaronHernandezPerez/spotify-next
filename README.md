## Getting Started

### Preview

![home preview](./docs/home.PNG)
![playlist preview](./docs/playlist.PNG)

First, install the dependencies

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma

Synchronise database with schema

```bash
npx prisma db push
```

Populate database with seed

```bash
npx prisma db seed
```

Drop database and run migrations

```bash
npx prisma migrate reset
```

Generate migrations

```bash
npx prisma migrate dev
```

Database admin

```bash
npx prisma studio
```

## Deploy

Deploy command

```bash
npx prisma generate && npx prisma migrate deploy && yarn build
```

.env

```bash
DATABASE_URL="postgresql://user:passw@host:5432/spotify"
SECRET=""
```
