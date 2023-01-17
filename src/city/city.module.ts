import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from 'src/country/country.module';
import { CityEntity } from './city.entity';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    forwardRef(() => CountryModule),
  ],
  providers: [CityResolver, CityService],
})
export class CityModule {}
