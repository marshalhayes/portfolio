export interface BlogPostResponseMeta {
  uid: string;
  firstPublicationDate: number;
}

export interface BlogPostResponse {
  _meta: BlogPostResponseMeta;
  comments_enabled: boolean | null; // TODO: Figure out why prismic returns null instead of the default (true)
  title: string;
  body: any; // TODO: How to type this?
}

export interface AllBlogPostResponse {
  edges: {
    node: BlogPostResponse;
  }[];
}
