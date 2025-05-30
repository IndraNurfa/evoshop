import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Page from "@/app/login/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("Login Page", () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  const mockSearchParams = {
    get: jest.fn(),
  };

  const elements = {
    getTitle: () => screen.getByText("Sign in to your account"),
    getEmailInput: () =>
      screen.getByLabelText(/email address/i) as HTMLInputElement,
    getPasswordInput: () =>
      screen.getByLabelText(/password/i) as HTMLInputElement,
    getSignInButton: () => screen.getByRole("button", { name: /sign in/i }),
    getSuccessMessage: () =>
      screen.getByText("Registration successful! Please log in."),
    getErrorMessage: (message: string) => screen.getByText(message),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it("renders login form correctly", () => {
    render(<Page />);
    expect(elements.getTitle()).toBeInTheDocument();
    expect(elements.getEmailInput()).toBeInTheDocument();
    expect(elements.getPasswordInput()).toBeInTheDocument();
    expect(elements.getSignInButton()).toBeInTheDocument();
  });

  it("shows registration success message", () => {
    mockSearchParams.get.mockReturnValueOnce("true");
    render(<Page />);

    expect(elements.getSuccessMessage()).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true, error: null });

    render(<Page />);
    fireEvent.change(elements.getEmailInput(), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(elements.getPasswordInput(), {
      target: { value: "password123" },
    });
    fireEvent.click(elements.getSignInButton());

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });
      expect(mockRouter.refresh).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("handles login failure", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      ok: false,
      error: "Invalid credentials",
    });

    render(<Page />);
    fireEvent.change(elements.getEmailInput(), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(elements.getPasswordInput(), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(elements.getSignInButton());

    await waitFor(() => {
      expect(
        elements.getErrorMessage("Invalid email or password"),
      ).toBeInTheDocument();
    });
  });

  it("validates required fields", async () => {
    render(<Page />);
    fireEvent.click(elements.getSignInButton());

    const emailInput = elements.getEmailInput();
    const passwordInput = elements.getPasswordInput();

    expect(emailInput.validity.valid).toBe(false);
    expect(passwordInput.validity.valid).toBe(false);
  });

  it("validates email format", () => {
    render(<Page />);

    const emailInput = elements.getEmailInput();

    fireEvent.change(emailInput, { target: { value: "notanemail" } });
    expect(emailInput.validity.valid).toBe(false);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.validity.valid).toBe(true);
  });
});
