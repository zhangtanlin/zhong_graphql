import { Field, InputType } from '@nestjs/graphql';

// 新增
@InputType()
export class CountryCreateInput {
  @Field()
  name: string;

  @Field()
  code: string;
}
