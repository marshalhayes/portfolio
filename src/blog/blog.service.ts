import { gql } from '@apollo/client';
import { Injectable, Logger } from '@nestjs/common';
import { PrismicService } from 'src/prismic/prismic.service';
import { AllBlogPostResponse, BlogPostResponse } from './blog.models';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(private readonly prismicService: PrismicService) {}

  getPosts(limit = 20): Promise<AllBlogPostResponse | null> {
    return this.prismicService.apolloClient
      .query<{
        allPosts: AllBlogPostResponse;
      }>({
        query: gql`
          query allPosts($limit: Int) {
            allPosts(sortBy: meta_firstPublicationDate_DESC, first: $limit) {
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
        variables: {
          limit: Math.floor(Math.abs(limit)),
        },
      })
      .then(
        (res) => res.data.allPosts,
        (rej) => {
          this.logger.error(rej);

          return null;
        },
      );
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
              preview_text
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
                    snippet_language
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
      );
  }

  search(q: string, limit = 20): Promise<{ node: BlogPostResponse }[] | null> {
    return this.prismicService.apolloClient
      .query<{ allPosts: AllBlogPostResponse }>({
        query: gql`
          query post($q: String!, $limit: Number) {
            allPosts(fulltext: $q, lang: "en-us", limit: $limit) {
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
          limit: Math.floor(limit),
        },
      })
      .then(
        (res) => res.data.allPosts.edges,
        (rej) => {
          this.logger.error(rej);

          return null;
        },
      );
  }
}
