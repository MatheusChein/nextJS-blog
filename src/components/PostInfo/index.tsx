import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import styles from './styles.module.scss';

interface PostInfoProps {
  first_publication_date: string;
  author: string;
  timeToRead?: string;
  last_publication_date?: string;
  last_publication_hour?: string;
}

export function PostInfo({
  first_publication_date,
  author,
  timeToRead,
  last_publication_date,
  last_publication_hour,
}: PostInfoProps): JSX.Element {
  return (
    <div className={styles.postInfoContainer}>
      <div>
        <FiCalendar />
        <span>{first_publication_date}</span>
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
            * editado em {last_publication_date}, às {last_publication_hour}
          </span>
        </div>
      )}
    </div>
  );
}
