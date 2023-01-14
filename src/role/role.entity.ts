import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 数据表
 * @entity posts 数据库表名
 */
@ObjectType()
@Entity('role')
export class RoleEntity {
  // 用户id(自增id)
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  // 名称
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  name: string;

  // 类型【 0 ：超级管理员， 1 ：系统管理员， 2 ：操作员， 3 ：审计员】
  @Field(() => Int, { nullable: true })
  @Column({
    name: 'role_type',
    default: 1,
  })
  roleType: number;

  // 描述
  @Field(() => String, { nullable: true })
  @Column({
    default: '',
  })
  description: string;

  // 是否是初始化值（缺省）【 0 ：不是， 1 ：是】
  @Field(() => Int, { nullable: true })
  @Column({
    name: 'default_flag',
    default: 0,
  })
  defaultFlag: number;

  // 角色对应的资源[用逗号分割的资源id组成的字符串]
  @Field(() => String, { nullable: true })
  @Column({
    name: 'resources',
    default: '',
  })
  resources: string;

  // 用户
  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.roleList)
  @JoinColumn({ name: 'user_roles' })
  user: UserEntity;
}
