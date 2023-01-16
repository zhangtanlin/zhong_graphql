import { HttpException } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';
import { CityCreateInput } from './dto/city.create.input';

@Resolver()
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  // 查询所有
  @Query(() => [CityEntity])
  async CityFindAll() {
    try {
      const _res = await this.cityService.findAll();
      return _res;
    } catch (error) {
      throw new HttpException({ message: '查询所有数据失败' }, 502);
    }
  }
  /**
   * 查询一条
   * @return CityEntity 根据grqphql模式返回
   */
  @Query(() => CityEntity)
  async postsFindOneById(@Args('id') id: number) {
    try {
      return await this.cityService.findOneById(id);
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
  @Mutation(() => CityEntity)
  async createPosts(@Args('cityCreateInput') cityCreateInput: CityCreateInput) {
    const create = await this.cityService.create(cityCreateInput);
    return create;
  }
}
