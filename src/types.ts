import type { BuildSchemaOptions } from "type-graphql";
import type { GqlModuleAsyncOptions, GqlModuleOptions } from "@nestjs/graphql";
import type { GraphQLDirective, GraphQLResolveInfo } from "graphql";
import { FactoryProvider, ModuleMetadata } from "@nestjs/common";

export type TypeGraphQLFeatureModuleOptions = Pick<
  BuildSchemaOptions,
  "orphanedTypes"
>;

export type GQLModuleOptionsWithoutSchema<TOptions extends GqlModuleOptions> =
  Omit<TOptions, "schema" | "autoSchemaFile" | "buildSchemaOptions">;

export type TypeGraphQLBuildSchemaOptions = Omit<
  BuildSchemaOptions,
  "resolvers" | "orphanedTypes" | "container"
>;

export type TypeGraphQLRootModuleOptions<TOptions extends Record<string, any>> =
  GQLModuleOptionsWithoutSchema<TOptions> & TypeGraphQLBuildSchemaOptions;

export interface TypeGraphQLRootModuleAsyncOptions<
  TOptions extends Record<string, any>,
> extends Pick<ModuleMetadata, "imports">,
    Pick<
      FactoryProvider<
        | Promise<TypeGraphQLRootModuleOptions<TOptions>>
        | TypeGraphQLRootModuleOptions<TOptions>
      >,
      "inject" | "useFactory"
    >,
    Pick<GqlModuleAsyncOptions<TOptions>, "driver"> {}

export type ResolveReferenceFn = (
  root: any,
  context: any,
  info: GraphQLResolveInfo,
) => any;

export type TypeGraphQLFeatureFederationModuleOptions =
  TypeGraphQLFeatureModuleOptions & {
    referenceResolvers?: Record<
      string,
      { __resolveReference: ResolveReferenceFn }
    >;
  };

export type TypeGraphQLRootFederationModuleOptions<
  TOptions extends GqlModuleOptions,
> = TypeGraphQLRootModuleOptions<TOptions>;

export type TypeGraphQLRootFederationModuleAsyncOptions<
  TOptions extends GqlModuleOptions,
> = TypeGraphQLRootModuleAsyncOptions<TOptions>;
