
## 说明
学习nestjs+typeorm+graphql的架构模式

## 安装
```bash
$ npm install
```

## 运行
```bash
# 开发环境
$ npm run start
# 开发环境监听模式
$ npm run start:dev
# 生产环境
$ npm run start:prod
```

## 测试
```bash
# 单元测试
$ npm run test
# e2e 测试
$ npm run test:e2e
# test coverage
$ npm run test:cov
```

## 使用方法
```bash
运行之后，在浏览器中使用http://localhost:3000/graphql访问
1.查询所有:
  query {
    postsFindAll {
      id
      account
      password
    }
  }
2.查询一条:
  query{
    postsFindOneById(id:1) {
      id
      account
      password
    }
  }
  或者:
  {
    userFindOneById(id:1) {
      id
      account
      password
    	roles {
        id
        name
        resources {
          id
          name
        }
      }
    }
  }
3.新增一条:
  mutation {
    createPosts(
      account: "名字1"
      password: "qaz@123456"
    ){
      id
      account
      password
    }
  }
```

## 注意
- graphql和tsx的数据类型区别:xx.graphql文件使用的是String/Int/Date……,但tsx文件使用string/number…….

## 学习文档
- [中文文档](http://static.kancloud.cn/juukee/nestjs/2666734)
- [参考使用文档](https://www.programcreek.com/typescript/?code=Sairyss%2Fdomain-driven-hexagon%2Fdomain-driven-hexagon-master%2Fsrc%2Fmodules%2Fuser%2Fqueries%2Ffind-users%2Ffind-users.graphql-resolver.ts#)

## 联系方式
- 作者 - [苴国仲霖](https://juguozhonglin.com)
- qq - [136179160](https://juguozhonglin.com/)

## 执照
  Nest is [MIT licensed](LICENSE).
