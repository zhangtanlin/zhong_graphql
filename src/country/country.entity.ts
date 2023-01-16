import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CityEntity } from 'src/city/city.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 国家
 * @entity country 数据库表名
 */
@ObjectType()
@Entity('country')
export class CountryEntity extends BaseEntity {
  // 自增id
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  // 名称
  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    default: '',
  })
  name: string;

  // 代码
  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  code: string;

  /**
   * 国家列表(一对多)
   * 注意1:@JoinTable()是@ManyToMany()关系所必需的,必须把@JoinTable放在关系的一个(拥有)方面.
   * 注意2:@JoinColumn()是@ManyToOne()/@OneToMany()关系所必需的,会在单一关系表内添加一列作为关系列.
   */
  @Field(() => CityEntity)
  @OneToMany(() => CityEntity, (city) => city.country)
  cityList: CityEntity[];
}
