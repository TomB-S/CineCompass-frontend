import { useState } from 'react';
import styles from '../styles/Movie.module.css';
import { HeartFilled, HeartOutlined, StarOutlined, StarFilled, VideoCameraAddOutlined, VideoCameraFilled } from '@ant-design/icons';
import { Popover } from 'antd';

function Movie(props) {
  const [watchCount, setWatchCount] = useState(0);
  const [personalNote, setPersonalNote] = useState(0);

  // Average evaluation
  const stars = [];
  for (let i = 0; i < 10; i++) {
    const generalStar = i < props.voteAverage - 1 ? (
      <StarFilled key={i} style={{ color: '#f1c40f' }} />
    ) : (
      <StarOutlined key={i} style={{ color: '#f1c40f' }} />
    );
    stars.push(generalStar);
  }

  // Saved movies
  const handleWatchMovie = () => {
    setWatchCount(watchCount + 1)
  };
  const cameraIcon = watchCount > 0 ? (
    <VideoCameraFilled style={{ color: '#e74c3c', cursor: 'pointer'}} onClick={() => handleWatchMovie()} />
  ) : (
    <VideoCameraAddOutlined onClick={() => handleWatchMovie()} style={{'cursor': 'pointer'}}/>

  );
  
  // Liked movie
  const handleLikeMovie = () => {
    props.updateLikedMovies(props.title);
  };
  const heartIcon = props.isLiked ?  <HeartFilled style={{ color: '#e74c3c', cursor: 'pointer' }} onClick={handleLikeMovie} /> : <HeartOutlined style={{ color: '#e74c3c', cursor: 'pointer' }} onClick={handleLikeMovie} />;


 // Personal note
const personalStars = [];
for (let i = 0; i < 10; i++) {
  const starIcon = i < personalNote ? 
  (
    <StarFilled key={i} onClick={() => setPersonalNote(i + 1)}  style={{ color: 'blue', cursor: 'pointer' }} />
  ) : (
    <StarOutlined key={i} onClick={() => setPersonalNote(i + 1)}style={{ color: 'blue', cursor: 'pointer' }} />
  );
  personalStars.push(starIcon);
}

  return (
    <div className={styles.card}>
      <Popover title={props.title} placement='right' content={`https://www.themoviedb.org/movie/${props.title}`}>
        <img className={styles.image} src={props.poster} alt={props.title}/>
      </Popover>
      <div >
        <div className={styles.textContainer}>
          <span className={styles.name}>{props.title}</span>
          <p className={styles.description}>{props.overview}</p>
        </div>
        <div className={styles.iconContainer}>
          <span className={styles.vote}>{stars} ({props.voteCount})</span>
          <span>{personalStars} ({personalNote})</span>
          <span> {cameraIcon} {watchCount})</span>
          <span>{heartIcon}</span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
