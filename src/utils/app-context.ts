import { createContext } from 'react';
import isTouchDevice from 'is-touch-device';

const AppContext = createContext({
  isTouch: isTouchDevice(),
});

export default AppContext;
