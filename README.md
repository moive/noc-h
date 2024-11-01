 # Project NOC
 The objective is to create a series of tasks using Clean Architecture with Typescript.

 # Dev
 1. Clone the file .env.template a .env
 2. Config the variables environment
 ```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
 ```	

 # Prisma
 * ```npx prisma init --datasource-provider PostgreSQL```
 * ```npx prisma migrate dev --name init```