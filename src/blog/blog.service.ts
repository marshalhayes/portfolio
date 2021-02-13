import { gql } from '@apollo/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismicService } from 'src/prismic/prismic.service';
import { AllBlogPostResponse, BlogPostResponse } from './blog.models';

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
                preview_text
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

  getPostByUid(uid: string): Promise<BlogPostResponse | null> {
    return this.prismicService.apolloClient
      .query<{ post: BlogPostResponse }>({
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
        (rej) => {
          this.logger.error(rej);

          return null;
        },
      )
      .catch(() => null);
  }

  search(q: string): Promise<{ node: BlogPostResponse }[] | null> {
    return this.prismicService.apolloClient
      .query<{ allPosts: AllBlogPostResponse }>({
        query: gql`
          query post($q: String!) {
            allPosts(fulltext: $q, lang: "en-us") {
              edges {
                node {
                  _meta {
                    uid
                    firstPublicationDate
                  }
                  title
                  preview_text
                  body {
                    ... on PostBodyText {
                      fields {
                        text
                      }
                    }
                    ... on PostBodyCode_snippet {
                      primary {
                        snippet
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          q,
        },
      })
      .then(
        (res) => res.data.allPosts.edges,
        (rej) => {
          this.logger.error(rej);

          return null;
        },
      )
      .catch((err) => {
        this.logger.error(err);

        return null;
      });
  }
}
