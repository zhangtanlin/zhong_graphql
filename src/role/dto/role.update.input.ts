import { Field, InputType, Int } from '@nestjs/graphql';

// 新增
@InputType()
export class RoleUpdateInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
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
