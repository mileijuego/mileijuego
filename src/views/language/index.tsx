import { useContext, useState } from 'react';

import { ESFlag, BRFlag, GBFlag } from 'mantine-flagpack';
import { Language, texts } from '../../texts/texts';
import { Button, Modal } from '@mantine/core';

import styles from './Language.module.css';
import { useHistory } from 'react-router-dom';
import { UserDataContext } from '../../App';

export default function LanguageView() {
  const history = useHistory();
  const [language, setLanguage] = useState<Language>('es');
  const { userData, updateUserData } = useContext(UserDataContext);

  if (userData === null) {
    // Not loaded yet.
    return null;
  }

  const continueFn = async () => {
    userData.language = language;
    await updateUserData(userData);
    history.push('/');
  };

  return (
    <div>
      <Modal
        opened={true}
        onClose={continueFn}
        title={texts[language].language}
        centered
      >
        <div>
          <ESFlag
            w={50}
            radius="md"
            className={`${styles.flag} ${language === 'es' && styles.selected}`}
            onClick={() => setLanguage('es')}
          />
          <BRFlag
            w={50}
            radius="md"
            className={`${styles.flag} ${language === 'pt' && styles.selected}`}
            onClick={() => setLanguage('pt')}
          />
          <GBFlag
            w={50}
            radius="md"
            className={`${styles.flag} ${language === 'en' && styles.selected}`}
            onClick={() => setLanguage('en')}
          />
        </div>

        <div className={styles.continue}>
          <Button onClick={continueFn}>{texts[language].continue}</Button>
        </div>
      </Modal>
    </div>
  );
}
