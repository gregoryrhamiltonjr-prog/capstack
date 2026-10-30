/** Read only configuration presence, never return or log secret values. */
type AuthenticationEnvironment = Readonly<Record<string, string | undefined>>;

export function isAuthenticationConfigured(env: AuthenticationEnvironment = process.env): boolean {
  return Boolean(env.DATABASE_URL?.trim() && (env.AUTH_SECRET?.trim() || env.NEXTAUTH_SECRET?.trim()));
}

export function authenticationUnavailableResponse(): Response {
  return Response.json(
    { error: "Sign-in is temporarily unavailable in this environment." },
    { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "300" } }
  );
}
