import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * 查询
 */
@ObjectType()
export class RoleDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  roleType: number;

  @Field()
  description: string;

  @Field()
  defaultFlag: number;
}
