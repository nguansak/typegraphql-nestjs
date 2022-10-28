import { Module } from "@nestjs/common";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

import { TypeGraphQLFederationModule } from "../../../src";
import AccountModule from "./account.module";

@Module({
  imports: [
    TypeGraphQLFederationModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      validate: false,
      skipCheck: true,
      playground: false,
      cors: {
        origin: ['https://sandbox.embed.apollographql.com'],
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    AccountModule,
  ],
})
export default class AppModule {}
