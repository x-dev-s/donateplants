"use client" ;
import React from "react";
import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/utils/auth";

export function useAuth() {
  const [auth, setAuth] = React.useState(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("session") ?? null;
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);
    return verifiedToken;
  };
  React.useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}