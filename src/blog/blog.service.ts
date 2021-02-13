import { gql } from '@apollo/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismicService } from 'src/prismic/prismic.service';
import { BlogPost } from './blog.models';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(private readonly prismicService: PrismicService) {}

  getPosts() {
    return this.prismicService.apolloClient.query({
      query: gql`
        query {
          allPosts(sortBy: meta_firstPublicationDate_DESC) {
            edges {
              node {
                _meta {
                  uid
                  firstPublicationDate
                }
                comments_enabled
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
  }

  getPost(uid: string): Promise<BlogPost | null> {
    return this.prismicService.apolloClient
      .query<{ post: BlogPost }>({
        query: gql`
          query post($uid: String!) {
            post(uid: $uid, lang: "en-us") {
              _meta {
                uid
                firstPublicationDate
              }
              comments_enabled
              title
              body {
                ... on PostBodyText {
                  type
                  fields {
                    text
                  }
                }
                ... on PostBodyCode_snippet {
                  type
                  primary {
                    snippet
                  }
                }
              }
            }
          }
        `,
        variables: {
          uid,
        },
      })
      .then(
        (res) => res.data.post,
        (err) => {
          this.logger.error(err);

          return null;
        },
      )
      .catch(() => null);
  }
}
