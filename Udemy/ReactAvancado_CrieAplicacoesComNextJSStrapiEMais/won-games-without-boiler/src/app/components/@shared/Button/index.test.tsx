import { render, screen } from "@testing-library/react";
import Button from ".";
import { AddShoppingCart } from "styled-icons/material-outlined";

describe("<Button />", () => {
  it("should render the medium size by default", () => {
    const { container } = render(<Button>Buy now</Button>);
    expect(screen.getByRole("button", { name: /buy now/i })).toHaveClass(
      "button-medium"
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render different sizes when passed", () => {
    render(<Button size="small">Buy now small</Button>);
    expect(screen.getByRole("button", { name: /buy now small/i })).toHaveClass(
      "button-small"
    );

    render(<Button size="large">Buy now large</Button>);
    expect(screen.getByRole("button", { name: /buy now large/i })).toHaveClass(
      "button-large"
    );
  });

  it("should render the button by full width when passed", () => {
    render(<Button fullWidth>Buy now</Button>);
    expect(screen.getByRole("button", { name: /buy now/i })).toHaveClass(
      "full-width"
    );
  });

  it("should render an icon version", () => {
    render(
      <Button icon={<AddShoppingCart data-testid="icon" />}>Buy now</Button>
    );

    expect(screen.getByText(/buy now/i).parentElement).toHaveClass(
      "button-icon"
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
