import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

// 验证账号
@ArgsType()
export class UserAccountArg {
  @Field(() => String)
  @IsString()
  account: string;
}
