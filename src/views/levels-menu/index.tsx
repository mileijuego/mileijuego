import { useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../../utils/app-context';
import '../levels-menu/levels-menu.css';
import { levelKey } from '../../game/interfaces';
import { isLevelPlayable } from '../../utils/local-storage';
import BackButton from '../../components/back-button';
import { COIN_TEXT, UNLOCK_LEVELS } from '../../game/constants';
import { getAvailableSkillsPoints } from '../../game/char/character';
import { formatNumber } from '../../utils/utils';
import { levels } from '../../game/levels';
import { Tabs } from '@mantine/core';
import { ARFlag, BRFlag } from 'mantine-flagpack';
import { getTxt, texts } from '../../texts/texts';
import { UserDataContext } from '../../App';

// const levelsKeys = Object.keys(levels).filter((key) => !levels[key].special);

const categories = ['ar', 'br', 'others'];

const levelsByCategory: { [key: string]: string[] } = {};
categories.forEach(
  (c) =>
    (levelsByCategory[c] = Object.keys(levels).filter(
      (key) => levels[key].category === c,
    )),
);

export default function LevelsMenuView() {
  const { isTouch } = useContext(AppContext);
  const history = useHistory();
  const { userData } = useContext(UserDataContext);

  if (userData === null || userData.language === null) {
    // Not loaded yet.
    return null;
  }

  const availableSkillPoints = getAvailableSkillsPoints(userData.character);

  const txts = texts[userData.language];

  const categoryNames: { [key: string]: any } = {
    ar: <ARFlag w={50} radius="md" />,
    br: <BRFlag w={50} radius="md" />,
    others: txts['others'],
  };

  return (
    <>
      <div className="dialog">
        <div className="back-button-container">
          <BackButton
            className="back-button"
            onClick={() => history.push('/main-menu')}
          />
        </div>

        <div>
          <p className="levels-title">
            {texts[userData.language]['levels-menu-1']}
          </p>

          <button className="level" onClick={() => history.push(`/character`)}>
            <img alt="Personaje" src="/img/char-button-black.svg" />
            <div className="level-text-container">
              <b>{txts.character}</b>

              <br />

              <div className="level-description">
                <p>
                  {availableSkillPoints} {txts.availableSkillPoints}
                </p>
                <p>
                  {formatNumber(userData.character.coins)} {COIN_TEXT}
                </p>
              </div>
            </div>
          </button>

          <ul>
            <b>{txts.controls}</b>
            <li>
              {txts.movement}:{' '}
              <b>{isTouch ? 'Joystick izquierdo' : 'W-A-S-D'}</b>
            </li>
            <li>
              {txts.shoot}:{' '}
              <b>{isTouch ? 'Joystick derecho' : 'Mouse + Click'}</b>
            </li>
          </ul>
        </div>

        <h3>{getTxt(userData.language, 'levels')}</h3>

        <div className="levels-list-container">
          <Tabs defaultValue="ar">
            <Tabs.List>
              {categories.map((c) => (
                <Tabs.Tab value={c} key={c}>
                  {categoryNames[c]}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {categories.map((c) => (
              <Tabs.Panel value={c} key={c} pt="xs">
                {levelsByCategory[c].map((k, i) => {
                  const lk = k as levelKey;
                  const levelData = levels[lk];

                  const disabled =
                    !UNLOCK_LEVELS &&
                    // Special levels are always enable.
                    !levelData.special &&
                    !isLevelPlayable(levels, k, userData.finishedLevels);

                  const completed = userData.finishedLevels.includes(lk);

                  return (
                    <button
                      disabled={disabled}
                      className="level"
                      key={lk}
                      onClick={() => history.push(`/game/${lk}`)}
                    >
                      <img
                        src={`/img/level-icon/${lk}.png`}
                        alt={`${lk}-level-icon`}
                      />
                      <div className="level-text-container">
                        <div className="level-title-container">
                          <b>
                            {!levelData.special &&
                              `${texts[userData.language!].level} ${i + 1}: `}
                            {texts[userData.language!][`${lk}-title`]}
                          </b>
                          {completed ? <b>Completado</b> : null}
                        </div>

                        <br />

                        <span className="level-description">
                          {getTxt(userData.language!, `${lk}-description`)}
                        </span>

                        {levelData.showSurvivalRecord && (
                          <div className="level-description-record">
                            <b>Record</b>
                            <p>
                              {getTxt(userData.language!, 'wave')}:{' '}
                              <b>{userData.survivalRecord.wave + 1}</b>
                            </p>
                            <p>
                              {getTxt(userData.language!, 'enemiesDefeated')}:{' '}
                              <b>{userData.survivalRecord.enemiesDefeated}</b>
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </Tabs.Panel>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
