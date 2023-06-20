import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import getSizeByAspectRatio from './utils/get-size-by-aspect-ratio';
import useWindowSize from './utils/use-window-size';
import './App.css';
import MainMenuView from './views/main-menu';
import LevelsMenuView from './views/levels-menu';
import GameView from './views/game';
import LionsView from './views/lions';
import IndexView from './views/index';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Howler } from 'howler';
import ConfigView from './views/config';
import CharacterView from './views/character';
import LanguageView from './views/language';
import {
  IUserData,
  getDefaultUserData,
  getUserData,
  setUserData,
} from './utils/local-storage';

type SavedUserData = null | IUserData;

export const UserDataContext = createContext({
  userData: null as SavedUserData,
  updateUserData: async (data: IUserData): Promise<IUserData> => {
    return getDefaultUserData();
  },
});

// Aspect ratio off the app
const ASPECT_RATIO = 16 / 9;

export default function App() {
  const { width, height } = useWindowSize();
  const appSize = getSizeByAspectRatio(width!, height!, ASPECT_RATIO);

  const [userData, setUData] = useState<SavedUserData>(null);
  // Function to update the context value
  const updateUserData = async (data: IUserData) => {
    const copy: IUserData = JSON.parse(JSON.stringify(data));
    setUData(copy);
    await setUserData(copy);
    return copy;
  };
  const fetchUserData = useCallback(async () => {
    const fetchedData = await getUserData();
    setUData(fetchedData);
  }, []);

  useEffect(() => {
    window.addEventListener('blur', () => {
      // Mutes the sounds if the window is not being focused
      Howler.mute(true);
    });
    window.addEventListener('focus', () => {
      Howler.mute(false);
    });

    fetchUserData();
  }, [fetchUserData]);

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      <div
        className="App"
        style={{ width: appSize.width, height: appSize.height }}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <IndexView />
            </Route>

            <Route exact path="/language">
              <LanguageView />
            </Route>

            <Route exact path="/main-menu">
              <MainMenuView />
            </Route>

            <Route exact path="/lions">
              <LionsView />
            </Route>

            <Route exact path="/config">
              <ConfigView />
            </Route>

            <Route exact path="/character">
              <CharacterView />
            </Route>

            <Route exact path="/levels-menu">
              <LevelsMenuView />
            </Route>

            <Route exact path="/game/:levelKey">
              <GameView />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserDataContext.Provider>
  );
}
