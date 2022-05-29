## Getting Started

### Preview

<center>
<table >
  <tr >
    <td valign="top"><img src="./docs/home.PNG" width="300px" /></td>
    <td valign="top"><img src="./docs/playlist.PNG"  width="300px"  /></td>
  </tr>
</table>
</center>

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
