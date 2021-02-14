export default function linkResolver(doc: any): string {
  if (doc._meta.type === 'post') {
    return `/blog/${doc._meta.uid}`;
  }

  return '/';
}
