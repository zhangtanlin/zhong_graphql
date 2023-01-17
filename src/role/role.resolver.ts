import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { IdArg } from 'src/common/dto/id.arg';
import { UserCreateInput } from 'src/user/dto/user.create.input';
import { UserEntity } from 'src/user/user.entity';
import { RoleCreateInput } from './dto/role.create.input';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  // 查询所有
  @Query(() => [RoleEntity])
  async roleFindAll() {
    return await this.roleService.findAll();
  }

  // 查询一条
  @Query(() => RoleEntity)
  async roleFindOneById(@Args() arg: IdArg) {
    return await this.roleService.findOneById(arg);
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => RoleEntity)
  async roleCreate(
    @Args('role') role: RoleCreateInput,
    @Args('user') user: UserCreateInput,
  ) {
    // 初始化一个角色
    const verifyInit: RoleEntity = await this.roleService.findOne({
      name: 'root',
    });
    if (!verifyInit) {
      const initRole: RoleCreateInput = {
        name: 'root',
        alias: '超级管理员',
        roleType: 0,
        description: '系统默认超级管理员角色',
        defaultFlag: 1,
      };
      await this.roleService.create(initRole);
    }
    role = {
      ...role,
      ...{
        userList: user,
      },
    };
    const create = await this.roleService.create(role);
    return create;
  }
}
