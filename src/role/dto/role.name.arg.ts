import { ArgsType, Field } from '@nestjs/graphql';

// 角色名验证
@ArgsType()
export class RoleNameArg {
  // 名称(英文名)
  @Field(() => String)
  name?: string;
}
