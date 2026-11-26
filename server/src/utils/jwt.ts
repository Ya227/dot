import jwt, { SignOptions } from "jsonwebtoken";

export interface TokenUser {
  id: string;
  email: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 bytes");
  }
  return secret;
};

export const assertJwtConfiguration = (): void => {
  createAccessToken({ id: "configuration-check", email: "configuration-check@example.invalid" });
};

export const createAccessToken = (user: TokenUser): string => {
  const expiresIn = (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"];
  return jwt.sign({ email: user.email }, getJwtSecret(), {
    algorithm: "HS256",
    subject: user.id,
    expiresIn,
  });
};

export const verifyAccessToken = (token: string): TokenUser => {
  const payload = jwt.verify(token, getJwtSecret(), { algorithms: ["HS256"] });
  if (typeof payload === "string") {
    throw new jwt.JsonWebTokenError("Invalid token payload");
  }
  const claims = payload;
  if (typeof claims.sub !== "string" || typeof claims.email !== "string") {
    throw new jwt.JsonWebTokenError("Invalid token payload");
  }

  return {
    id: claims.sub,
    email: claims.email,
  };
};
