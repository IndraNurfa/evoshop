import { ProductDetail } from "@/components/ProductDetail";
import { CartProvider } from "@/contexts/CartContext";
import { Products } from "@/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ProductDetail Component", () => {
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

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User", role: "user" } },
      status: "authenticated",
    });
  });

  const renderWithContext = (component: React.ReactNode) => {
    return render(<CartProvider>{component}</CartProvider>);
  };
  it("should render the product details correctly", () => {
    renderWithContext(<ProductDetail products={mockProduct} />);

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();

    expect(screen.getByText("Test description 1")).toBeInTheDocument();

    const mainPrice = screen.getByText("$100.00", { selector: "p.text-2xl" });
    expect(mainPrice).toBeInTheDocument();

    const subtotal = screen.getByText("Subtotal").nextElementSibling;
    expect(subtotal).toHaveTextContent("$100.00");
  });

  it("should handle quantity increment correctly", () => {
    renderWithContext(<ProductDetail products={mockProduct} />);

    const incrementButton = screen.getByLabelText("Increase quantity");
    const quantityDisplay = screen.getByTestId("quantity-display");

    expect(quantityDisplay).toHaveTextContent("1");

    fireEvent.click(incrementButton);
    expect(quantityDisplay).toHaveTextContent("2");

    for (let i = 0; i < 5; i++) {
      fireEvent.click(incrementButton);
    }
    expect(quantityDisplay).toHaveTextContent("5");
  });

  it("should handle quantity decrement correctly", () => {
    renderWithContext(<ProductDetail products={mockProduct} />);

    const decrementButton = screen.getByLabelText("Decrease quantity");
    const incrementButton = screen.getByLabelText("Increase quantity");
    const quantityDisplay = screen.getByTestId("quantity-display");

    fireEvent.click(incrementButton);
    expect(quantityDisplay).toHaveTextContent("2");

    fireEvent.click(decrementButton);
    expect(quantityDisplay).toHaveTextContent("1");

    fireEvent.click(decrementButton);
    expect(quantityDisplay).toHaveTextContent("1");
  });
});
