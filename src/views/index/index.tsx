import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import BackButton from '../../components/back-button';
import sounds, { GameSound } from '../../game/sounds';
import './style.css';
import { texts } from '../../texts/texts';
import { UserDataContext } from '../../App';

export default function IndexView() {
  const [showLoading, setShowLoading] = useState(true);
  const { userData } = useContext(UserDataContext);

  const history = useHistory();

  useEffect(() => {
    let music: GameSound;
    let timeout: NodeJS.Timeout;

    if (userData === null) {
      // Not loaded yet.
      return;
    }

    if (userData.language === null) {
      history.push('/language');
      return;
    }

    music = sounds['music-intro'];
    music.on('load', () => {
      setShowLoading(false);
      music.play();
      music.volume(1 / 3);
      music.mute(userData.mutedMusic);
      timeout = setTimeout(() => {
        history.push('/main-menu');
      }, 60000);
    });
    music.load();

    return () => {
      music?.stop();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (userData === null || userData.language === null) {
    // Not loaded yet.
    return null;
  }

  if (showLoading) {
    return (
      <h2 style={{ color: '#feda4a' }}>
        {texts[userData.language].loading}...
      </h2>
    );
  }

  return (
    <div className="intro-text-container">
      <div className="back-button-container">
        <BackButton
          className="back-button"
          onClick={() => history.push('/main-menu')}
        />
      </div>
      <div className="fade" />

      <section className="star-wars">
        <div className="crawl">
          <div className="title">
            <h1>{texts[userData.language]['intro-1']}</h1>
          </div>

          <p>{texts[userData.language]['intro-2']}</p>
          <p>{texts[userData.language]['intro-3']}</p>
          <p>{texts[userData.language]['intro-4']}</p>
          <p>{texts[userData.language]['intro-5']}</p>
          <p>{texts[userData.language]['intro-6']}</p>
        </div>
      </section>
    </div>
  );
}
