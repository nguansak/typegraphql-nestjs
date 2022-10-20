import { Module } from "@nestjs/common";
import { TypeGraphQLFederationModule } from "../../../src";

import ReviewModule from "./reviews.module";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    TypeGraphQLFederationModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      validate: false,
      skipCheck: true,
    }),
    ReviewModule,
  ],
})
export default class AppModule {}
