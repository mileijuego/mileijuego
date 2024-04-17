import { useContext } from 'react';
import { useHistory } from 'react-router';
import { BsGearFill } from 'react-icons/bs';

import packageJson from '../../../package.json';
import GameTitle from '../../components/game-title';
import PlaystoreButton from '../../components/playstore-button';
import '../main-menu/main-menu.css';
import FullscreenButton from '../../components/full-screen-button';
import { getAvailableSkillsPoints } from '../../game/char/character';
import { getTxt } from '../../texts/texts';
import { UserDataContext } from '../../App';

export default function MainMenuView() {
  const history = useHistory();

  const { userData } = useContext(UserDataContext);

  if (userData === null || userData.language === null) {
    // Not loaded yet.
    return null;
  }

  const { character } = userData;

  const availableSkillPoints = getAvailableSkillsPoints(character);

  return (
    <div className="dialog space-around">
      <GameTitle className="title" />

      <button
        className="play-button"
        onClick={() => {
          history.push('/levels-menu');
        }}
      >
        {getTxt(userData.language, 'play')}
      </button>

      <button
        className="lions-button"
        onClick={() => {
          history.push('/lions');
        }}
      >
        {getTxt(userData.language, 'lions')}
      </button>

      <div className="top-left-section">
        <a
          className="social-network-link"
          href="https://play.google.com/store/apps/details?id=com.gamesflood.mileijuego"
          target="_blank"
          rel="noreferrer"
        >
          <PlaystoreButton className="right-social-network-icon" />
        </a>
      </div>

      <div className="top-right-section">
        <div>
          <FullscreenButton className="full-screen-button" />

          <button
            className="config-button"
            onClick={() => history.push('/config')}
          >
            <BsGearFill fill="#f7d354" size={25} />
          </button>

          <button
            className="config-button"
            onClick={() => history.push('/character')}
          >
            {!!availableSkillPoints && <span>{availableSkillPoints}</span>}
            <img alt="Personaje" src="/img/char-button.svg" />
          </button>
        </div>
      </div>

      <div className="bottom-container">
        <div className="bottom-left">
          <p>v{packageJson.version}</p>
        </div>
      </div>
    </div>
  );
}
