import { Controller, Get, Param, Render } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Render('blog/index')
  async index() {
    const posts = await this.blogService.getPosts();

    return { posts: posts.data.allPosts.edges };
  }

  @Get('/:uid')
  @Render('blog/post')
  async getPost(@Param() uid: string) {
    const post = await this.blogService.getPost(uid);

    return { post: post.data.post };
  }
}
