import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ResourceDto } from './dto/dto';
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
  async create(data: ResourceEntity): Promise<ResourceDto> {
    try {
      const _resource = await this.resourceRepository.save(data);
      return _resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 根据id数组查询数据
   * @param ids id数组
   */
  async resourcesFindByIds(ids: number[]): Promise<ResourceDto[]> {
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
  async findOneById(id: number): Promise<ResourceEntity> {
    try {
      const _user: ResourceEntity = await this.resourceRepository.findOneBy({
        id,
      });
      return _user;
    } catch (error) {
      throw error;
    }
  }
}
