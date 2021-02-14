import {
  ApolloClient,
  GraphQLRequest,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpService, Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismicConfig } from 'config/prismic.config';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

/**
 * This service serves as a wrapper to the Prismic graphql api.
 */
@Injectable({ scope: Scope.REQUEST })
export class PrismicService {
  private static latestSuccessfulRef: string;
  private readonly config: PrismicConfig;

  /**
   * This is the core API exposed from the PrismicService.
   * All graphql querying is done via this object.
   */
  readonly apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(
    private readonly http: HttpService,
    @Inject(REQUEST) private readonly req: Request,
    config: ConfigService,
  ) {
    this.config = config.get<PrismicConfig>('prismic');

    this.apolloClient = new ApolloClient({
      link: setContext(async (_req: GraphQLRequest, previousContext: any) => {
        let ref = req.cookies ? req.cookies['io.prismic.preview'] : '';
        if (!ref || ref.length <= 0) {
          const latestRef = await this.getLatestRef();
          if (latestRef !== null) {
            ref = latestRef;
          }
        }

        PrismicService.latestSuccessfulRef = ref;

        return {
          headers: {
            'Prismic-Ref': PrismicService.latestSuccessfulRef,
            Authorization: `Token ${this.config.accessToken}`,
            ...previousContext.headers,
          },
        };
      }).concat(
        new HttpLink({
          uri: this.config.graphqlUri,
          useGETForQueries: true,
          fetch: require('node-fetch'),
        }),
      ),
      // TODO: Improve this
      cache: new InMemoryCache(),
    });
  }

  /**
   * Returns a promise that will resolve to the lastest master ref
   * in Prismic or null if it fails
   */
  getLatestRef(): Promise<string | null> {
    return this.http
      .get(this.config.apiEndpoint, {
        params: {
          access_token: this.config.accessToken,
        },
      })
      .toPromise()
      .then(
        (res) => res.data.refs.find((r) => r.isMasterRef).ref,
        () => null,
      )
      .catch(() => null);
  }
}
