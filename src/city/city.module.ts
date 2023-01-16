import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CityResolver, CityService],
})
export class CityModule {}
