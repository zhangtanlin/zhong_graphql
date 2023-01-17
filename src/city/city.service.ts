import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdArg } from 'src/common/dto/id.arg';
import { CountryService } from 'src/country/country.service';
import { Repository } from 'typeorm';
import { CityEntity } from './city.entity';
import { CityCreateInput } from './dto/city.create.input';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly countryService: CountryService,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto] - 新增用户dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(cityCreateInput: CityCreateInput): Promise<CityEntity> {
    try {
      // 验证城市是否已经存在
      const findOneParam = {
        name: cityCreateInput.name,
      };
      const findOneByName: CityEntity = await this.cityRepository.findOneBy(
        findOneParam,
      );
      if (findOneByName) {
        throw new HttpException({ message: '城市已存在' }, 502);
      }
      // 验证国家是否存在
      const cityParam = {
        id: cityCreateInput.country_id,
      };
      const findCountryById = await this.countryService.findOneById(cityParam);
      if (!findCountryById) {
        throw new HttpException({ message: '国家不存在' }, 502);
      }
      // 保存城市
      const _country = new CityEntity();
      _country.name = cityCreateInput.name;
      _country.code = cityCreateInput.code;
      _country.country = findCountryById;
      const _create = await this.cityRepository.save(_country);
      return _create;
    } catch (error) {
      throw new HttpException('新增国家失败', 502);
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(arg: IdArg): Promise<CityEntity> {
    try {
      const _find: CityEntity = await this.cityRepository.findOneBy(arg);
      return _find;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  // 查询所有
  async findAll(): Promise<CityEntity[]> {
    try {
      return await this.cityRepository.find();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
