export default class Eventable {
  private __eventHandler: Map<string, Function[]> = new Map();

  /**
   * Triggers events related to the eventHandler X
   * @param {string} eventName Name of the event.
   * @param {Array} args Array of parameters to be passed to the event handlers.
   * @return {boolean} True if any event handler was executed, False if no event handler was executed.
   */
  public trigger(eventName: string, args: any[]): boolean {
    const event = this.__eventHandler.get(eventName);

    if (!event) {
      // There are no handlers for this event.
      return false;
    }

    for (const handler of event) {
      handler.apply(this, args);
    }

    return true;
  }

  /**
   * Adds an event handler for a specific trigger type.
   * @param {string} eventName Name of the event.
   * @param {Function} callback Function that processes the event.
   * @return {void}
   */
  public on(eventName: string, callback: (...args: any[]) => void): void {
    const event = this.__eventHandler.get(eventName);

    if (event) {
      event.push(callback);
    } else {
      this.__eventHandler.set(eventName, [callback]);
    }
  }

  /**
   * Removes an event handler for a specific trigger type.
   * @param {string} eventName Name of the event.
   * @return {void}
   */
  public off(eventName: string): void {
    this.__eventHandler.delete(eventName);
  }
}
