import { Field, InputType } from '@nestjs/graphql';

// 新增
@InputType()
export class CityCreateInput {
  @Field()
  name: string;

  @Field()
  code: string;
}
