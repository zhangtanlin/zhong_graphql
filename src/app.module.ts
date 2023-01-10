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
     * 导入
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
        console.log('configService', configService);
        const tempHost: string = await configService.get('MYSQL_HOST');
        console.log('tempHost', tempHost);
        const tempPort: number = await configService.get('MYSQL_PORT');
        console.log('tempPort', tempPort);
        const tempUser: string = await configService.get('MYSQL_USER');
        console.log('tempUser', tempUser);
        const tempPassword: string = await configService.get('MYSQL_PASSWORD');
        console.log('tempPassword', tempPassword);
        const tempName: string = await configService.get('MYSQL_NAME');
        console.log('tempName', tempName);
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      // 代码优先
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // sortSchema: true,
      // 架构优先
      typePaths: ['./**/*.graphql'],
    }),
    PostsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
