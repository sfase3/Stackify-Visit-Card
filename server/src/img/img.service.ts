import { Injectable } from '@nestjs/common';
import { CreateImgDto } from './dto/create-img.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Img } from './entities/img.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class ImgService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    @InjectRepository(Img) private readonly imgRepository: Repository<Img>,
    private readonly configService: ConfigService,
  ) {}

  async upload(fileName: string, file: Express.Multer.File) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nestjsuploader',
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
  }

  async create(createImgDto: CreateImgDto, id: number) {
    const image = await this.imgRepository.save({
      img: createImgDto.img,
      desciption: createImgDto.desciption,
      user: {
        id: id,
      },
    });

    return { image };
  }

  async findAll(user) {
    const imgs = await this.imgRepository.find({ where: { user: user.id } });

    const s3images = await Promise.all(
      imgs.map(async (img) => {
        const signedUrl = await getSignedUrl(
          this.s3Client,
          new GetObjectCommand({
            Bucket: 'nestjsuploader',
            Key: img.img,
          }),
        );
        return signedUrl;
      }),
    );

    return s3images;
  }

  remove(id: number) {
    return `This action removes a #${id} img`;
  }
}
