import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { IdArg } from 'src/common/dto/id.arg';
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
   * @param Arg 参数-前端传过来的
   */
  @Mutation(() => RoleEntity)
  roleCreate(@Args('input') input: RoleCreateInput) {
    return this.roleService.create(input);
  }
}
