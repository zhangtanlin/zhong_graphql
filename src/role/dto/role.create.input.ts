import { Field, InputType, Int } from '@nestjs/graphql';

// 新增
@InputType()
export class RoleCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  alias?: string;

  @Field(() => Int, { nullable: true })
  roleType?: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  defaultFlag?: number;
}
