import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

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
    // 获取请求类型(graphql所独有的)
    const contextType: string = host.getType().toString();
    // 判定graphql请求异常返回数据格式
    if (contextType === 'graphql') {
      // 上下文
      const ctx: HttpArgumentsHost = host.switchToHttp();
      // 请求体
      const request: Request = ctx.getRequest<Request>();
      // 返回体
      const response: Response = ctx.getResponse<Response>();
      // 错误状态码
      const code: number = exception.getStatus();
      // 错误提示
      const message: string = exception.getResponse().message;
      // 当前UTC时间
      const timestamp: string = new Date().toISOString();
      // 拼装信息
      const buildMsg = {
        code,
        message,
        data: request,
        timestamp,
      };
      // 记录日志
      Logger.log('错误提示', JSON.stringify(message));
      // 设置返回信息(单独设置:状态码,返回头,返回信息):
      response
        .status(code)
        .header('Content-Type', 'application/json')
        .json(buildMsg);
    }
  }
}
