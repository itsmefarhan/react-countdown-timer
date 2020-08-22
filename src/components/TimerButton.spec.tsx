import React from "react";
import { shallow } from "enzyme";
import TimerButton from "./TimerButton";

describe("mount Timer", () => {
  let container: any;

  beforeEach(
    () =>
      (container = shallow(
        <TimerButton buttonAction={jest.fn()} buttonValue={""} />
      ))
  );

  it("should render a <div/>", () => {
    expect(container.find("button").length).toBeGreaterThanOrEqual(1);
  });
});
