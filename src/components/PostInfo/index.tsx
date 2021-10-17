import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import styles from './styles.module.scss';

interface PostInfoProps {
  publicationDate: string;
  author: string;
  timeToRead?: string;
}

export function PostInfo({
  publicationDate,
  author,
  timeToRead,
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
    </div>
  );
}
