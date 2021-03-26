import { Controller, Get, Render } from '@nestjs/common';
import { BlogService } from './blog/blog.service';

@Controller()
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
