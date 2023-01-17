import { Field, InputType, Int } from '@nestjs/graphql';

// 新增
@InputType()
export class CountryCreateInput {
  // 名称
  @Field(() => String)
  name: string;

  // 基础代码(2位代码)
  @Field(() => String)
  base_code: string;

  // 详细代码(3位代码)
  @Field(() => String)
  detail_code: string;

  // 数字代码
  @Field(() => String)
  number_code: string;

  // 是否为主权国家
  @Field(() => Int, { nullable: true })
  is_sovereignty: number;
}
