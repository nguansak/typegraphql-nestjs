import "reflect-metadata";

import { Module } from "@nestjs/common";
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: true,
      },
      gateway: {
        serviceList: [
          { name: "accounts", url: "http://localhost:3001/graphql" },
          { name: "inventory", url: "http://localhost:3002/graphql" },
          { name: "products", url: "http://localhost:3003/graphql" },
          { name: "reviews", url: "http://localhost:3004/graphql" },
        ],
      },
    }),
  ],
})
export default class AppModule {}
