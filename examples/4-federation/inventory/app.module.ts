import { Module } from "@nestjs/common";
import { TypeGraphQLFederationModule } from "../../../src";

import InventoryModule from "./inventory.module";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    TypeGraphQLFederationModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      validate: false,
      skipCheck: true,
    }),
    InventoryModule,
  ],
})
export default class AppModule {}
