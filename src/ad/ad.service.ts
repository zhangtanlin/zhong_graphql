/**
 * 导入
 * BadRequestException           - 400【抛出的异常】
 * UnauthorizedException         - 401【抛出的异常】
 * NotFoundException             - 404【抛出的异常】
 * ForbiddenException            - 403【抛出的异常】
 * NotAcceptableException        - 406【抛出的异常】
 * RequestTimeoutException       - 408【抛出的异常】
 * ConflictException             - 409【抛出的异常】
 * GoneException                 - 410【抛出的异常】
 * PayloadTooLargeException      - 413【抛出的异常】
 * UnsupportedMediaTypeException - 400【抛出的异常】
 * UnprocessableEntityException  - 422【抛出的异常】
 * InternalServerErrorException  - 500【抛出的异常】
 * NotImplementedException       - 501【抛出的异常】
 * BadGatewayException           - 502【抛出的异常】
 * ServiceUnavailableException   - 503【抛出的异常】
 * GatewayTimeoutException       - 504【抛出的异常】
 * @requires [Injectable]        - nest的common模块导出的
 * @requires [InjectRepository]  - nestjs/typeorm导出的
 * @requires [Repository]        - typeorm导出的
 */
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AdEntity } from './ad.entity';
import { AdInputDto } from './dto/ad.input.dto';
import { AdSearchDto } from './dto/ad.search.dto';

@Injectable()
export class AdService {
  /**
   * 函数
   * @param {function} adRepository 广告查询方法
   */
  constructor(
    @InjectRepository(AdEntity)
    private readonly adRepository: Repository<AdEntity>,
  ) {}

  /**
   * 新增
   * @class [UserInsertDto]     新增用户dto
   * @function findOneByAccount 验证账号是否存在
   * @function save             保存用户信息
   */
  async create(adInputDto: AdInputDto): Promise<AdEntity> {
    try {
      const _res: AdEntity = await this.adRepository.save(adInputDto);
      return _res;
    } catch (error) {
      throw new HttpException({ message: '存储失败' }, 502);
    }
  }

  /**
   * 根据id查询一条数据
   * @function id 查询的id
   */
  async findOneById(id: number): Promise<AdEntity> {
    try {
      const _res: AdEntity = await this.adRepository.findOneBy({ id });
      return _res;
    } catch (error) {
      throw new HttpException({ message: '根据id查询一条数据失败' }, 502);
    }
  }

  /**
   * 根据id数组查询数据
   * @param {number[]} [ids] id数组
   */
  async findByIds(ids: number[]): Promise<AdEntity[]> {
    try {
      const _res: AdEntity[] = await this.adRepository.findBy({
        id: In(ids),
      });
      return _res;
    } catch (error) {
      throw new HttpException({ message: '根据id数组查询数据失败' }, 502);
    }
  }

  /**
   * 分页查询
   * @param {object} [data] 含有列表和总条数的对象返回值
   * @function [list] typeorm的模糊查询+统计
   */
  async getManyAndCount(params: AdSearchDto): Promise<ListTotalType> {
    const data = {
      list: [],
      total: 0,
    };
    try {
      const _list = await this.adRepository
        .createQueryBuilder('ad')
        .where('user.type like :type')
        .setParameters({
          // 类型
          account: `%${params.type ? params.type : ''}%`,
        })
        .skip((params.page - 1) * params.size)
        .take(params.size)
        .getManyAndCount();
      console.log('list', _list);
      data.list = _list[0];
      data.total = _list[1];
      return data;
    } catch (error) {
      throw new HttpException({ message: '广告分页查询失败' }, 502);
    }
  }
}
