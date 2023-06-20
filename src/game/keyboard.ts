interface KeyList {
  [x: string]: boolean;
}

export default class Keyboard {
  private keyList: KeyList;

  constructor() {
    this.keyList = {};
    this.addEventListeners();
  }

  public addEventListeners() {
    window.addEventListener('keydown', this.downHandler.bind(this), false);
    window.addEventListener('keyup', this.upHandler.bind(this), false);
  }

  public removeEventListeners() {
    window.removeEventListener('keydown', this.downHandler);
    window.removeEventListener('keyup', this.upHandler);
  }

  private downHandler(key: KeyboardEvent) {
    key.preventDefault();
    this.keyList[key.keyCode] = true;
  }

  private upHandler(key: KeyboardEvent) {
    key.preventDefault();
    this.keyList[key.keyCode] = false;
  }

  public isPressed(keyCode: number) {
    return !!this.keyList[keyCode];
  }
}
