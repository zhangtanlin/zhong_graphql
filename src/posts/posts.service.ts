import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsDto } from './dto/posts.dto';
import { PostsInputDto } from './dto/posts.input.dto';
import { PostsEntity } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto] - 新增用户dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(postsInputDto: PostsInputDto): Promise<PostsDto> {
    try {
      const findOneByAccount: PostsDto = await this.postsRepository.findOneBy({
        account: postsInputDto.account,
      });
      if (findOneByAccount) {
        throw new Error('当前帐号已存在');
      }
      const createPosts = await this.postsRepository.create(postsInputDto);
      return createPosts;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(id: number): Promise<PostsEntity> {
    try {
      const _find: PostsEntity = await this.postsRepository.findOneBy({
        id,
      });
      return _find;
    } catch (error) {
      throw error;
    }
  }
}
