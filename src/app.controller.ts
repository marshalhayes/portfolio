import gql from 'graphql-tag';
import { Controller, Get, Render } from '@nestjs/common';
import { PrismicService } from './prismic/prismic.service';

@Controller()
export class AppController {
  constructor(private readonly prismicService: PrismicService) {}

  @Get()
  @Render('Home')
  async index() {
    const posts = await this.prismicService.apolloClient.query({
      query: gql`
        query {
          allPosts(sortBy: meta_firstPublicationDate_DESC) {
            edges {
              node {
                _meta {
                  uid
                  firstPublicationDate
                }
                title
                body {
                  ... on PostBodyText {
                    type
                    fields {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    return {
      latestPosts: posts.data.allPosts.edges,
    };
  }
}
