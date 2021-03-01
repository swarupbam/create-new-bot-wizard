import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Wizard } from "../components/wizard";

describe("Wizard test cases", () => {
  let wizardWrapper: ReactWrapper;

  beforeEach(() => {
    wizardWrapper = mount(<Wizard />);
  });

  it("Should check all the checkboxes when clicked on the header row checkbox", () => {
    wizardWrapper
      .find(".header-row-cell--checkbox input")
      .simulate("change", { target: { checked: true } });
    wizardWrapper.find('input[type="checkbox"]').forEach((checkbox) => {
      expect(checkbox.props()["checked"]).toBe(true);
    });
  });

  it("Should uncheck all the checkboxes when reset button is clicked", () => {
    wizardWrapper
      .find(".header-row-cell--checkbox input")
      .simulate("change", { target: { checked: true } });

    wizardWrapper.find("button.button__reset").simulate("click");

    wizardWrapper.find('input[type="checkbox"]').forEach((checkbox) => {
      expect(checkbox.props()["checked"]).toBe(false);
    });
  });

  it("Should display all the expressions of a particular row when view more button is clicked", () => {
    wizardWrapper
      .find("div.body-row-cell--expressions button")
      .at(0)
      .simulate("click");
    expect(
      wizardWrapper.find("div.body-row-cell--expressions button").at(0).text()
    ).toBe("View less");
  });

  it("Should display view more if view less button is clicked", () => {
    wizardWrapper
      .find("div.body-row-cell--expressions button")
      .at(0)
      .simulate("click");
    expect(
      wizardWrapper.find("div.body-row-cell--expressions button").at(0).text()
    ).toBe("View less");
    wizardWrapper
      .find("div.body-row-cell--expressions button")
      .at(0)
      .simulate("click");
    expect(
      wizardWrapper.find("div.body-row-cell--expressions button").at(0).text()
    ).toBe("View more");
  });
});
