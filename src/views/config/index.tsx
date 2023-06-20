import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Checkbox, Select } from '@mantine/core';

// import styles from './Config.module.css';
import BackButton from '../../components/back-button';
import { getTxt } from '../../texts/texts';
import { UserDataContext } from '../../App';

export default function ConfigView() {
  const history = useHistory();
  const { userData, updateUserData } = useContext(UserDataContext);
  const [joystickScale, setJoystickScale] = useState('999');
  const [mutedVolume, setMutedVolume] = useState(false);
  const [mutedMusic, setMutedMusic] = useState(false);
  const [showPlayerHpBar, setShowPlayerHpBar] = useState(false);

  useEffect(() => {
    if (userData === null) {
      return;
    }

    setJoystickScale(String(userData.joystickScale));
    setMutedVolume(userData.mutedVolume);
    setMutedMusic(userData.mutedMusic);
    setShowPlayerHpBar(userData.showPlayerHpBar);
  }, [userData]);

  if (userData === null || userData.language === null) {
    // Not loaded yet.
    return null;
  }

  return (
    <div className="dialog">
      <div className="header">
        <h1 className="lions-title">
          {getTxt(userData.language, 'config-title')}
        </h1>

        <div className="back-button-container-lions">
          <BackButton
            className="back-button-lions"
            onClick={() => {
              history.push('/main-menu');
            }}
          />
        </div>
      </div>

      <div>
        <Select
          label={getTxt(userData.language, 'config-joystickScale')}
          data={[
            { value: '0.75', label: 'x0.75' },
            { value: '0.9', label: 'x0.90' },
            { value: '1', label: 'x1.0' },
            { value: '1.1', label: 'x1.10' },
            { value: '1.25', label: 'x1.25' },
            { value: '1.5', label: 'x1.50' },
          ]}
          value={joystickScale}
          onChange={async (value) => {
            if (value === null) {
              return;
            }

            userData.joystickScale = parseFloat(value);
            updateUserData(userData);
            setJoystickScale(value);
          }}
        />

        <br />

        <Checkbox
          label={getTxt(userData.language, 'config-muteSounds')}
          checked={mutedVolume}
          onChange={async () => {
            userData.mutedVolume = !mutedVolume;
            updateUserData(userData);
            setMutedVolume(userData.mutedVolume);
          }}
        />

        <br />

        <Checkbox
          label={getTxt(userData.language, 'config-muteMusic')}
          checked={mutedMusic}
          onChange={async () => {
            userData.mutedMusic = !mutedMusic;
            updateUserData(userData);
            setMutedMusic(userData.mutedMusic);
          }}
        />

        <br />

        <Checkbox
          label={getTxt(userData.language, 'config-showPlayerHPBar')}
          checked={showPlayerHpBar}
          onChange={async () => {
            userData.showPlayerHpBar = !showPlayerHpBar;
            updateUserData(userData);
            setShowPlayerHpBar(userData.showPlayerHpBar);
          }}
        />

        <br />

        <Button onClick={() => history.push('/language')}>
          {getTxt(userData.language, 'language')}
        </Button>
      </div>
    </div>
  );
}
