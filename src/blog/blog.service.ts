import { gql } from '@apollo/client';
import { Injectable } from '@nestjs/common';
import { PrismicService } from 'src/prismic/prismic.service';

@Injectable()
export class BlogService {
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

  getPost(uid: string) {
    const q = this.prismicService.apolloClient.query({
      query: gql`
        query post($uid: String!) {
          post(uid: $uid, lang: "en-us") {
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
      `,
      variables: {
        uid,
      },
    });

    q.catch((e) => console.error(e));

    return q;
  }
}
