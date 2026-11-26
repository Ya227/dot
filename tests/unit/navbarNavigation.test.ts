import { describe, expect, it } from "@jest/globals";

import { getLogoDestination } from "../../src/features/navbar";

describe("", () => {
  it("returns the landing page for a guest", () => {
    expect(getLogoDestination(false)).toBe("/");
  });

  it("returns the dashboard for an authenticated user", () => {
    expect(getLogoDestination(true)).toBe("/dashboard");
  });
});
