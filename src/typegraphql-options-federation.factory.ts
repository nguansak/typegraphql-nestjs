import { directivesWithNoDefinitionNeeded } from "@apollo/subgraph/dist/directives";
import { printSubgraphSchema, buildSubgraphSchema } from "@apollo/subgraph"
import { addResolversToSchema, GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper"
import { mergeSchemas } from "@graphql-tools/schema";
import { Inject, Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { GraphQLSchema, specifiedDirectives } from "graphql";
import gql from "graphql-tag";

import {
  buildSchema,
  ClassType,
  createResolversMap,
  NonEmptyArray,
} from "type-graphql";

import OptionsPreparatorService from "./prepare-options.service";
import {
  TYPEGRAPHQL_FEATURE_FEDERATION_MODULE_OPTIONS,
  TYPEGRAPHQL_ROOT_FEDERATION_MODULE_OPTIONS,
} from "./constants";
import {
  TypeGraphQLRootFederationModuleOptions,
  TypeGraphQLFeatureFederationModuleOptions,
} from "./types";


@Injectable()
export default class TypeGraphQLFederationOptionsFactory
  implements GqlOptionsFactory
{
  constructor(
    @Inject(TYPEGRAPHQL_ROOT_FEDERATION_MODULE_OPTIONS)
    private readonly rootModuleOptions: TypeGraphQLRootFederationModuleOptions<GqlModuleOptions>,
    private readonly optionsPreparatorService: OptionsPreparatorService,
  ) {}

  async createGqlOptions(): Promise<Omit<GqlModuleOptions, "driver">> {
    const { globalMiddlewares, transformSchema } = this.rootModuleOptions;
    const {
      resolversClasses,
      container,
      orphanedTypes,
      featureModuleOptionsArray,
    } = this.optionsPreparatorService.prepareOptions<TypeGraphQLFeatureFederationModuleOptions>(
      TYPEGRAPHQL_FEATURE_FEDERATION_MODULE_OPTIONS,
      globalMiddlewares,
    );

    const referenceResolversArray = [...featureModuleOptionsArray].filter(
      it => it.referenceResolvers,
    );

    const referenceResolvers =
      referenceResolversArray.length > 0
        ? Object.fromEntries(
            referenceResolversArray.flatMap(it =>
              Object.entries(it.referenceResolvers!),
            ),
          )
        : undefined;

    const baseSchema = await buildSchema({
      ...this.rootModuleOptions,
      directives: [...specifiedDirectives, ...directivesWithNoDefinitionNeeded],
      resolvers: resolversClasses as NonEmptyArray<ClassType>,
      orphanedTypes,
      container,
    });

    const schema = buildSubgraphSchema({
      typeDefs: gql(printSubgraphSchema(baseSchema)),
      resolvers: createResolversMap(baseSchema) as GraphQLResolverMap<any>,
    });

    if (referenceResolvers) {
      addResolversToSchema(schema, referenceResolvers);
    }

    const transformSchemaInternal = async (executableSchema: GraphQLSchema): Promise<GraphQLSchema> => {
      const transformedSchemaInternal = executableSchema
        ? mergeSchemas({ schemas: [schema, executableSchema] })
        : schema
      return transformSchema ? transformSchema(transformedSchemaInternal) : transformedSchemaInternal
    }

    return {
      ...this.rootModuleOptions,
      transformSchema: transformSchemaInternal,
    };
  }
}
