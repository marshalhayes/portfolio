import {
  CacheInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
@UseInterceptors(CacheInterceptor)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get(':uid')
  @Render('blog/Post')
  async getPost(@Param('uid') uid: string) {
    const post = await this.blogService.getPostByUid(uid);
    if (post === null) {
      throw new HttpException(null, HttpStatus.NOT_FOUND);
    }

    return { post };
  }
}
