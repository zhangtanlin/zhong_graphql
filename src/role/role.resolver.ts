import { HttpException } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { IdsDto } from 'src/common/dto/id.dto';
import { RoleDto } from './dto/dto';
import { RoleInputDto } from './dto/input.dto';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  // 查询所有
  @Query(() => [RoleDto])
  async roleFindAll() {
    try {
      const find = await this.roleService.findAll();
      return find || [];
    } catch (error) {
      return ['错误'];
    }
  }

  // 查询一条
  @Query(() => RoleDto)
  async roleFindOneById(_, @Args('id') id: number) {
    try {
      return await this.roleService.findOneById(id);
    } catch (error) {
      return ['错误'];
    }
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param _        参数占位符
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => RoleDto)
  async roleCreate(@Args('inputDto') inputDto: RoleInputDto) {
    const create = await this.roleService.create(inputDto as RoleEntity);
    return create;
  }
}
