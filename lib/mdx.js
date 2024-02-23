import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const root = process.cwd();
const POSTS_PATH = path.join(root, "data", "blog");

export const allSlugs = fs.readdirSync(POSTS_PATH);

export const formatSlug = (slug) => slug.replace(/\.mdx$/, "");

export const getPostBySlug = async (slug) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content);

  const frontMatter = {
    ...data,
    slug,
  };

  return {
    source: mdxSource,
    frontMatter,
  };
};

export const getAllPosts = () => {
  const frontMatter = [];

  allSlugs.forEach((slug) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, slug), "utf-8");

    const { data } = matter(source);

    frontMatter.push({
      ...data,
      slug: formatSlug(slug),
      date: new Date(data.date).toISOString(),
    });
  });

  return frontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
};

const dateSortDesc = (a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;

  return 0;
};
