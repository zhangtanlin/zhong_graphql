import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CountryEntity } from 'src/country/country.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 城市
 * @entity city 数据库表名
 */
@ObjectType()
@Entity('city')
export class CityEntity extends BaseEntity {
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
   * 城市列表(多对一)
   * 注意1:@JoinTable()是@ManyToMany()关系所必需的,必须把@JoinTable放在关系的一个(拥有)方面.
   * 注意2:@JoinColumn()是@ManyToOne()/@OneToMany()关系所必需的,会在单一关系表内添加一列作为关系列.
   */
  @Field(() => CityEntity)
  @ManyToOne(() => CityEntity, (city) => city.country)
  @JoinColumn({
    name: 'country_city',
  })
  country: CityEntity;
}
