import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// 登陆返回数据格式
@ObjectType()
export class UserLoginResult {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '用户不能为空' })
  @IsString()
  user?: string;

  @Field(() => String)
  token: string;
}
