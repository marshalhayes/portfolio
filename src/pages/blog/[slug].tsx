import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import Head from 'next/head';
import matter from 'gray-matter';

interface BlogPostProps {
  post: {
    slug: string;
    title: string;
    description: string;
    publishDate: string;
    content: MDXRemoteSerializeResult;
  };
}

const blogPostDir = join(import.meta.url, '../../../../posts').substring(
  'file:'.length,
);

const getBlogPostFromTitle = async (title: string) => {
  const buffer = await readFile(join(blogPostDir, `${title}.mdx`));

  return buffer.toString();
};

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const url = `https://marshalhayes.dev/blog/${post.slug}`;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="og:title" content={post.title} />

        <meta name="description" content={post.description} />
        <meta name="og:description" content={post.description} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@marshalhayes" />
        <meta name="og:url" content={url} />

        <link rel="canonical" href={url} />
      </Head>

      <main className="max-w-5xl px-3 mx-auto prose">
        <h1>{post.title}</h1>

        <MDXRemote {...post.content} />
      </main>
    </>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const blogPostFiles = await readdir(blogPostDir);

  return {
    paths: blogPostFiles
      .filter((path) => path.endsWith('.mdx'))
      .map((path) => ({
        params: { slug: path.substring(0, path.lastIndexOf('.')) },
      })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogPostFileContents = await getBlogPostFromTitle(
    params!.slug as string,
  );
  const { content, data } = matter(blogPostFileContents);

  return {
    props: {
      post: {
        ...data,
        slug: params!.slug as string,
        content: await serialize(content),
      },
    },
  };
};
