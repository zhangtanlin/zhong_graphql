import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as Moment from 'moment';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoleEntity } from 'src/role/role.entity';

/**
 * 数据表
 * @entity posts 数据库表名
 * @description @ObjectType 表示用于模式生成,标示这是Graphql的Schema,表示实体,返回的数据格式.
 */
@ObjectType()
@Entity('user')
export class UserEntity extends BaseEntity {
  // 用户id(自增id)
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // 账号
  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  account: string;

  // 用户名
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  name: string;

  // 密码
  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  password: string;

  // 头像
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  avatar: string;

  // 手机号码
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  phone: string;

  // 邮箱
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  email: string;

  // 年龄
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    default: null,
  })
  age: number;

  // 区域id(6位区域代码)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'char',
    length: 6,
    default: '',
  })
  area_id: string;

  // 角色id(角色id组成的字符串【以特殊符号（中文逗号、英文逗号）分隔】)
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: null,
  })
  roles: string;

  // 是否激活{0:'未激活',1:'已激活'}
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1,
  })
  status: number;

  // 激活时间
  @Field(() => Date, { nullable: true })
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  activate_time: Date;

  // 是否第一次登录{0: '不是', 1:'是'}
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1,
  })
  is_first_login: number;

  // 是否锁定{0: '未锁定', 1:'锁定'}
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  is_locked: number;

  // 锁定时间
  @Field(() => Date, { nullable: true })
  @Column({
    type: 'datetime',
    default: null,
  })
  locked_time: Date;

  // 是否禁用{0: '未禁用', 1:'禁用'}
  @Field(() => Int, { nullable: true })
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
  })
  is_disabled: number;

  // 禁用时间
  @Field(() => Date, { nullable: true })
  @Column({
    type: 'datetime',
    default: null,
  })
  disabled_time: Date;

  // 最后一次登录的ip
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  last_login_ip: string;

  // 最后一次登录的时间
  @Field(() => Date, { nullable: true })
  @Column({
    type: 'datetime',
    default: null,
  })
  last_login_time: Date;

  // 最后一次更新密码的时间
  @Field(() => Date, { nullable: true })
  @Column({
    type: 'datetime',
    default: null,
  })
  last_update_password_time: Date;

  // 创建时间(使用momentjs把当前时间转换成时间字符串)
  @Field(() => Date, { nullable: true })
  @Column({
    type: 'datetime',
    default: Moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  create_time: Date;

  // 部门
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  department: string;

  // 公司
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  firm: string;

  /**
   * 对应的角色(用户和角色一对一关系)
   */
  @OneToOne(() => RoleEntity)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  role: RoleEntity;

  /**
   * 对应的角色列表(多个用户对应多个角色)
   * 注意1:@JoinTable()是@ManyToMany()关系所必需的,必须把@JoinTable放在关系的一个(拥有)方面.
   * 注意2:@JoinColumn()是@ManyToOne()/@OneToMany()关系所必需的,会在单一关系表内添加一列作为关系列.
   */
  @Field(() => [RoleEntity], { nullable: true })
  @ManyToMany(() => RoleEntity, (role) => role.userList)
  roleList: RoleEntity[];
}
