import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 创建用户必填和选填的参数
 * 注意1:@ArgsType 表示在解析器中用作类型,这种类型在传递参数时不用拼写成json,只需要传递json内的数据,推荐写法.
 * 注意2:@ObjectType 表示在用于模式生成,标示这是Graphql的Schema,表示实体,返回的数据格式.
 * 注意2:@InputType 表示传递的是一个json,需要特别指出的是这种类型需要申明dto然后冒号后面跟json.
 * 注意4:这里的验证分为graphql验证和使用class-validator验证,两者区别还未学完.
 */
@InputType()
export class UserCreateInput {
  @Field(() => String)
  @IsString()
  account: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'id不能为空' })
  @IsString()
  password: string;

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
  department?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  firm?: string;
}
