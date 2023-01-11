/**
 * 导入
 * @module [Module]        nest的common模块内的module方法
 * @module [TypeOrmModule] typeorm内置方法【作用待定】
 * @module [AdService]     模块的服务
 * @module [AdController]  模块的控制器
 * @module [AdEntity]      模块的entity（参考：https://typeorm.io/#/entities）
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdService } from './ad.service';
import { AdEntity } from './ad.entity';

@Module({
  imports: [
    // 连接广告表
    TypeOrmModule.forFeature([AdEntity]),
  ],
  providers: [AdService],
  exports: [AdService],
})
export class AdModule {}
