import { EventEmitter as NodeEventEmitter } from "events";

import { EventEmitter } from "./EventEmitter";

let events: EventEmitter | NodeEventEmitter;

describe("EventEmitter test", () => {
  beforeEach(() => {
    events = new EventEmitter();
  });

  test("subscribe & fire error event", () => {
    const errorSpy = jest.spyOn(console, 'error');
    events.on("error-event", () => {
      throw new Error('SOME_ERROR');
    });
    events.emit("error-event");
    expect(errorSpy).toHaveBeenCalledWith('EVENT_EMITTER:INVOCATION_ERROR:error-event');
  });

  test("subscribe & fire single event", () => {
    let listener1Response: string[] = [];
    let listener2Response: string[] = [];

    events.on("some-event", (...params) => {
      listener1Response = params;
    });

    events.on("some-event", (...params) => {
      listener2Response = params;
    });

    const testData = ["1", "2", "3", "4", "5", "6"];

    events.emit("some-event", ...testData);

    expect(listener1Response).toStrictEqual(testData);
    expect(listener2Response).toStrictEqual(testData);
  });

  test("subscribe & fire single event multiple times", () => {
    let counter = 0;

    events.on("some-event", (increment) => {
      counter += increment;
    });

    events.emit("some-event", 1);
    events.emit("some-event", 2);
    events.emit("some-event", 3);
    events.emit("some-event", 4);

    expect(counter).toStrictEqual(10);
  });

  test("subscribe & fire multiple events", () => {
    let listener1Response: string[] = [];
    let listener2Response: string[] = [];

    events.on("some-event", (...params) => {
      listener1Response = params;
    });

    events.on("some-other-event", (...params) => {
      listener2Response = params;
    });

    const testData = ["1", "2", "3"];
    const testData2 = ["4", "5", "6"];

    events.emit("some-event", ...testData);
    expect(listener1Response).toStrictEqual(testData);

    events.emit("some-other-event", ...testData2);

    expect(listener2Response).toStrictEqual(testData2);
  });

  test("once() logic", () => {
    let counter = 0;

    events.once("some-event", (increment) => {
      counter += increment;
    });

    events.emit("some-event", 1);
    events.emit("some-event", 2);
    events.emit("some-event", 3);
    events.emit("some-event", 4);

    expect(counter).toStrictEqual(1);
  });

  test("removeListener() for on()", () => {
    let counter = 0;

    const listener = (increment: number) => {
      counter += increment;
    };

    events.on("some-event", listener);

    events.emit("some-event", 1);
    events.emit("some-event", 2);
    events.emit("some-event", 3);

    events.removeListener("some-event", listener);

    events.emit("some-event", 4);

    expect(counter).toStrictEqual(6);
  });

  test("removeListener() never firing for once()", () => {
    let counter = 0;

    const listener = (increment: number) => {
      counter += increment;
    };

    events.once("some-event", listener);

    events.removeListener("some-event", listener);

    events.emit("some-event", 1);
    events.emit("some-event", 2);

    expect(counter).toStrictEqual(0);
  });

  test("removeListener() never firing for on()", () => {
    let counter = 0;

    const listener = (increment: number) => {
      counter += increment;
    };

    events.on("some-event", listener);

    events.removeListener("some-event", listener);

    events.emit("some-event", 1);
    events.emit("some-event", 2);

    expect(counter).toStrictEqual(0);
  });
});
