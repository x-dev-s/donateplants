'use server';
import { jwtVerify } from "jose";

export async function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    console.log(secret)
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token) {
  try {
    const { payload } = await jwtVerify(token, await getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}