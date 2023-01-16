import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './country.entity';
import { CountryCreateInput } from './dto/country.create.input';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto] - 新增用户dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(countryCreateInput: CountryCreateInput): Promise<CountryEntity> {
    try {
      const findOneByAccount: CountryEntity[] =
        await this.countryRepository.find({
          where: countryCreateInput,
        });
      if (findOneByAccount?.length > 0) {
        throw new HttpException({ message: '当前帐号已存在' }, 502);
      }
      const createPosts = this.countryRepository.create(countryCreateInput);
      return createPosts;
    } catch (error) {
      console.log('error', error);
      throw new HttpException('新增国家失败', 502);
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(id: number): Promise<CountryEntity> {
    try {
      const _find: CountryEntity = await this.countryRepository.findOneBy({
        id,
      });
      return _find;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  // 查询所有
  async findAll(): Promise<CountryEntity[]> {
    try {
      return await this.countryRepository.find();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
