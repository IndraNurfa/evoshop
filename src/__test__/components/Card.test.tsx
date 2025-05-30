import { Card } from "@/components/Card";
import { Products } from "@/types";
import { formatPrice } from "@/utils/utils";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("CardComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProduct: Products = {
    id: 1,
    title: "Test Product 1",
    slug: "test-product-1",
    price: 100,
    description: "Test description 1",
    category: {
      id: 1,
      name: "Category 1",
      image: "https://placehold.co/600x400",
      slug: "category-1",
      creationAt: new Date("2025-05-29T20:37:10.000Z"),
      updatedAt: new Date("2025-05-29T20:37:10.000Z"),
    },
    images: ["https://placehold.co/600x400"],
    creationAt: new Date("2025-05-29T20:37:10.000Z"),
    updatedAt: new Date("2025-05-29T20:37:10.000Z"),
  };

  it("should render the product card with all details", () => {
    render(<Card products={mockProduct} />);

    const container = screen.getByTestId("product-list");
    expect(container).toBeInTheDocument();

    const title = screen.getByText("Test Product 1");
    expect(title).toBeInTheDocument();

    const category = screen.getByText("Category 1");
    expect(category).toBeInTheDocument();

    const price = screen.getByText(formatPrice(mockProduct.price));
    expect(price).toBeInTheDocument();
  });
});
