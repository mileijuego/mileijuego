import {
  Character,
  calculateExp,
  calculateLevel,
} from '../../game/char/character';
import styles from './ExpBar.module.css';

export function ExpBar({ character }: { character: Character }) {
  const level = calculateLevel(character.exp);
  const currentLevelExp = calculateExp(level);
  const nextLevelExp = calculateExp(level + 1);

  return (
    <div className={styles.container}>
      <div
        className={styles.exp}
        style={{
          width: `${
            ((character.exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100
          }%`,
        }}
      />
    </div>
  );
}
