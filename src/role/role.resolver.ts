import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
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
  async roleFindOneById(@Args('id') id: number) {
    return await this.roleService.findOneById(id);
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param _        参数占位符
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => RoleEntity)
  async roleCreate(@Args('roleCreateInput') roleCreateInput: RoleCreateInput) {
    const _user = new UserEntity();
    _user.account = 'test1';
    const _role = new RoleEntity();
    _role.name = roleCreateInput.name;
    _role.userList = [_user];
    const create = await this.roleService.create(_role);
    return create;
  }
}
