/**
 * @requires [Entity]                 - typeorm导出的entity模块
 * @requires [Column]                 - typeorm导出的Column模块
 * @requires [PrimaryGeneratedColumn] - typeorm导出的PrimaryGeneratedColumn模块
 */
import { Field, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ad')
// 广告数据表
export class AdEntity {
  // 自增id
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // 名称
  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  name: string;

  /**
   * 类型
   * @description {1:开屏广告,2:开屏banner}
   */
  @Field(() => Int)
  @Column({
    type: 'int',
    default: 1,
  })
  type: number;

  // 图片地址
  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  src: string;

  // 链接地址
  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  link: string;

  /**
   * 状态
   * @description {0: 关闭, 1: 开启}
   */
  @Field(() => Int)
  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1,
  })
  status: number;

  // 描述
  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  explanation: string;
}
