import { Resolver, Query } from "@kasi-labs/type-graphql";

import User from "./user";
import { users } from "./data";

@Resolver(of => User)
export default class AccountsResolver {
  @Query(returns => User)
  me(): User {
    return users[0];
  }

  @Query(returns => [User])
  users(): User[] {
    return users
  }
}
