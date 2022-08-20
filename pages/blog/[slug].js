import { allSlugs, formatSlug, getPostBySlug } from "../../lib/mdx";
import { formatDate } from "../../lib/formateDate";
import { MDXRemote } from "next-mdx-remote";

export default function Blog({ post }) {
  const { title, date } = post.frontMatter;

  return (
    <div>
      <h1 className="font-bold text-6xl mb-2">{title}</h1>
      <time dateTime={date} className="text-lg font-medium">
        {formatDate(date)}
      </time>
      <hr className="my-8" />
      <article className="prose">
        <MDXRemote {...post.source} />
      </article>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = allSlugs.map((slug) => ({
    params: {
      slug: formatSlug(slug),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
