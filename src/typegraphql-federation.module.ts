import { Module, DynamicModule } from "@nestjs/common";
import { GqlModuleOptions, GraphQLModule } from "@nestjs/graphql";

import {
  TYPEGRAPHQL_FEATURE_FEDERATION_MODULE_OPTIONS,
  TYPEGRAPHQL_ROOT_FEDERATION_MODULE_OPTIONS,
} from "./constants";
import OptionsPreparatorService from "./prepare-options.service";
import TypeGraphQLFederationOptionsFactory from "./typegraphql-options-federation.factory";
import {
  TypeGraphQLFeatureFederationModuleOptions,
  TypeGraphQLRootFederationModuleOptions,
  TypeGraphQLRootFederationModuleAsyncOptions,
} from "./types";

@Module({})
export class TypeGraphQLFederationModule {
  private static forFeatureIndex = 1;

  static forFeature(
    options: TypeGraphQLFeatureFederationModuleOptions = {},
  ): DynamicModule {
    const token = `${TYPEGRAPHQL_FEATURE_FEDERATION_MODULE_OPTIONS}_${this
      .forFeatureIndex++}`;
    return {
      module: TypeGraphQLFederationModule,
      providers: [{ provide: token, useValue: options }],
      exports: [token],
    };
  }

  static forRoot<TOptions extends GqlModuleOptions = GqlModuleOptions>(
    options: TypeGraphQLRootFederationModuleOptions<TOptions>,
  ): DynamicModule {
    const dynamicGraphQLModule = GraphQLModule.forRootAsync({
      driver: options.driver,
      useClass: TypeGraphQLFederationOptionsFactory,
    });
    return {
      ...dynamicGraphQLModule,
      providers: [
        ...dynamicGraphQLModule.providers!,
        OptionsPreparatorService,
        {
          provide: TYPEGRAPHQL_ROOT_FEDERATION_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static forRootAsync<TOptions extends GqlModuleOptions = GqlModuleOptions>(
    options: TypeGraphQLRootFederationModuleAsyncOptions<TOptions>,
  ): DynamicModule {
    const dynamicGraphQLModule = GraphQLModule.forRootAsync({
      driver: options.driver,
      imports: options.imports,
      useClass: TypeGraphQLFederationOptionsFactory,
    });
    return {
      ...dynamicGraphQLModule,
      providers: [
        ...dynamicGraphQLModule.providers!,
        OptionsPreparatorService,
        {
          inject: options.inject,
          provide: TYPEGRAPHQL_ROOT_FEDERATION_MODULE_OPTIONS,
          useFactory: options.useFactory,
        },
      ],
    };
  }
}
