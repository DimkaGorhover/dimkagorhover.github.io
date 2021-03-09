import { Image } from 'react-bootstrap';
import styles from './Photo.module.scss'

export const Photo = () => (
  <div className={styles.photo}>
    <Image src={'/static/IMG_20190609_191430__01.jpg'} thumbnail/>
  </div>
);
