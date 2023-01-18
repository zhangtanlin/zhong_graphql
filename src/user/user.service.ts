import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateInput } from './dto/user.create.input';
import { PagingArgs } from 'src/common/dto/paging.arg';
import { UserLoginInput } from './dto/user.login.input';
import { UserLoginResult } from './dto/user.login.result';
import { ConfigService } from '@nestjs/config';
import { HmacSHA512 } from 'src/common/utils/cryptoData';
import { IdArg } from 'src/common/dto/id.arg';
import { UserAccountArg } from './dto/user.account.arg';
import { RoleEntity } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { UserUpdateInput } from './dto/user.update.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly roleService: RoleService,
  ) {}

  /**
   * 新增
   * @class [UserCreateDto] 新增用户dto
   * @function createUser   验证账号是否存在
   * @function save             保存用户信息
   */
  async create(input: UserCreateInput): Promise<UserEntity> {
    try {
      // 判定用户是否存在
      const verifyParam: UserAccountArg = {
        account: input.account,
      };
      const verifyUser: UserEntity = await this.userRepository.findOneBy(
        verifyParam,
      );
      if (verifyUser) {
        throw new HttpException({ message: '用户已存在' }, 502);
      }
      // 密码加密
      input.password = HmacSHA512({
        type: 'sha512',
        key: this.configService.get('TOKEN_KEY'),
        data: input.password,
      });

      const _user = await this.userRepository.save(input);
      return _user;
    } catch (error) {
      throw new HttpException({ message: '新增用户失败' }, 502);
    }
  }

  /**
   * 更新用户
   */
  async update(input: UserUpdateInput): Promise<UserEntity> {
    try {
      // 判定用户是否存在
      const verifyParam: UserAccountArg = {
        account: input.account,
      };
      const tempUser: UserEntity = await this.userRepository.findOneBy(
        verifyParam,
      );
      if (!tempUser) {
        throw new HttpException({ message: '用户不存在' }, 502);
      }
      // 密码加密
      input.password = HmacSHA512({
        type: 'sha512',
        key: this.configService.get('TOKEN_KEY'),
        data: input.password,
      });
      // 构造新的数据
      tempUser.password = input.password;
      const _user = await this.userRepository.save(input);
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
  async findOneById(arg: IdArg): Promise<UserEntity> {
    try {
      // 根据用户id查询用户数据
      const _user: UserEntity = await this.userRepository.findOneOrFail({
        where: arg,
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
