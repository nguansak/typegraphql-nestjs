import { ObjectType, Field, InputType } from "@kasi-labs/type-graphql";

@ObjectType()
@InputType("RecipeInput")
export class Recipe {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;
}
