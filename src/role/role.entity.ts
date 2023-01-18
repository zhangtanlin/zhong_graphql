import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ResourceEntity } from 'src/resource/resource.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 数据表
 * @entity posts 数据库表名
 */
@ObjectType()
@Entity('role')
export class RoleEntity extends BaseEntity {
  // 用户id(自增id)
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id?: number;

  // 名称(通常为英文,便于查询)
  @Field(() => String)
  @IsNotEmpty({ message: '角色名称不能为空' })
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  // 别名(通常为中文)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  alias?: string;

  // 类型【 0 ：超级管理员， 1 ：系统管理员， 2 ：操作员， 3 ：审计员】
  @Field(() => Int, { nullable: true })
  @Column({
    name: 'role_type',
    default: 1,
  })
  roleType?: number;

  // 描述
  @Field(() => String, { nullable: true })
  @Column({
    default: '',
  })
  description?: string;

  /**
   * 是否是初始化值(缺省)
   * @description {0:不是,1:是}
   */
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1,
  })
  defaultFlag?: number;

  // 角色对应的资源[用逗号分割的资源id组成的字符串]
  @Field(() => String, { nullable: true })
  @Column({
    name: 'resources',
    default: '',
  })
  resources?: string;

  /**
   * 对应的用户列表(多个用户对应多个角色)
   * 注意1:@JoinTable()是@ManyToMany()关系所必需的,必须把@JoinTable放在关系的一个(拥有)方面.
   * 注意2:@JoinColumn()是@ManyToOne()/@OneToMany()关系所必需的,会在单一关系表内添加一列作为关系列.
   */
  @Field(() => [UserEntity], { nullable: true })
  @ManyToMany(() => UserEntity, (user) => user.roleList)
  userList?: UserEntity[];

  /**
   * 对应的资源列表(多个角色对应多个资源)
   * 注意1:@JoinTable()是@ManyToMany()关系所必需的,必须把@JoinTable放在关系的一个(拥有)方面.
   * 注意2:@JoinColumn()是@ManyToOne()/@OneToMany()关系所必需的,会在单一关系表内添加一列作为关系列.
   */
  @Field(() => [ResourceEntity], { nullable: true })
  @ManyToMany(() => ResourceEntity, (resource) => resource.roleList)
  @JoinTable({
    name: 'role_resource',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'resource_id',
      referencedColumnName: 'id',
    },
  })
  resourceList?: ResourceEntity[];
}
