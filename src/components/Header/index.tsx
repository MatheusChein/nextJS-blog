import { useRouter } from 'next/router';
import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  const router = useRouter();

  function handleClick(): void {
    router.push('/');
  }

  return (
    <div className={`${commonStyles.container} ${styles.headerContainer}`}>
      <Link href="/">
        <a>
          <img src="/images/logo.svg" alt="logo" />
        </a>
      </Link>
    </div>
  );
}
