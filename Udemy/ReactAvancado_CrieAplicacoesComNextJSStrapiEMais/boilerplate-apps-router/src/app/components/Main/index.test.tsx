import { render, screen } from "@testing-library/react";

import Main from ".";

describe("<Main />", () => {
  it("should render the heading", () => {
    //renderiza o componente
    const { container } = render(<Main />);
    //busca o elemento

    expect(
      screen.getByRole("heading", { name: /react avançado/i })
    ).toBeInTheDocument();

    // gera um snapshot na pasta __snapshots__
    expect(container.firstChild).toMatchSnapshot();
  });
});
