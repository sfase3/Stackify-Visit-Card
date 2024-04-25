import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    desciption: string,
    @Req() req,
  ) {
    await this.imgService.upload(file.originalname, file);

    return this.imgService.create(
      {
        img: file.originalname,
        desciption: desciption,
      },
      +req.user.id,
    );
  }

  @Get()
  async findAll(@Req() req) {
    const decodedCookie = decodeURIComponent(req.cookies['user']);
    return await this.imgService.findAll(decodedCookie);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgService.remove(+id);
  }
}
