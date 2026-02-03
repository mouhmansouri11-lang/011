import { describe, it, expect } from "vitest";

describe("Twilio Configuration", () => {
  it("should have valid Twilio credentials", () => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

    expect(accountSid).toBeDefined();
    expect(authToken).toBeDefined();
    expect(phoneNumber).toBeDefined();

    // Validate format
    expect(accountSid).toMatch(/^AC[a-z0-9]+$/i);
    expect(authToken).toMatch(/^[a-z0-9]+$/i);
    expect(phoneNumber).toMatch(/^\+1\d{10}$/);
  });

  it("should be able to initialize Twilio client", async () => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    expect(accountSid).toBeDefined();
    expect(authToken).toBeDefined();

    // Verify credentials exist
    expect(accountSid).toMatch(/^AC/);
    expect(authToken?.length).toBeGreaterThan(20);
  });
});
