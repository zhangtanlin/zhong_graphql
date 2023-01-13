import { ArgsType, Field, Int } from '@nestjs/graphql';

/**
 * id查询dto验证
 * @description nullable 表示该字段是否可以为空.
 */
@ArgsType()
export class IdDto {
  // id
  @Field(() => Int, { nullable: true })
  readonly page: number;
}
