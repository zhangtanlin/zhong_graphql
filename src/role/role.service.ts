import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '../resource/resource.service';
import { In, Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { IdArg } from 'src/common/dto/id.arg';
import { RoleCreateInput } from './dto/role.create.input';
import { RoleSearchArg } from './dto/role.search.arg';
import { RoleUpdateInput } from './dto/role.update.input';
import { from, map, Observable } from 'rxjs';

// 角色服务
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly resourceService: ResourceService,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto]     新增dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存新信息
   */
  create(input: RoleCreateInput) {
    // 验证角色是否已经存在
    const verifyParams = {
      name: input.name,
    };
    return from(this.roleRepository.findOneBy(verifyParams)).pipe(
      map((data) => {
        if (data) {
          throw new UnprocessableEntityException();
        } else {
          this.roleRepository.save(input);
          return true;
        }
      }),
    );
  }

  /**
   * 更新
   * @param data 可选参数
   * @returns 更新后的数据
   */
  async update(data: RoleUpdateInput): Promise<RoleEntity> {
    try {
      // 验证角色是否已经存在
      const verifyParams = {
        id: data.id,
      };
      const verifyRole = await this.roleRepository.findOneBy(verifyParams);
      if (verifyRole) {
        throw new HttpException({ message: '角色已存在' }, 502);
      }
      // 保存角色
      const save: RoleEntity = await this.roleRepository.save(data);
      return save;
    } catch (error) {
      throw new HttpException({ message: '新增角色' }, 502);
    }
  }

  // 查询所有数据
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
   * @function arg 查询的id
   */
  async findOneById(arg: IdArg): Promise<RoleEntity> {
    try {
      const _user: RoleEntity = await this.roleRepository.findOneBy(arg);
      return _user;
    } catch (error) {
      throw new HttpException({ message: '根据id查询角色失败' }, 502);
    }
  }

  /**
   * 根据id数组查询数据
   * @param {number[]} [ids] id数组
   */
  async findByIds(ids: string[]): Promise<RoleEntity[]> {
    try {
      const roleFindByIds: RoleEntity[] = await this.roleRepository.findBy({
        id: In(ids),
      });
      return roleFindByIds;
    } catch (error) {
      throw new HttpException({ message: '根据id数组查询角色失败' }, 502);
    }
  }

  // 根据查询条件查询一条数据
  async findOne(arg: RoleSearchArg): Promise<RoleEntity> {
    try {
      const _user: RoleEntity = await this.roleRepository.findOneBy(arg);
      return _user;
    } catch (error) {
      throw new HttpException({ message: '查询角色失败' }, 502);
    }
  }
}
