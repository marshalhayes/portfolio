import {
  ApolloCache,
  ApolloClient,
  GraphQLRequest,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpService, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismicConfig } from 'config/prismic.config';

/**
 * This service serves as a wrapper to the Prismic graphql api.
 */
@Injectable({ scope: Scope.REQUEST })
export class PrismicService {
  /**
   * Delay instantiating the cache until needed
   *
   * TODO: Switch this out with something better in prod?
   * How to clear/update the cache when refs are changed?
   */
  private static _cache: ApolloCache<NormalizedCacheObject>;
  private static get cache() {
    if (!PrismicService._cache) {
      PrismicService._cache = new InMemoryCache();
    }

    return PrismicService._cache;
  }

  private readonly config: PrismicConfig;

  /**
   * This is the core API exposed from the PrismicService.
   * All graphql querying is done via this object.
   */
  readonly apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(private readonly http: HttpService, config: ConfigService) {
    this.config = config.get<PrismicConfig>('prismic');

    this.apolloClient = new ApolloClient({
      link: setContext(async (_req: GraphQLRequest, previousContext: any) => {
        const latestMasterRef = await this.getLatestMasterRef();

        return {
          headers: {
            'Prismic-Ref': latestMasterRef,
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
      cache: PrismicService.cache,
    });
  }

  /**
   * Returns a promise that will resolve to the lastest master ref
   * in Prismic
   */
  getLatestMasterRef() {
    return this.http
      .get(this.config.apiEndpoint, {
        params: {
          access_token: this.config.accessToken,
        },
      })
      .toPromise()
      .then((res) => res.data.refs.find((r) => r.isMasterRef).ref);
  }
}
