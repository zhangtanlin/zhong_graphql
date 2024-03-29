import { Field, InputType } from '@nestjs/graphql';

/**
 * 新增
 */
@InputType()
export class ResourceCreateInput {
  @Field()
  pid: number;

  @Field()
  name: string;

  @Field()
  alias: string;

  @Field()
  type: number;

  @Field()
  href: string;

  @Field()
  target: string;

  @Field()
  icon: string;

  @Field()
  isShow: number;

  @Field()
  isNavigation: number;

  @Field()
  permission: string;

  @Field()
  description: string;
}
