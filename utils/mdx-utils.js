import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
// import Readme from './../README.md' // Assumes an integration is used to compile MDX -> JS.
// import {FancyLink} from './components/fancy-link.js'

// <Readme components={{a: FancyLink}} />

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    return bDate - aDate;
  });
};

export const getPosts = () => {
  let posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  posts = sortPostsByDate(posts);

  return posts;
};

export const getPostBySlug = async (slug) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};

export const getNextPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  // no prev post found
  if (!post) return null;

  const nextPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

export const getPreviousPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  // no prev post found
  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};


// Repeating Posts for Doks

// DOKS_PATH is useful when you want to get the path to a specific file
export const DOKS_PATH = path.join(process.cwd(), 'doks');

// dokFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const dokFilePaths = fs
  .readdirSync(DOKS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const sortDoksByDate = (doks) => {
  return doks.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    return bDate - aDate;
  });
};

export const getDoks = () => {
  let doks = dokFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(DOKS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  doks = sortPostsByDate(doks);

  return doks;
};

export const getDokBySlug = async (slug) => {
  const dokFilePath = path.join(DOKS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(dokFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, dokFilePath };
};

export const getNextDokBySlug = (slug) => {
  const doks = getDoks();
  const currentFileName = `${slug}.mdx`;
  const currentPost = doks.find((dok) => dok.filePath === currentFileName);
  const currentPostIndex = doks.indexOf(currentPost);

  const dok = doks[currentPostIndex - 1];
  // no prev post found
  if (!dok) return null;

  const nextPostSlug = dok?.filePath.replace(/\.mdx?$/, '');

  return {
    title: dok.data.title,
    slug: nextPostSlug,
  };
};

export const getPreviousDokBySlug = (slug) => {
  const doks = getDoks();
  const currentFileName = `${slug}.mdx`;
  const currentPost = doks.find((dok) => dok.filePath === currentFileName);
  const currentPostIndex = doks.indexOf(currentPost);

  const dok = doks[currentPostIndex + 1];
  // no prev post found
  if (!dok) return null;

  const previousPostSlug = dok?.filePath.replace(/\.mdx?$/, '');

  return {
    title: dok.data.title,
    slug: previousPostSlug,
  };
};