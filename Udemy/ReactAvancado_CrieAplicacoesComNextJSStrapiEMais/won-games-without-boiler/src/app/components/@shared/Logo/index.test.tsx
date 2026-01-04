import { render, screen } from "@testing-library/react";

import Logo from ".";

describe("<Logo />", () => {
  it("should render the logo with white label by default", () => {
    render(<Logo />);

    // expect(screen.getByText(/Won/i).parentElement).toHaveStyle({
    //   color: "#FAFAFA",
    // }); this is the usual case, but as we are using css variables, it will have to be different

    expect(screen.getByText(/Won/i).parentElement).toHaveClass(
      "logo-text-white"
    );
  });

  it("should render the logo with black label when passing", () => {
    render(<Logo color="black" />);

    expect(screen.getByText(/Won/i).parentElement).toHaveClass(
      "logo-text-black"
    );
  });

  it("should render a bigger logo", () => {
    render(<Logo size="large" />);

    expect(screen.getByText(/Won/i).parentElement).toHaveClass("logo-large");
  });

  it("should render a normal logo", () => {
    render(<Logo />);

    expect(screen.getByText(/Won/i).parentElement).toHaveClass("logo-normal");
  });

  it('should not render text when "hideText" is passed', () => {
    render(<Logo hideText />);

    expect(screen.queryByText(/Won/i)).not.toBeInTheDocument();
  });
});
