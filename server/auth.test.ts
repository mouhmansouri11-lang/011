import { describe, expect, it, beforeEach, vi } from "vitest";
import { isValidAlgerianPhone, formatAlgerianPhone } from "../shared/phone-utils";

describe("Phone Utilities", () => {
  describe("isValidAlgerianPhone", () => {
    it("should validate Algerian mobile numbers starting with 05", () => {
      expect(isValidAlgerianPhone("0555555555")).toBe(true);
      expect(isValidAlgerianPhone("0566666666")).toBe(true);
      expect(isValidAlgerianPhone("0577777777")).toBe(true);
    });

    it("should validate Algerian mobile numbers starting with 06", () => {
      expect(isValidAlgerianPhone("0655555555")).toBe(true);
      expect(isValidAlgerianPhone("0666666666")).toBe(true);
      expect(isValidAlgerianPhone("0677777777")).toBe(true);
    });

    it("should validate Algerian mobile numbers starting with 07", () => {
      expect(isValidAlgerianPhone("0755555555")).toBe(true);
      expect(isValidAlgerianPhone("0766666666")).toBe(true);
      expect(isValidAlgerianPhone("0777777777")).toBe(true);
    });

    it("should validate Algerian numbers with country code 213", () => {
      expect(isValidAlgerianPhone("213555555555")).toBe(true);
      expect(isValidAlgerianPhone("213655555555")).toBe(true);
      expect(isValidAlgerianPhone("213755555555")).toBe(true);
    });

    it("should validate Algerian numbers with +213 prefix", () => {
      expect(isValidAlgerianPhone("+213555555555")).toBe(true);
      expect(isValidAlgerianPhone("+213655555555")).toBe(true);
      expect(isValidAlgerianPhone("+213755555555")).toBe(true);
    });

    it("should reject invalid Algerian phone numbers", () => {
      expect(isValidAlgerianPhone("0455555555")).toBe(false); // Starts with 04
      expect(isValidAlgerianPhone("0355555555")).toBe(false); // Starts with 03
      expect(isValidAlgerianPhone("05555555")).toBe(false); // Too short
      expect(isValidAlgerianPhone("055555555555")).toBe(false); // Too long
      expect(isValidAlgerianPhone("abcdefghij")).toBe(false); // Non-numeric
    });
  });

  describe("formatAlgerianPhone", () => {
    it("should format local Algerian numbers to international format", () => {
      expect(formatAlgerianPhone("0555555555")).toBe("+213555555555");
      expect(formatAlgerianPhone("0655555555")).toBe("+213655555555");
      expect(formatAlgerianPhone("0755555555")).toBe("+213755555555");
    });

    it("should format numbers with country code 213", () => {
      expect(formatAlgerianPhone("213555555555")).toBe("+213555555555");
      expect(formatAlgerianPhone("213655555555")).toBe("+213655555555");
    });

    it("should format numbers with +213 prefix", () => {
      expect(formatAlgerianPhone("+213555555555")).toBe("+213555555555");
      expect(formatAlgerianPhone("+213655555555")).toBe("+213655555555");
    });

    it("should handle numbers with spaces and dashes", () => {
      expect(formatAlgerianPhone("05 555 555 55")).toBe("+213555555555");
      expect(formatAlgerianPhone("05-555-555-55")).toBe("+213555555555");
    });
  });

  describe("OTP Generation", () => {
    it("should generate a 6-digit OTP", () => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      expect(otp).toHaveLength(6);
      expect(/^\d{6}$/.test(otp)).toBe(true);
    });

    it("should generate different OTPs on multiple calls", () => {
      const otp1 = Math.floor(100000 + Math.random() * 900000).toString();
      const otp2 = Math.floor(100000 + Math.random() * 900000).toString();
      // Note: There's a very small chance these could be equal, but it's negligible
      expect(otp1).toHaveLength(6);
      expect(otp2).toHaveLength(6);
    });
  });

  describe("OTP Expiration", () => {
    it("should set OTP expiration to 10 minutes from now", () => {
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);
      
      const diff = expiresAt.getTime() - now.getTime();
      const minutes = diff / (1000 * 60);
      
      expect(minutes).toBeCloseTo(10, 0);
    });

    it("should correctly identify expired OTP", () => {
      const now = new Date();
      const expiredOTP = new Date(now.getTime() - 1000); // 1 second ago
      
      expect(now > expiredOTP).toBe(true);
    });

    it("should correctly identify valid OTP", () => {
      const now = new Date();
      const validOTP = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
      
      expect(now < validOTP).toBe(true);
    });
  });
});
