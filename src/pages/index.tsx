import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';

import styles from './home.module.scss';
import { formatDate } from '../utils/formatDate';
import { PostInfo } from '../components/PostInfo';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview?: boolean;
}

export default function Home({
  postsPagination,
  preview,
}: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  function handleLinkClick(): void {
    fetch(`${nextPage}`)
      .then(response => response.json())
      .then(data => {
        let formattedPosts = [];

        data.results.map(post => {
          formattedPosts = [
            ...formattedPosts,
            {
              ...post,
              first_publication_date: post.first_publication_date,
            },
          ];
        });

        setPosts([...posts, ...formattedPosts]);
        setNextPage(data.next_page);
      });
  }

  return (
    <main className={`${styles.homePageContainer} ${commonStyles.container}`}>
      <img src="/images/logo.svg" alt="logo" />
      <div className={styles.postsContainer}>
        {posts.map(post => (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <div className={styles.post}>
              <h1>{post.data.title}</h1>
              <p>{post.data.subtitle}</p>
              <PostInfo
                first_publication_date={formatDate(post.first_publication_date)}
                author={post.data.author}
              />
            </div>
          </Link>
        ))}
        {nextPage && <span onClick={handleLinkClick}>Carregar mais posts</span>}
      </div>
      {preview && (
        <aside className={commonStyles.previewButton}>
          <Link href="/api/exit-preview">
            <a>Sair do modo Preview</a>
          </Link>
        </aside>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
      ref: previewData?.ref ?? null,
    }
  );

  // console.log(JSON.stringify(postsResponse, null, 2));

  const { next_page } = postsResponse;

  const results = postsResponse.results.map(
    ({ uid, first_publication_date, data }) => {
      return {
        uid,
        first_publication_date,
        data: {
          title: data.title,
          subtitle: data.subtitle,
          author: data.author,
        },
      };
    }
  );

  const postsPagination = {
    next_page,
    results,
  };

  return {
    props: {
      postsPagination,
      preview,
    },
  };
};
