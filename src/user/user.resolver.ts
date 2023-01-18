import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { IdArg } from 'src/common/dto/id.arg';
import { PagingArgs } from 'src/common/dto/paging.arg';
import { UserCreateInput } from './dto/user.create.input';
import { UserLoginInput } from './dto/user.login.input';
import { UserLoginResult } from './dto/user.login.result';
import { UserUpdateInput } from './dto/user.update.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // 查询所有
  @Query(() => [UserEntity])
  async userFindAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  // 分页查询
  @Query(() => [UserEntity])
  async userFindByPaging(@Args() args: PagingArgs): Promise<UserEntity[]> {
    const _list: UserEntity[] = await this.userService.findByPaging(args);
    return _list;
  }

  // 查询一条
  @Query(() => UserEntity)
  async userFindOneById(@Args() arg: IdArg) {
    return await this.userService.findOneById(arg);
  }

  // 登录
  @Query(() => UserLoginResult)
  async login(@Args('input') input: UserLoginInput) {
    return await this.userService.login(input);
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param _        参数占位符
   * @param Arg      参数-前端传过来的
   * @description 这里的dto如果是使用 @ArgsType 定义,使用写法是`@Args() userCreateDto: UserCreateDto`,如果使用 @InputType 定义,使用写法是`@Args('userCreateDto') userCreateDto: UserCreateDto`.特别注意的是请求格式也会有不同.
   */
  @Mutation(() => UserEntity)
  async userCreate(@Args('input') input: UserCreateInput): Promise<UserEntity> {
    return await this.userService.create(input);
  }

  // 更新
  @Mutation(() => UserEntity)
  async userUpdate(@Args('input') input: UserUpdateInput): Promise<UserEntity> {
    return await this.userService.update(input);
  }
}
