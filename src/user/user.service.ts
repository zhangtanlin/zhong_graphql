import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateInput } from './dto/input/user.create.input';
import { PagingArgs } from 'src/common/dto/paging.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) {}

  /**
   * 新增
   * @class [UserCreateDto] 新增用户dto
   * @function createUser   验证账号是否存在
   * @function save             保存用户信息
   */
  async createUser(userCreateDto: UserCreateInput): Promise<UserEntity> {
    try {
      const _data: UserCreateInput = {
        ...userCreateDto,
      };
      const _user = await this.userRepository.save(_data);
      return _user;
    } catch (error) {
      throw new HttpException({ message: '新增用户失败' }, 502);
    }
  }

  /**
   * 查询所有
   * @descript 注意这里的查询方法是能够查询到一对多的数据的
   */
  async findAll(): Promise<UserEntity[]> {
    try {
      const _res: UserEntity[] = await this.userRepository.find({
        relations: ['roleList'],
      });
      return _res;
    } catch (error) {
      throw new HttpException({ message: '查询所有用户失败' }, 502);
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(id: number): Promise<UserEntity> {
    try {
      // 根据用户id查询用户数据
      const _user: UserEntity = await this.userRepository.findOne({
        where: { id },
        relations: ['roleList'],
      });
      return _user;
    } catch (error) {
      throw new HttpException({ message: '根据id查询用户失败' }, 502);
    }
  }

  // 分页查询
  async findByPaging(pagingArgs: PagingArgs): Promise<UserEntity[]> {
    try {
      const _skip: number = (pagingArgs.page - 1) * pagingArgs.size;
      const _take: number = pagingArgs.size;
      const _list: UserEntity[] = await this.userRepository
        .createQueryBuilder('user')
        .skip(_skip)
        .take(_take)
        .getMany();
      return _list;
    } catch (error) {
      throw new HttpException({ message: '分页查询失败' }, 502);
    }
  }
}
