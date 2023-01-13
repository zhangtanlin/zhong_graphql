import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

/**
 * 分页查询dto验证
 * @description nullable 表示该字段是否可以为空.
 */
@ArgsType()
export class AdSearchDto {
  @Field(() => Int, { nullable: true })
  readonly type?: number;

  @Field(() => Int)
  @Min(1)
  readonly page: number;

  @Field(() => Int)
  @Min(5)
  @Max(30)
  readonly size = 10;
}
