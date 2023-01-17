import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { ResourceCreateInput } from './dto/resource.create.input';
import { ResourceEntity } from './resource.entity';
import { ResourceService } from './resource.service';
import { IdArg } from 'src/common/dto/id.arg';

@Resolver()
export class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  // 查询所有
  @Query(() => [ResourceEntity])
  async resourceFindAll() {
    return await this.resourceService.findAll();
  }

  // 查询一条
  @Query(() => ResourceEntity)
  async resourceFindOneById(@Args() arg: IdArg) {
    return await this.resourceService.findOneById(arg);
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => ResourceEntity)
  async resourceCreate(@Args('input') input: ResourceCreateInput) {
    const create = await this.resourceService.create(input);
    if (create) {
      return true;
    }
    return false;
  }
}
