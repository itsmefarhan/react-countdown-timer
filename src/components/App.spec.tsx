import React from "react";

import { shallow } from "enzyme";
import App from "../App";
import Timer from "./Timer";

describe("App", () => {
  let container: any;

  beforeEach(() => (container = shallow(<App />)));

  it("should render a <div/>", () => {
    expect(container.find("div").length).toEqual(1);
  });

  it("should render Timer component", () => {
    expect(container.containsMatchingElement(<Timer />)).toEqual(true);
  });
});
