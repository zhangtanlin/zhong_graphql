import { ArgsType, Field, Int } from '@nestjs/graphql';

/**
 * 分页查询dto验证
 * @description nullable 表示该字段是否可以为空.
 */
@ArgsType()
export class PagingArgs {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  readonly size: number;
}
