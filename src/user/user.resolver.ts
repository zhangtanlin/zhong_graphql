import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UserDto } from './dto/dto';
import { UserInputDto } from './dto/input.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // 查询所有
  @Query(() => [UserDto])
  async userFindAll() {
    try {
      const find = await this.userService.findUser();
      return find || [];
    } catch (error) {
      return ['错误'];
    }
  }

  // 查询一条
  @Query(() => UserDto)
  async userFindOneById(_, @Args('id') id: number) {
    try {
      return await this.userService.findOneById(id);
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
  @Mutation(() => UserDto)
  async userCreate(_, @Args('inputDto') inputDto: UserInputDto) {
    const create = await UserEntity.create(inputDto).save();
    return create;
  }
}
