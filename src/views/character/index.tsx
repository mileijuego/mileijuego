import { useContext } from 'react';
import { useHistory } from 'react-router';

import styles from './Character.module.css';
import BackButton from '../../components/back-button';
import {
  addSkillPoint,
  buyItem,
  calculateExp,
  calculateLevel,
  canBuyItem,
  getAvailableSkillsPoints,
  getCharEffects,
  resetSkillPoints,
  selectItem,
} from '../../game/char/character';
import { CharItemStatus, getDefaultUserData } from '../../utils/local-storage';
import ConfirmationButton from '../../components/confirmation-button';
import { Button } from '@mantine/core';
import {
  BASE_HP,
  COIN_TEXT,
  DAMAGE_PER_LEVEL,
  HP_PER_LEVEL,
} from '../../game/constants';
import { charSkills } from '../../game/char/char-skills';
import { charItems } from '../../game/char/char-items';
import { ExpBar } from '../../components/exp-bar';
import { formatNumber } from '../../utils/utils';
import { getTxt, texts } from '../../texts/texts';
import { UserDataContext } from '../../App';

const items = Object.keys(charItems);

export default function CharacterView() {
  const history = useHistory();
  const { userData, updateUserData } = useContext(UserDataContext);

  if (userData === null || userData.language === null) {
    // Not loaded yet.
    return null;
  }

  const { character } = userData;

  const level = calculateLevel(character.exp);
  const availableSkillPoints = getAvailableSkillsPoints(character);
  const charEffects = getCharEffects(character);

  const txts = texts[userData.language!];

  return (
    <div className="dialog">
      <div className="header">
        <h1 className="lions-title">{txts.character}</h1>

        <div className="back-button-container-lions">
          <BackButton
            className="back-button-lions"
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
      </div>

      <div>
        <p>{getTxt(userData.language, 'characterDescription')}</p>
        <p>
          HP: {BASE_HP + HP_PER_LEVEL * (level - 1)} (+{HP_PER_LEVEL}{' '}
          {getTxt(userData.language, 'perLevel')}) -{' '}
          {getTxt(userData.language, 'damage')}: +
          {DAMAGE_PER_LEVEL * (level - 1)} (+{DAMAGE_PER_LEVEL}{' '}
          {getTxt(userData.language, 'perLevel')})
        </p>
        <div>
          <span>
            <span className={styles.level}>
              {getTxt(userData.language, 'level')} {level}
            </span>{' '}
            (exp. {formatNumber(character.exp)} /{' '}
            {formatNumber(calculateExp(level + 1))})
          </span>
          <ExpBar character={character} />
        </div>
        <p>
          {COIN_TEXT}: {formatNumber(character.coins)}
        </p>
        <h3>{getTxt(userData.language, 'skills')}</h3>

        <div className={styles.availablePoints}>
          <span>
            {getTxt(userData.language, 'availablePoints')}:{' '}
            {availableSkillPoints}
          </span>

          <ConfirmationButton
            buttonText={getTxt(userData.language!, 'resetSkillPoints')}
            title={getTxt(userData.language!, 'resetSkillPointsD')}
            callback={() => {
              resetSkillPoints(userData.character);
              updateUserData(userData);
            }}
            language={userData.language!}
          />
        </div>

        <table className={styles.skillsTable}>
          <tbody>
            {userData.character.skills.map((skill) => {
              const sData = charSkills[skill.skillKey];

              let skillPointsAdded = 0;
              charEffects.forEach((effect) => {
                if (effect.effect === 'skillPointsMultiplier') {
                  skillPointsAdded += skill.points * (effect.value - 1);
                }
              });

              if (!sData) {
                console.error(skill.skillKey, 'undefined');
                return null;
              }

              return (
                <tr key={skill.skillKey}>
                  <td className={styles.skillTitle}>
                    {getTxt(userData.language!, `skill-${skill.skillKey}`)}
                  </td>
                  <td>
                    {getTxt(userData.language!, `skill-${skill.skillKey}D`)}
                  </td>
                  <td className={styles.skillPoints}>
                    {skill.points}
                    {!!skillPointsAdded && ` (+${skillPointsAdded})`}
                  </td>
                  <td>
                    {sData.minLevel && sData.minLevel > level ? (
                      `${getTxt(userData.language!, 'requiresLevel')} ${
                        sData.minLevel
                      }`
                    ) : (
                      <Button
                        disabled={
                          !!(
                            availableSkillPoints <= 0 ||
                            (sData.minLevel && level < sData.minLevel) ||
                            (sData.maxPoints && skill.points >= sData.maxPoints)
                          )
                        }
                        onClick={() => {
                          addSkillPoint(character, skill.skillKey);
                          updateUserData(userData);
                        }}
                      >
                        +
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <h3>Objetos</h3>
        <div>
          <table className={styles.itemsTable}>
            <tbody>
              {items.map((item) => {
                const charItem = character.inventory[charItems[item].type][
                  item
                ] as CharItemStatus;

                const buttonsToShow = {
                  [CharItemStatus.BOUGHT]: getTxt(
                    userData.language!,
                    'selected',
                  ),
                  [CharItemStatus.NOT_USED]: (
                    <Button
                      onClick={() => {
                        selectItem(character, item);
                        updateUserData(userData);
                      }}
                    >
                      {getTxt(userData.language!, 'select')}
                    </Button>
                  ),
                  [CharItemStatus.NO_BOUGHT]: (
                    <Button
                      disabled={!canBuyItem(character, item)}
                      size="sm"
                      onClick={() => {
                        buyItem(character, item);
                        updateUserData(userData);
                      }}
                    >
                      {getTxt(userData.language!, 'buy')}
                      {'\n'}({COIN_TEXT} {formatNumber(charItems[item].price)})
                    </Button>
                  ),
                };

                return (
                  <tr key={item}>
                    <td>
                      <img alt={item} src={charItems[item].img} />
                    </td>
                    <td>{getTxt(userData.language!, `item-${item}`)}</td>
                    <td>{getTxt(userData.language!, `item-${item}D`)}</td>
                    <td>{buttonsToShow[charItem]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <ConfirmationButton
          buttonText={getTxt(userData.language!, 'resetCharacter')}
          title={getTxt(userData.language!, 'resetCharacterD')}
          callback={() => {
            userData.character = getDefaultUserData().character;
            updateUserData(userData);
          }}
          language={userData.language!}
        />
      </div>
    </div>
  );
}
