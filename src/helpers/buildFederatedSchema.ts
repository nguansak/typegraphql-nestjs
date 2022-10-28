import { buildSchema, BuildSchemaOptions, createResolversMap } from "type-graphql";
import { specifiedDirectives } from "graphql";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { addResolversToSchema, GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper";
import { printSchemaWithDirectives } from "@graphql-tools/utils";

export async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, "skipCheck">,
  referenceResolvers?: GraphQLResolverMap<any>,
) {
  const schema = await buildSchema({
    ...options,
    directives: [...specifiedDirectives, ...(options.directives || [])],
    skipCheck: true,
  });

  const federatedSchema = buildSubgraphSchema({
    typeDefs: gql(printSchemaWithDirectives(schema)),
    resolvers: createResolversMap(schema) as any,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }
  return federatedSchema;
}
