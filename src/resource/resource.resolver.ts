import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { ResourceDto } from './dto/dto';
import { ResourceInputDto } from './dto/input.dto';
import { ResourceEntity } from './resource.entity';
import { ResourceService } from './resource.service';

@Resolver()
export class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  // 查询所有
  @Query(() => [ResourceDto])
  async resourceFindAll() {
    try {
      return await ResourceEntity.find();
    } catch (error) {
      return ['错误'];
    }
  }

  // 查询一条
  @Query(() => ResourceDto)
  async resourceFindOneById(_, @Args('id') id: number) {
    try {
      return await this.resourceService.findOneById(id);
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
  @Mutation(() => ResourceDto)
  async resourceCreate(
    _,
    @Args('resourceInputDto') resourceInputDto: ResourceInputDto,
  ) {
    const create = await ResourceEntity.create(
      resourceInputDto as ResourceEntity,
    );
    if (create) {
      return true;
    }
    return false;
  }
}
