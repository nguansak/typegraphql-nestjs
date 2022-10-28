import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import path from "path";
import { TypeGraphQLModule } from "../../src";

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

import AnimalModule from "./animal/module";

@Module({
  imports: [
    TypeGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      emitSchemaFile: path.resolve(__dirname, "second-schema.graphql"),
      validate: false,
      playground: false,
      cors: {
        origin: ['https://sandbox.embed.apollographql.com'],
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    AnimalModule,
  ],
})
export default class SecondAppModule {}
