import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '../resource/resource.service';
import { In, Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { RoleDto } from './dto/dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly resourceService: ResourceService,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto]     新增用户dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(data: RoleEntity): Promise<RoleEntity> {
    try {
      const _role: RoleEntity = await this.roleRepository.save(data);
      return _role;
    } catch (error) {
      throw new HttpException({ message: '新增角色' }, 502);
    }
  }

  /**
   * 查询所有数据
   * @class [UserInsertDto]     dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async findAll(): Promise<any[]> {
    try {
      const cb = [];
      const find: RoleEntity[] = await this.roleRepository.find();
      if (find.length) {
        for (const iterator of find) {
          let tempResourceFindByIds = [],
            tempRoleDto = {};
          if (iterator.resources) {
            const tempResources = iterator.resources.split(',').map(Number);
            tempResourceFindByIds =
              await this.resourceService.resourcesFindByIds(tempResources);
          }
          tempRoleDto = { ...iterator, resources: tempResourceFindByIds || [] };
          cb.push(tempRoleDto);
        }
      }
      return cb;
    } catch (error) {
      throw new HttpException({ message: '查询所有角色失败' }, 502);
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(id: number): Promise<RoleEntity> {
    try {
      const _user: RoleEntity = await this.roleRepository.findOneBy({ id });
      return _user;
    } catch (error) {
      throw new HttpException({ message: '根据id查询角色失败' }, 502);
    }
  }

  /**
   * 根据id数组查询数据
   * @param {number[]} [ids] id数组
   */
  async findByIds(ids: number[]): Promise<RoleDto[]> {
    try {
      const cb = [];
      const roleFindByIds: RoleEntity[] = await this.roleRepository.findBy({
        id: In(ids),
      });
      if (roleFindByIds.length) {
        for (const iterator of roleFindByIds) {
          let tempFindByIds,
            tempDto = {};
          if (iterator.resources) {
            const tempIds = iterator.resources.split(',').map(Number);
            tempFindByIds = await this.resourceService.resourcesFindByIds(
              tempIds,
            );
          }
          tempDto = { ...iterator, resources: tempFindByIds || [] };
          cb.push(tempDto);
        }
      }
      return cb;
    } catch (error) {
      throw new HttpException({ message: '根据id数组查询角色失败' }, 502);
    }
  }
}
