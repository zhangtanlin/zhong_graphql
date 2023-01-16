import { ArgsType, Field, ID } from '@nestjs/graphql';

// 查询
@ArgsType()
export class RoleSearchArgsDto {
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
