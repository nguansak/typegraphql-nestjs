import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { TypeGraphQLModule } from "../../src";

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

import RecipeModule from "./recipe/module";

@Module({
  imports: [
    TypeGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      emitSchemaFile: true,
      validate: false,
      playground: false,
      cors: {
        origin: ['https://sandbox.embed.apollographql.com'],
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    RecipeModule,
  ],
})
export default class AppModule {}
