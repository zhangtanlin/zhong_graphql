import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

// 搜索用户必填和选填的参数
@ArgsType()
export class UserSearchArgs {
  @Field(() => String, { nullable: true })
  @IsString()
  account: string;

  @Field(() => String, { nullable: true })
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  email?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  age?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  area_id?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  status?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  firm?: string;
}
