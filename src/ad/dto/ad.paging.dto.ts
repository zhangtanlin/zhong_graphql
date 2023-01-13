import { ArgsType, Field, Int } from '@nestjs/graphql';
import { AdEntity } from '../ad.entity';

/**
 * 分页查询返回dto验证
 * @description nullable 表示该字段是否可以为空.
 */
@ArgsType()
export class AdPagingResultDto {
  // 页码
  @Field()
  list: AdEntity[];

  // 每页展示的条数
  @Field(() => Int)
  total: number;
}
