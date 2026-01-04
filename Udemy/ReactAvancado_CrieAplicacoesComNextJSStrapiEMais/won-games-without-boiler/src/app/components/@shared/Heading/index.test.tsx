import { render, screen } from "@testing-library/react";

import Heading from ".";

describe("<Heading />", () => {
  it("should render the white heading by default", () => {
    render(<Heading>Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveClass(
      "heading-white"
    );
  });

  it("should render the black heading when color is passed", () => {
    render(<Heading color="black">Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveClass(
      "heading-black"
    );
  });

  it("should render the heading with a normal size", () => {
    render(<Heading>Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveClass(
      "heading-l"
    );
  });

  it("should render the heading with a larger size", () => {
    render(<Heading size="xl">Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveClass(
      "heading-xl"
    );
  });

  it("should render the heading with line left", () => {
    render(<Heading lineLeft>Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveClass(
      "heading-line-left"
    );
  });

  it("should render the heading with line Bottom", () => {
    render(<Heading lineBottom>Won Games</Heading>);

    expect(screen.getByRole("heading", { name: /Won Games/i })).toHaveClass(
      "heading-line-bottom"
    );
  });
});
