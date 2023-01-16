import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';

/**
 * 数据表
 * @entity resource 数据库表名
 */
@ObjectType()
@Entity('resource')
export class ResourceEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // 资源父id
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    default: null,
  })
  pid: number;

  // 资源名称
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  name: string;

  // 资源别名
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  alias: string;

  /**
   * 资源类型
   * @description {1:"菜单",2:"按钮"}
   */
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    default: 1,
  })
  type: number;

  // 路由地址【客户端路由跳转地址】
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  href: string;

  /**
   * 组件地址
   * @description 关联的view的组件路径
   */
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  target: string;

  // 图标
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: 'el-icon-edit',
  })
  icon: string;

  /**
   * 是否显示
   * @description {0:"不显示",1:"显示"}
   */
  @Field(() => Int, { nullable: true })
  @Column({
    name: 'is_show',
    type: 'int',
    default: 1,
  })
  isShow: number;

  /**
   * 是否在导航栏显示
   * @description {0:"不是导航栏",1:"是导航栏"}
   */
  @Field(() => Int, { nullable: true })
  @Column({
    name: 'is_navigation',
    type: 'int',
    default: 0,
  })
  isNavigation: number;

  /**
   * 权限
   * @description 【由web/sys:路由:method】例如web:home:get
   */
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  permission: string;

  // 说明
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  description: string;

  /**
   * 对应的角色列表(多个角色对应多个资源)
   * 注意1:@JoinTable()是@ManyToMany()关系所必需的,必须把@JoinTable放在关系的一个(拥有)方面.
   * 注意2:@JoinColumn()是@ManyToOne()/@OneToMany()关系所必需的,会在单一关系表内添加一列作为关系列.
   */
  @Field(() => [RoleEntity], { nullable: true })
  @ManyToMany(() => RoleEntity, (role) => role.resourceList)
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
  roleList: RoleEntity[];
}
