import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { Header } from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../utils/formatDate';
import { PostInfo } from '../../components/PostInfo';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: string;
      bodyAsText: string;
      // body: {
      //   text: string;
      // }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  console.log(post);

  const numberOfWords = post.data.content.reduce((acc, currrentValue) => {
    acc =
      acc +
      currrentValue.heading.split(/\s+/g).length +
      currrentValue.bodyAsText.split(/\s+/g).length;

    return acc;
  }, 0);

  const minutesToRead = Math.ceil(numberOfWords / 200);

  return (
    <>
      <Header />
      <img src={post.data.banner.url} alt="banner" className={styles.banner} />
      <div className={`${commonStyles.container} ${styles.postContainer}`}>
        <h1>{post.data.title}</h1>
        <PostInfo
          publicationDate={post.first_publication_date}
          author={post.data.author}
          timeToRead={String(minutesToRead)}
        />
        {post.data.content.map(content => (
          <div key={content.heading} className={styles.content}>
            <h2>{content.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: content.body }} />
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: [
        'posts.title',
        'posts.subtitle',
        'posts.author',
        'posts.banner',
        'posts.content',
      ],
    }
  );

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();

  const { slug } = params;

  const response = await prismic.getByUID('posts', String(slug), {});

  // console.log(JSON.stringify(response, null, 2));
  console.log(response);

  const formattedDate = formatDate(response.first_publication_date);

  const post = {
    first_publication_date: formattedDate,
    data: {
      title: response.data.title,
      content: response.data.content.map(content => ({
        heading: content.heading,
        body: RichText.asHtml(content.body),
        bodyAsText: RichText.asText(content.body),
      })),
      author: response.data.author,
      banner: response.data.banner,
    },
  };

  return {
    props: {
      post,
    },
  };
};
