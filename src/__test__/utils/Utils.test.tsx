import { formatPrice } from "@/utils/utils";

describe("formatPrice function", () => {
  it("should format whole numbers correctly", () => {
    expect(formatPrice(100)).toBe("$100.00");
    expect(formatPrice(1000)).toBe("$1,000.00");
    expect(formatPrice(1000000)).toBe("$1,000,000.00");
  });

  it("should handle zero correctly", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("should handle very large numbers correctly", () => {
    expect(formatPrice(1234567.89)).toBe("$1,234,567.89");
  });
});
