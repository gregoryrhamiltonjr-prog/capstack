import type { NextRequest } from "next/server";
import { handlers } from "@/auth";
import { authenticationUnavailableResponse, isAuthenticationConfigured } from "@/lib/auth-configuration";

export async function GET(request: NextRequest) {
  if (!isAuthenticationConfigured()) return authenticationUnavailableResponse();
  return handlers.GET(request);
}

export async function POST(request: NextRequest) {
  if (!isAuthenticationConfigured()) return authenticationUnavailableResponse();
  return handlers.POST(request);
}
