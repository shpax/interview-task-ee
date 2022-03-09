import { EventListener } from "./EventListener";

export class EventEmitter {
  on(event: string, listener: EventListener) {
    // TODO: subscribe to events
  }

  emit(event: string, ...data: any[]) {
    // TODO: emit event with any number of params
  }

  removeListener(event: string, listener: EventListener) {
    // TODO: remove listener function
  }

  once(event: string, listener: EventListener) {
    // TODO: subscribe to events, unsubscribe after first trigger
  }
}
