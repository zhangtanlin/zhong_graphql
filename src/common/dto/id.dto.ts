import { ArgsType, Field, Int } from '@nestjs/graphql';

/**
 * id查询dto验证
 * @description nullable 表示该字段是否可以为空.
 */
@ArgsType()
export class IdDto {
  @Field(() => Int)
  readonly id: number;
}

// id数组查询dto验证
@ArgsType()
export class IdsDto {
  @Field(() => [Int])
  readonly id: number[];
}
