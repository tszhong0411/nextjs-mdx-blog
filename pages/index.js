import Link from "next/link";
import { getAllPosts } from "../lib/mdx";
import { formatDate } from "../lib/formatDate";

export default function Home({ posts }) {
  return (
    <>
      <h1 className="text-6xl font-bold mb-8">Blog</h1>
      <hr className="my-8" />
      <ul className="flex flex-col gap-3">
        {posts.map(({ slug, title, summary, date }) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>
              <a className="border border-solid border-gray-300 rounded-lg shadow-md p-6 block">
                <div className="flex justify-between">
                  <h2>{title}</h2>
                  <time dateTime={date}>{formatDate(date)}</time>
                </div>
                <p className="mt-4">{summary}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
