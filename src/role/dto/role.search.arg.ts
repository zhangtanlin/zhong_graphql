import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

// 搜索角色
@ArgsType()
export class RoleSearchArg {
  @Field(() => ID, { nullable: true })
  id?: number;

  // 名称(英文名)
  @Field(() => String, { nullable: true })
  name?: string;

  // 别名(中文名)
  @Field(() => String, { nullable: true })
  alias?: string;

  // 类型
  @Field(() => Int, { nullable: true })
  roleType?: number;

  // 是否是初始化账号
  @Field(() => Int, { nullable: true })
  defaultFlag?: number;
}
