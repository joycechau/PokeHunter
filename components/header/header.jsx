import React from 'react';
import styles from './header.css';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.header}>
        <p className={styles.title}>Catch All The Poke&#769;mon!</p>
        <div>
          <a
            href="https://www.linkedin.com/in/joycechau/"
            target="_blank">
            <img
              src="https://res.cloudinary.com/joycechau/image/upload/v1486025481/linkedin2.png"
              alt="linkedin"
              className={styles.img}/>
          </a>
          <a
            href="https://github.com/joycechau"
            target="_blank">
            <img
              src="https://res.cloudinary.com/joycechau/image/upload/v1489646987/github2.svg"
              alt="github"
              className={styles.img}/>
          </a>
        </div>
      </div>
    );
  }
}
