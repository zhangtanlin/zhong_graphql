import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateInput } from './dto/user.create.input';
import { PagingArgs } from 'src/common/dto/paging.args';
import { UserLoginInput } from './dto/user.login.input';
import { UserLoginResult } from './dto/user.login.result';
import { ConfigService } from '@nestjs/config';
import { HmacSHA512 } from 'src/common/utils/cryptoData';
import { RoleEntity } from 'src/role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 新增
   * @class [UserCreateDto] 新增用户dto
   * @function createUser   验证账号是否存在
   * @function save             保存用户信息
   */
  async createUser(userCreateDto: UserCreateInput): Promise<UserEntity> {
    try {
      // 设置资源
      const _roleOne: RoleEntity = new RoleEntity();
      _roleOne.id = 1;
      const _roleList: RoleEntity[] = [_roleOne];
      // 密码加密
      userCreateDto.password = HmacSHA512({
        type: 'sha512',
        key: this.configService.get('TOKEN_KEY'),
        data: userCreateDto.password,
      });
      // 设置插入数据
      const _data: UserCreateInput = {
        ...userCreateDto,
        ...{
          roleList: _roleList,
        },
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
   * @description 注意这里可以使用[findOne]和[findOneOrFail]两种方式(参数一致),建议使用[findOneOrFail].
   */
  async findOneById(id: number): Promise<UserEntity> {
    try {
      // 根据用户id查询用户数据
      const _user: UserEntity = await this.userRepository.findOneOrFail({
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

  /**
   * 登陆
   * @class [UserLoginDto] - 验证用户登陆参数的dto【用户名和密码】
   * @callback 返回token字符串
   */
  async login(userLoginInput: UserLoginInput): Promise<UserLoginResult> {
    // 验证account是否存在
    const _user = { account: userLoginInput.account };
    const findOneByAccount = await this.userRepository.findOne({
      where: _user,
    });
    if (!findOneByAccount) {
      throw new HttpException({ message: '账号不存在' }, 403);
    }
    // 验证用户名和密码是否匹配
    const findOneUser = await this.userRepository.findOneBy({
      account: userLoginInput.account,
      password: HmacSHA512({
        type: 'sha512',
        key: this.configService.get('TOKEN_KEY'),
        data: userLoginInput.password,
      }), // 密码加密
    });
    if (!findOneUser) {
      throw new HttpException({ message: '密码错误' }, 403);
    }
    return {
      user: userLoginInput.account,
      token: 'token',
    };
  }
}
