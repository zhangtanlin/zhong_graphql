import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { IdDto } from 'src/common/dto/id.dto';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { CountryCreateInput } from './dto/country.create.input';

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  // 查询所有
  @Query(() => [CountryEntity])
  async countryFindAll(): Promise<CountryEntity[]> {
    return await this.countryService.findAll();
  }
  /**
   * 查询一条
   * @return CountryEntity 根据grqphql模式返回
   */
  @Query(() => CountryEntity)
  async countryFindOneById(@Args() id: IdDto) {
    return await this.countryService.findOneById(id);
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param _        参数占位符
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => CountryEntity)
  async countryCreate(@Args('input') input: CountryCreateInput) {
    return await this.countryService.create(input);
  }
}
