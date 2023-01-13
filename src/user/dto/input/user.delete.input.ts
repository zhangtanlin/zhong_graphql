import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

// 删除用户必填参数
@InputType()
export class UserDeleteInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}
