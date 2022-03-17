import { EventListener } from "./EventListener";


const LOG_PREFIX = 'EVENT_EMITTER';
const INVOCATION_ERROR = 'INVOCATION_ERROR';

export class EventEmitter {

  listeners: Record<string, EventListener[]>
  oneTimeListeners: Record<string, EventListener[]>

  constructor() {
    this.listeners = {};
    this.oneTimeListeners = {};
  }

  on(event: string, listener: EventListener) {
    if(this.listeners[event]) {
      this.listeners[event].push(listener);
    } else {
      this.listeners[event] = [listener];
    }
  }

  emit(event: string, ...data: any[]) {
    if(this.listeners[event]) {
      this.listeners[event].forEach(listener => this.invokeListener(event, listener, data));
    }
    if(this.oneTimeListeners[event]) {
      this.oneTimeListeners[event].forEach(listener => this.invokeListener(event, listener, data));
      delete this.oneTimeListeners[event];
    }
  }

  removeListener(event: string, listener: EventListener) {
    if(this.listeners[event]) {
      delete this.listeners[event];
    }
    if(this.oneTimeListeners[event]) {
      delete this.oneTimeListeners[event];
    }
  }

  once(event: string, listener: EventListener) {
    if(this.oneTimeListeners[event]) {
      this.oneTimeListeners[event].push(listener);
    } else {
      this.oneTimeListeners[event] = [listener];
    }
  }

  invokeListener(event: string, listener: EventListener, data: any[]) {
    try {
      listener(...data);
    } catch (e) {
      console.error(`${LOG_PREFIX}:${INVOCATION_ERROR}:${event}`)
    }
  }
}
