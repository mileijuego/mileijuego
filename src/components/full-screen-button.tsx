import { FaExpand } from 'react-icons/fa';

function rotateToLandscape() {
  const myScreen = window.screen || {};

  // Check if screen orientation is supported
  if (myScreen.orientation) {
    myScreen.orientation.lock('landscape-primary');
  }
}

function FullscreenButton(props: any) {
  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
      rotateToLandscape();
    }
  };

  return (
    <button {...props} onClick={handleFullscreen}>
      <FaExpand fill="#f7d354" size={25} />
    </button>
  );
}

export default FullscreenButton;
