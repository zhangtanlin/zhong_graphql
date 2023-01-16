import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
// entity
import allEntity from './common/allEntity';
import { join } from 'path';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    /**
     * 环境变量
     * @params isGlobal 是否全局使用
     * @params ignoreEnvFile 是否忽略环境变量文件
     * @params envFilePath 环境变量路径
     */
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: [`./env/.env.${process.env.NODE_ENV}`],
    }),
    /**
     * 导入typeorm并配置连接参数
     * @require GraphQLModule graphql模块
     * @require AuthorsModule 作者
     * @require PostsModule   帖子
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const tempHost: string = await configService.get('MYSQL_HOST');
        const tempPort: number = await configService.get('MYSQL_PORT');
        const tempUser: string = await configService.get('MYSQL_USER');
        const tempPassword: string = await configService.get('MYSQL_PASSWORD');
        const tempName: string = await configService.get('MYSQL_NAME');
        return {
          type: 'mysql',
          host: tempHost,
          port: tempPort,
          username: tempUser,
          password: tempPassword,
          database: tempName,
          entities: allEntity,
          synchronize: true,
        };
      },
    }),
    /**
     * 配置GraphQLModule
     * 注意:个人建议开发阶段先使用代码优先这样不用写gql文件,再使用模型优先拆分代码优先文件中的gql文件
     */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      // 代码优先(会根据代码自动生成graphql文件)
      autoSchemaFile: join(process.cwd(), 'src/all.schema.graphql'),
      sortSchema: true,
      // 模型优先(需要自己写graphql文件)
      // typePaths: ['./**/*.graphql'],
    }),
    PostsModule,
    UserModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
