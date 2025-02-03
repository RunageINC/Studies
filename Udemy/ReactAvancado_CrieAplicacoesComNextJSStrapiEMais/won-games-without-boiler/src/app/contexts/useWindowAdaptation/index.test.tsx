import { render, screen } from "@testing-library/react";
import { useWindowAdaptation, WindowAdaptationProvider } from ".";
import { useWindowSize } from "@uidotdev/usehooks";

jest.mock("@uidotdev/usehooks", () => ({
  useWindowSize: jest.fn(),
}));

const TestAdaptativeComponent = () => {
  const { isMobile } = useWindowAdaptation();

  // The data test id is used to identify the element in the test

  return (
    <>
      {!isMobile && <h1 data-testid="desktop">Desktop</h1>}
      {isMobile && <h1 data-testid="mobile">Mobile</h1>}
    </>
  );
};

describe("useWindowAdaptation", () => {
  it("should hide mobile if size is of a desktop", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024, height: 768 });

    render(
      <WindowAdaptationProvider>
        <TestAdaptativeComponent />
      </WindowAdaptationProvider>
    );

    expect(screen.getByTestId("desktop")).toBeVisible();
    expect(screen.queryByTestId("mobile")).not.toBeInTheDocument();
  });

  it("should hide desktop if size is of a desktop", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 400, height: 400 });

    render(
      <WindowAdaptationProvider>
        <TestAdaptativeComponent />
      </WindowAdaptationProvider>
    );

    expect(screen.getByTestId("mobile")).toBeVisible();
    expect(screen.queryByTestId("desktop")).not.toBeInTheDocument();
  });
});
