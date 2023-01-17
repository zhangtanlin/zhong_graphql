import { Field, InputType, Int } from '@nestjs/graphql';

// 新增
@InputType()
export class CityCreateInput {
  // 城市名称
  @Field(() => String)
  name: string;

  // 城市代码
  @Field(() => String)
  code: string;

  // 城市关联的国家
  @Field(() => Int, { nullable: true })
  country_id: number;
}
