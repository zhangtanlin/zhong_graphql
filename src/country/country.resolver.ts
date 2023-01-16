import { HttpException } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { CountryCreateInput } from './dto/country.create.input';

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  // 查询所有
  @Query(() => [CountryEntity])
  async countryFindAll() {
    try {
      const _res = await this.countryService.findAll();
      return _res;
    } catch (error) {
      throw new HttpException({ message: '查询所有数据失败' }, 502);
    }
  }
  /**
   * 查询一条
   * @return CountryEntity 根据grqphql模式返回
   */
  @Query(() => CountryEntity)
  async postsFindOneById(@Args('id') id: number) {
    try {
      return await this.countryService.findOneById(id);
    } catch (error) {
      throw new HttpException({ message: '根据id查询一条数据失败' }, 502);
    }
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param _        参数占位符
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => CountryEntity)
  async createPosts(
    @Args('countryCreateInput') countryCreateInput: CountryCreateInput,
  ) {
    const create = await this.countryService.create(countryCreateInput);
    return create;
  }
}
