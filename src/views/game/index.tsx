import { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { levelKey } from '../../game/interfaces';
import { startGame } from '../../game/start-game';
import AppContext from '../../utils/app-context';
import '../game/game.css';
import { UserDataContext } from '../../App';

export default function GameView() {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const { levelKey } = useParams<{ levelKey: levelKey }>();
  const { userData, updateUserData } = useContext(UserDataContext);

  useEffect(() => {
    if (userData === null) {
      throw new Error('userData is null');
    }

    const destroyGameRef = { current: () => {} };

    const startGameAndDestroy = async () => {
      destroyGameRef.current = await startGame(
        levelKey,
        appContext.isTouch,
        userData,
        updateUserData,
        () => {
          // When the game ends, it will redirect to the levels menu
          history.push('/levels-menu');
        },
      );
    };

    startGameAndDestroy();

    return () => {
      // If this component is unmounted, invoke the destroyGame function
      destroyGameRef.current();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelKey]);

  return <div className="Game" />;
}
