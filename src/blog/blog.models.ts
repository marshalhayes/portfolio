export interface BlogPostMeta {
  uid: string;
  firstPublicationDate: number;
}

export interface BlogPost {
  _meta: BlogPostMeta;
  comments_enabled: boolean | null; // TODO: Figure out why prismic returns null instead of the default (true)
  title: string;
  body: any; // TODO: How to type this?
}
