import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismicService } from './prismic.service';
import gql from 'graphql-tag';
import linkResolver from '../link.resolver';
import { isProd } from '../main';

@Controller('preview')
export class PrismicPreviewController {
  constructor(private readonly prismicService: PrismicService) {}

  @Get()
  async handlePreview(
    @Query('token') token: string,
    @Query('documentId') documentId: string,
    @Res() res: Response,
  ) {
    const result = await this.prismicService.apolloClient.query({
      query: gql`
        query allDocuments($uid: String!) {
          _allDocuments(uid: $uid) {
            edges {
              node {
                _meta {
                  id
                  uid
                  type
                }
              }
            }
          }
        }
      `,
      variables: {
        uid: documentId,
      },
      context: {
        headers: {
          'Prismic-Ref': token,
        },
      },
    });

    if (result?.data?._allDocuments?.edges?.length > 0) {
      const url = linkResolver(result.data._allDocuments.edges[0].node);

      res.cookie('io.prismic.preview', token, {
        sameSite: isProd ? 'strict' : 'none',
        secure: isProd,
        httpOnly: false,
      });

      return res.redirect(HttpStatus.FOUND, url);
    }

    throw new HttpException(null, HttpStatus.NOT_FOUND);
  }
}
