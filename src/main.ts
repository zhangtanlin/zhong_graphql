import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/filter/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 获取环境变量
  const configService: ConfigService = await app.get(ConfigService);
  const crossUrlString: string = await configService.get('CROSS_URL');
  let crossUrlArr: string[] = [];
  if (crossUrlString) {
    crossUrlArr = crossUrlString.split(',');
  }
  const crossMethodsStr: string = await configService.get('CROSS_METHOD');
  let crossMethodsStrArr: string[] = [];
  if (crossMethodsStr) {
    crossMethodsStrArr = crossMethodsStr.split(',');
  }
  const port: number = await configService.get('NEST_PORT');

  /**
   * 设置允许跨域
   * origin: 允许跨域的地址(字符串或者数组)
   * methods: 允许跨域的请求方式
   * credentials: 别问我我也不知道啥意思,就知道是证书，这个要设置为true
   * optionsSuccessStatus: 成功状态码
   */
  app.enableCors({
    origin: crossUrlArr,
    methods: crossMethodsStrArr,
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // 全局错误过滤
  app.useGlobalFilters(new ErrorFilter());

  // 绑定端口号
  await app.listen(port);
}
bootstrap();
