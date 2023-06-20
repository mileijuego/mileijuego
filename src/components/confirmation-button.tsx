import React, { useState } from 'react';
import { Button, Modal } from '@mantine/core';
import { Language, getTxt } from '../texts/texts';

function ConfirmationButton({
  buttonText,
  title,
  callback,
  language,
}: {
  buttonText: string;
  title: string;
  callback: () => void;
  language: Language;
}) {
  const [opened, setOpened] = useState(false);

  const handleConfirmation = () => {
    // Perform your action here
    callback();
    setOpened(false);
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>{buttonText}</Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
        size="sm"
      >
        <Button onClick={handleConfirmation} variant="danger">
          {getTxt(language, 'yes')}
        </Button>
        <Button onClick={() => setOpened(false)}>
          {getTxt(language, 'no')}
        </Button>
      </Modal>
    </>
  );
}

export default ConfirmationButton;
