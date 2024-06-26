'use server'
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
  if (payload.mobile) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key)
  }
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key)
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"]
  })
  return payload
}

export async function login(user, mobile = false) {
  // Verify credentials && get the user

//   const user = { email: formData.get("email"), name: "John" }

  // Create the session
  let expires = new Date(Date.now() + 7200 * 1000)
  if (mobile) {
    expires = new Date(Date.now() + 2592000 * 1000)
  }
  console.log(user, expires)
  const session = await encrypt({ user, expires, mobile })
  // Save the session in a cookie
  return { session, expires }
}

export async function logout() {
  // Destroy the session
  await cookies().set("session", "", { expires: new Date(0) })
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session) 
}

export async function updateSession(request) {
  const session = await getSession()
  if (!session) return NextResponse.next()
  parsed.expires = new Date(Date.now() + 7200 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    expires: parsed.expires
  })
  return res
}
