import { Field } from '@nestjs/graphql';

/**
 * 查询dto验证
 * @param {number} [type] 类型
 */
export class AdInputDto {
  @Field()
  name: string;

  // 类型
  @Field()
  type: number;

  @Field()
  src: string;

  @Field()
  link: string;

  @Field()
  status: number;

  @Field()
  explanation?: string;
}
