import { Module } from "@nestjs/common";
import { TypeGraphQLFederationModule } from "../../../src";

import ProductsModule from "./products.module";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    TypeGraphQLFederationModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      validate: false,
      skipCheck: true,
    }),
    ProductsModule,
  ],
})
export default class AppModule {}
