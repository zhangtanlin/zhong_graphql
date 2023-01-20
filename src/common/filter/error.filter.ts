import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

/**
 * 异常状态码处理
 * 注意1:HttpStatus 可以查看所有 http 请求状态所对应的意思
 * 注意2:使用 exception.getStatus() 也可以获取状态码
 * 注意3:最后使用 response 进行发送消息时，也可以使用【.send({...msg})】，
 * 但是感觉如果使用【.send()】则必须添加【.header('Content-Type', 'application/json')】头，
 * 不然感觉会有问题,但是这里没有出现大的问题
 */
@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取请求类型(graphql所独有的)
    const contextType = host.getType().toString();
    // 获取返回体
    const response = ctx.getResponse();
    // 判定非 GET 请求的异常返回数据格式
    if (contextType == 'graphql') {
      // 获取返回信息
      const status = exception?.status; // 状态码
      const message = exception?.response?.message; // 错误名称
      const data = null; // 默认 data
      const timestamp = new Date().toISOString(); // 当前 UTC 时间
      // 拼装信息
      const buildMsg = {
        code: status,
        message,
        data,
        timestamp,
      };
      // 记录日志
      Logger.log('错误提示', JSON.stringify(message));
      // 设置返回信息(单独设置:状态码,返回头,返回信息):
      response
        .status(status)
        .header('Content-Type', 'application/json')
        .json(buildMsg);
    }
  }
}
