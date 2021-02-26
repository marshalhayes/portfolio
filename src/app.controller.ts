import {
  CacheInterceptor,
  Controller,
  Get,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog/blog.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Render('Home')
  async index() {
    const posts = await this.blogService.getPosts(3);

    return {
      latestPosts: posts?.edges ?? [],
    };
  }

  @Get('about')
  @Render('About')
  about() {
    return {};
  }
}
