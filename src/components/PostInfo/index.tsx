import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import styles from './styles.module.scss';

interface PostInfoProps {
  publicationDate: string;
  author: string;
  timeToRead?: string;
  last_publication_date?: {
    formattedDate: string;
    formattedHour: string;
  };
}

export function PostInfo({
  publicationDate,
  author,
  timeToRead,
  last_publication_date,
}: PostInfoProps): JSX.Element {
  return (
    <div className={styles.postInfoContainer}>
      <div>
        <FiCalendar />
        <span>{publicationDate}</span>
      </div>
      <div>
        <FiUser />
        <span>{author}</span>
      </div>
      {timeToRead && (
        <div>
          <FiClock />
          <span>{timeToRead} min</span>
        </div>
      )}
      {last_publication_date && (
        <div className={styles.publicationDate}>
          <span>
            * editado em {last_publication_date.formattedDate}, às{' '}
            {last_publication_date.formattedHour}
          </span>
        </div>
      )}
    </div>
  );
}
