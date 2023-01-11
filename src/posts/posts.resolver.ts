import { HttpException } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { PostsDto } from './dto/posts.dto';
import { PostsInputDto } from './dto/posts.input.dto';
import { PostsEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  // 测试
  @Query(() => String)
  posts() {
    return '你好呀 posts';
  }

  /**
   * 查询所有
   * @return PostsDto 根据grqphql模式返回
   */
  @Query(() => [PostsDto])
  async postsFindAll() {
    try {
      const _res = await PostsEntity.find();
      return _res;
    } catch (error) {
      throw new HttpException({ message: '查询所有数据失败' }, 502);
    }
  }
  /**
   * 查询一条
   * @return PostsDto 根据grqphql模式返回
   */
  @Query(() => PostsDto)
  async postsFindOneById(_, @Args('id') id: number) {
    try {
      return await this.postsService.findOneById(id);
    } catch (error) {
      throw new HttpException({ message: '根据id查询一条数据失败' }, 502);
    }
  }

  /**
   * 新增
   * @param account  参数邮箱
   * @param password 参数密码
   * @param _        参数占位符
   * @param Arg      参数-前端传过来的
   */
  @Mutation(() => PostsDto)
  async createPosts(_, @Args('postsInputDto') postsInputDto: PostsInputDto) {
    const create = await this.postsService.create(postsInputDto);
    return create;
  }
}
