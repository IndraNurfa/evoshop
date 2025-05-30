import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import RegisterPage from "@/app/register/page";
import { registerUser } from "@/app/services/users";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/services/users", () => ({
  registerUser: jest.fn(),
}));

describe("Register Page", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const elements = {
    getTitle: () => screen.getByText("Create a new account"),
    getNameInput: () => screen.getByLabelText(/full name/i) as HTMLInputElement,
    getEmailInput: () =>
      screen.getByLabelText(/email address/i) as HTMLInputElement,
    getPasswordInput: () =>
      screen.getByLabelText(/^password$/i) as HTMLInputElement,
    getRegisterButton: () => screen.getByRole("button", { name: /register/i }),
    getErrorMessage: (message: string) => screen.getByText(message),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders registration form correctly", () => {
    render(<RegisterPage />);

    expect(elements.getTitle()).toBeInTheDocument();
    expect(elements.getNameInput()).toBeInTheDocument();
    expect(elements.getEmailInput()).toBeInTheDocument();
    expect(elements.getPasswordInput()).toBeInTheDocument();
  });

  it("validates password length", async () => {
    render(<RegisterPage />);

    fireEvent.change(elements.getNameInput(), {
      target: { value: "Test User" },
    });
    fireEvent.change(elements.getEmailInput(), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(elements.getPasswordInput(), {
      target: { value: "12345" },
    });

    fireEvent.click(elements.getRegisterButton());

    expect(
      elements.getErrorMessage("Password must be at least 6 characters long"),
    ).toBeInTheDocument();
  });

  it("handles successful registration", async () => {
    (registerUser as jest.Mock).mockResolvedValueOnce({});

    render(<RegisterPage />);

    fireEvent.change(elements.getNameInput(), {
      target: { value: "Test User" },
    });
    fireEvent.change(elements.getEmailInput(), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(elements.getPasswordInput(), {
      target: { value: "password123" },
    });

    fireEvent.click(elements.getRegisterButton());

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/login?registered=true");
    });
  });
});
