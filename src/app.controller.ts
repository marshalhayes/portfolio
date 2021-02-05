import { Controller, Get, Render } from '@nestjs/common';
import { BlogService } from './blog/blog.service';

@Controller()
export class AppController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Render('Home')
  async index() {
    const posts = await this.blogService.getPosts();

    return {
      latestPosts: posts.data.allPosts.edges,
    };
  }
}
