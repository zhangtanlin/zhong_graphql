import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from 'src/city/city.module';
import { CountryEntity } from './country.entity';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity]), CityModule],
  providers: [CountryResolver, CountryService],
})
export class CountryModule {}
