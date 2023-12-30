# Sun Roof Co Backend

This API is built using a Dockerized PostrgeSQL Database, Nest.js, and Prisma ORM, aiming for a high level of efficiency, type safety, and ease of maintenance.

- [Docker](https://www.docker.com/get-started/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Nest.js](https://docs.nestjs.com/)

## Table of Contents

- [Development Setup](#development-setup)
- [Swagger Documentation](#swagger)
- [Prisma](#prisma)

---

## Development Setup

### Setting up local DB

_Note: Follow the Docker installation instructions [here](https://docs.docker.com/desktop/install/mac-install/) if you do not have it installed._

Create Postgres database:

```bash
npm run docker:postgresql-start
```

Confirm Docker container is up and running with:

```bash
npm run docker:postgresql-status
```

Create `.env` file at the root of the `/src/server` directory with the following environment variable:

```
DATABASE_URL="postgresql://postgres:src-pwd@localhost:5432/sun-roof-co-db-local?schema=public"
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Run all migrations:

```bash
npm run prisma:seed
```

Seed database:

```bash
npm run prisma:seed
```

View seeded data in the browser:

```bash
npx prisma studio
```

### Running the app locally

```bash
# development
npm run start

# watch mode
npm run start:dev
```

---

## Swagger

This app uses [NestJS's OpenAPI specification Swagger module](https://docs.nestjs.com/openapi/introduction).

Once the server is up and running a you can interact with the API at [localhost:8000](http://localhost:8000/api)

## Prisma

### Prisma Studio

To interact with the data in a web-based UI:

```bash
npx prisma studio
```

## Migrations

### Creating new migrations

To create a new migration update the `schema.prisma` file with your schema changes, then run:

```bash
npx prisma migrate dev --name <migration_name>
```

This command will generate a new migration file in the `prisma/migrations` directory AND apply it to your local database.

**Note:** Use a descriptive name for the migration (i.e. `add_column_to_table`)

Generate a new Prisma client:

```bash
npx prisma generate
```

### Resetting local Database

To reset the database database, run:

```bash
npx prisma migrate reset
```
