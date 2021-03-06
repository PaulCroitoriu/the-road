import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Search from "./components/Search";
import Button from "./components/Button";
import Table from "./components/Table";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snopshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snopshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<Button>Button</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snopshot", () => {
    const component = renderer.create(<Button>Button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Table", () => {
  const props = {
    list: [
      {
        title: "1",
        author: "1",
        num_comments: "1",
        points: "1",
        objectID: "y",
      },
      {
        title: "2",
        author: "2",
        num_comments: "2",
        points: "2",
        objectID: "z",
      },
    ],
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props} />, div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Table {...props} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
