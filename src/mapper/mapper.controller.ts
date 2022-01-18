import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Req, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { MapperService } from './mapper.service';

@Controller('mapper')
export class MapperController {
  constructor(private db: MapperService) {}

  @Get()
  getInfo(): string {
    return "mapper is running";
  }
  
  @Get('get-by-key/:key')
  async getValByKey(@Param('key') key: string) {
    console.log("get-by-key");
    console.log(key)
    return this.db.get(key);
  }

  @Post('set-by-key')
  async setValByKey(@Body() request: {key: string, value: string}, @Res() res: Response) {
    console.log("set-by-key");
    console.log(request)
    try {
        const entity = await this.db.set(request)
        res.status(HttpStatus.OK).json(entity)
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({"message":err})
    }
  }
  
  @Get('get-all')
  getAll(): DatabaseEntity[] {
    console.log("get-all");
    return this.db.getAll();
  }
}
