import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdArg } from 'src/common/dto/id.arg';
import { In, Repository } from 'typeorm';
import { ResourceCreateInput } from './dto/resource.create.input';
import { ResourceEntity } from './resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto]     新增dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(input: ResourceCreateInput): Promise<ResourceEntity> {
    try {
      const _resource = await this.resourceRepository.save(input);
      return _resource;
    } catch (error) {
      throw error;
    }
  }

  // 查询所有
  async findAll(): Promise<ResourceEntity[]> {
    try {
      const _res: ResourceEntity[] = await this.resourceRepository.find();
      return _res;
    } catch (error) {
      throw new HttpException({ message: '查询所有国家失败' }, 502);
    }
  }

  /**
   * 根据id数组查询数据
   * @param ids id数组
   */
  async resourcesFindByIds(ids: number[]): Promise<ResourceEntity[]> {
    try {
      const resourcesFindByIds: ResourceEntity[] =
        await this.resourceRepository.findBy({
          id: In(ids),
        });
      if (resourcesFindByIds) {
        return resourcesFindByIds || [];
      }
    } catch (error) {
      console.log('9999');
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(arg: IdArg): Promise<ResourceEntity> {
    try {
      const _user: ResourceEntity = await this.resourceRepository.findOneBy(
        arg,
      );
      return _user;
    } catch (error) {
      throw error;
    }
  }
}
