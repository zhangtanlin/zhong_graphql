import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// 登录
@InputType()
export class UserLoginInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString()
  account?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password?: string;
}
