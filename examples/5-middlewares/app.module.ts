import { Module } from "@nestjs/common";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { TypeGraphQLModule } from "../../src";
import { LoggingMiddleware } from "./logging/middleware";

import RecipeModule from "./recipe/module";
import LoggingModule from "./logging/module";

@Module({
  imports: [
    TypeGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      emitSchemaFile: true,
      validate: false,
      // register middlewares in settings
      globalMiddlewares: [LoggingMiddleware],
    }),
    RecipeModule,
    // import module with middleware provider
    LoggingModule,
  ],
})
export default class AppModule {}
