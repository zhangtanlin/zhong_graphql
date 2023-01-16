import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { readFile } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/filter/error.filter';
import { getKeyPair, saveKeyPairFile } from './common/utils/cryptoData';
import { isFolderExist } from './common/utils/file';

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

  /**
   * 判定是否生成公钥和私钥
   * @param {function} [isFolderExist]   用来生成ssh文件夹(有就不操作,没有则创建)
   * @param {function} [privateKey]      同步读取的私钥
   * @param {function} [publicKey]       同步读取的公钥
   * @param {function} [getKeyPair]      生成公钥私钥方法
   * @param {function} [saveKeyPairFile] 把公钥私钥保存到本地方法
   */
  isFolderExist(join(__dirname, '../ssh'));
  let tempPrivateKey = null;
  let tempPublicKey = null;
  readFile(join(__dirname, '../ssh/private.pem'), 'utf-8', (error, res) => {
    if (!error) {
      tempPrivateKey = res;
    }
  });
  readFile(join(__dirname, '../ssh/public.pem'), 'utf-8', (error, res) => {
    if (!error) {
      tempPublicKey = res;
    }
  });
  if (!tempPrivateKey || !tempPublicKey) {
    const { publicKey, privateKey } = getKeyPair();
    saveKeyPairFile(publicKey, privateKey);
  }

  // 全局错误过滤
  app.useGlobalFilters(new ErrorFilter());

  // 绑定端口号
  await app.listen(port);
}
bootstrap();
