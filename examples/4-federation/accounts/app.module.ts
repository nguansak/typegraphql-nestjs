import { Module } from "@nestjs/common";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

import { TypeGraphQLFederationModule } from "../../../src";
import AccountModule from "./account.module";

@Module({
  imports: [
    TypeGraphQLFederationModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      validate: false,
      skipCheck: true,
    }),
    AccountModule,
  ],
})
export default class AppModule {}
