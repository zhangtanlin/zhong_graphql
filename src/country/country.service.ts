import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from 'src/common/dto/id.dto';
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
   * @class [UserInsertDto]     新增dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(countryCreateInput: CountryCreateInput): Promise<CountryEntity> {
    try {
      const findByAccount: CountryEntity =
        await this.countryRepository.findOneBy(countryCreateInput);
      if (findByAccount) {
        throw new HttpException({ message: '当前帐号已存在' }, 502);
      }
      const create = await this.countryRepository.save(countryCreateInput);
      return create;
    } catch (error) {
      throw new HttpException('新增失败', 502);
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(id: IdDto): Promise<CountryEntity> {
    try {
      const _find: CountryEntity = await this.countryRepository.findOne({
        where: id,
        relations: ['cityList'],
      });
      return _find;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  // 查询所有
  async findAll(): Promise<CountryEntity[]> {
    try {
      const _res: CountryEntity[] = await this.countryRepository.find();
      return _res;
    } catch (error) {
      throw new HttpException({ message: '查询所有国家失败' }, 502);
    }
  }
}
