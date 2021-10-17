import { useRouter } from 'next/router';

import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export function Header(): JSX.Element {
  const router = useRouter();

  function handleClick(): void {
    router.push('/');
  }

  return (
    <div className={`${commonStyles.container} ${styles.headerContainer}`}>
      <img src="/images/logo.svg" onClick={handleClick} alt="logo" />
    </div>
  );
}
