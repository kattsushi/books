import * as schema from './schema'

import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso'
import { Module } from '@nestjs/common'
import { config } from 'dotenv'

config()

@Module({
  imports: [
    DrizzleTursoModule.register({
      tag: 'DB_PROD',
      turso: {
        config: {
          url: process.env.DATABASE_URL,
          authToken: process.env.DATABASE_AUTH_TOKEN,
        },
      },
      config: {
        schema: {
          ...schema,
        },
      },
    }),
  ],
})
export class DatabaseModule {}
