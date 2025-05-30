import Page from "@/app/about/page";
import { render } from "@testing-library/react";

describe("AboutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the About page with correct content", () => {
    const { getByText } = render(<Page />);

    const title = getByText("About");
    expect(title).toBeInTheDocument();

    const description = getByText("Lorem ipsum dolor sit amet consectetur");
    expect(description).toBeInTheDocument();
  });
});
