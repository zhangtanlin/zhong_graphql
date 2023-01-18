import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 跟新用户必填和选填的参数
 * 注意1:@ArgsType 表示在解析器中用作类型,这种类型在传递参数时不用拼写成json,只需要传递json内的数据,推荐写法.
 * 注意2:@ObjectType 表示在用于模式生成,标示这是Graphql的Schema,表示实体,返回的数据格式.
 * 注意2:@InputType 表示传递的是一个json,需要特别指出的是这种类型需要申明dto然后冒号后面跟json.
 * 注意4:这里的验证分为graphql验证和使用class-validator验证,两者区别还未学完.
 */
@InputType()
export class UserUpdateInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'id不能为空' })
  @IsInt()
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString()
  account?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '姓名不能为空' })
  @IsString()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '头像不能为空' })
  @IsString()
  avatar?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '联系方式不能为空' })
  @IsString()
  phone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString()
  email?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '年龄不能为空' })
  @IsInt()
  age?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '所属区域id不能为空' })
  @IsString()
  area_id?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '状态不能为空' })
  @IsInt()
  status?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '描述不能为空' })
  @IsString()
  department?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: '公司名称不能为空' })
  @IsString()
  firm?: string;
}
