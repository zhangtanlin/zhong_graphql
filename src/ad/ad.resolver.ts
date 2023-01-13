import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { AdService } from './ad.service';
import { AdInputDto } from './dto/ad.input.dto';
import { AdPagingResultDto } from './dto/ad.paging.dto';
import { AdSearchDto } from './dto/ad.search.dto';

@Resolver()
export class AdResolver {
  constructor(private readonly adService: AdService) {}

  // 分页查询
  @Query(() => [AdSearchDto])
  async adFindAll(
    @Args('params') params: AdSearchDto,
  ): Promise<AdPagingResultDto> {
    console.log('params', params);
    console.log('params1', params.page);
    console.log('params2', params.size);
    return await this.adService.getManyAndCount(params);
  }

  // 查询一条
  @Query(() => AdSearchDto)
  async adFindOneById(@Args('id') id: number) {
    console.log('id', id);
    return await this.adService.findOneById(id);
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => AdInputDto)
  async adCreate(@Args('inputDto') inputDto: AdInputDto) {
    const create = await this.adService.create(inputDto);
    return create;
  }
}
