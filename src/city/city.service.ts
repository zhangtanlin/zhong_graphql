import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './city.entity';
import { CityCreateInput } from './dto/city.create.input';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto] - 新增用户dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(cityCreateInput: CityCreateInput): Promise<CityEntity> {
    try {
      const findOneByAccount: CityEntity[] = await this.cityRepository.find({
        where: cityCreateInput,
      });
      if (findOneByAccount?.length > 0) {
        throw new HttpException({ message: '当前帐号已存在' }, 502);
      }
      const createPosts = this.cityRepository.create(cityCreateInput);
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
  async findOneById(id: number): Promise<CityEntity> {
    try {
      const _find: CityEntity = await this.cityRepository.findOneBy({
        id,
      });
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
