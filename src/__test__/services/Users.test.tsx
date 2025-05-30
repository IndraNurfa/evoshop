import axios from "axios";
import { fetchUsers, registerUser } from "@/app/services/users";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockUsers = [
  {
    id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "John",
    role: "customer",
    avatar: "https://i.pravatar.cc/300",
  },
];
describe("User Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockedAxios);
  });

  describe("fetchUsers", () => {
    it("returns users data when API call is successful", async () => {

      mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

      const result = await fetchUsers();

      expect(result).toEqual(mockUsers);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith("");
    });

    it("handles errors in fetchUsers", async () => {
      const mockError = new Error("Network error");
      mockedAxios.get.mockRejectedValueOnce(mockError);

      const consoleSpy = jest.spyOn(console, "error");
      const result = await fetchUsers();

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("registerUser", () => {
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    it("successfully registers user", async () => {
      const mockResponse = {
        id: 1,
        ...mockUserData,
        role: "customer",
        avatar: "https://i.pravatar.cc/300",
      };

      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await registerUser(
        mockUserData.name,
        mockUserData.email,
        mockUserData.password,
      );

      expect(result).toEqual({ user: mockResponse });
      expect(mockedAxios.post).toHaveBeenCalledWith("", {
        ...mockUserData,
        avatar: "https://i.pravatar.cc/300",
      });
    });

    it("handles API error with error message", async () => {
      const mockError = {
        response: {
          data: {
            message: "Email already exists",
          },
        },
      };

      mockedAxios.post.mockRejectedValueOnce(mockError);

      const result = await registerUser(
        mockUserData.name,
        mockUserData.email,
        mockUserData.password,
      );

      expect(result).toEqual({ error: "Email already exists" });
    });

    it("handles unexpected errors", async () => {
      const mockError = new Error("Network error");
      mockedAxios.post.mockRejectedValueOnce(mockError);

      const result = await registerUser(
        mockUserData.name,
        mockUserData.email,
        mockUserData.password,
      );

      expect(result).toEqual({ error: "An unexpected error occurred" });
    });
  });
});
