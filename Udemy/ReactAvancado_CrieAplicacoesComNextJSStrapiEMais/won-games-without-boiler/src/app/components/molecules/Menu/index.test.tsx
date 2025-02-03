import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/app/contexts/useWindowAdaptation", () => ({
  useWindowAdaptation: () => ({ isMobile: false }),
}));

import Menu from ".";

describe("<Menu />", () => {
  it("should render", () => {
    render(<Menu />);

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/open shopping cart/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /won games/i })).toBeInTheDocument();
  });

  it("should handle open/close menu on mobile", () => {
    render(<Menu />);

    const fullMenuElement = screen.getByRole("navigation", { hidden: true });

    expect(fullMenuElement.getAttribute("aria-hidden")).toBe("true");
    expect(fullMenuElement).toHaveClass("menu-hidden");

    fireEvent.click(screen.getByLabelText(/open menu/i));

    expect(fullMenuElement.getAttribute("aria-hidden")).toBe("false");
    expect(fullMenuElement).not.toHaveClass("menu-hidden");
    expect(fullMenuElement).toHaveClass("won-games__nav-menu");

    fireEvent.click(screen.getByLabelText(/close menu/i));

    expect(fullMenuElement.getAttribute("aria-hidden")).toBe("true");
    expect(fullMenuElement).toHaveClass("menu-hidden");
    expect(fullMenuElement).not.toHaveClass("won-games__nav-menu");
  });

  it("should show register box when there's no username", () => {
    render(<Menu />);

    expect(screen.getByText(/login now!/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).toBeInTheDocument();
  });

  it("should show new options when logged in", () => {
    render(<Menu username="test user" />);

    expect(screen.queryByText(/login now!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
    expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/my account/i)).toBeInTheDocument();
  });
});
