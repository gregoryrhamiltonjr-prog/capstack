import { oauthSignInAction } from "@/lib/actions";
import { oauthProvidersEnabled } from "@/auth";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.7S6.9 21 12 21c5.2 0 8.6-3.6 8.6-8.7 0-.6-.1-1-.2-1.5H12z" />
      <path fill="#34A853" d="M3.9 14.7l3.2-2.3C7.8 15.2 9.7 16.5 12 16.5c1.3 0 2.5-.4 3.4-1.2l3.2 2.5C17 19.4 14.7 20.6 12 20.6c-3.5 0-6.5-2.1-8.1-5.2z" opacity=".9" />
      <path fill="#4285F4" d="M20.6 12.4c0-.5-.1-.9-.2-1.3H12v3.1h4.9c-.2 1.1-.9 2.1-1.9 2.7v.1l3.2 2.5c1.9-1.7 3-4.3 2.4-7.1z" opacity=".9" />
      <path fill="#FBBC05" d="M7.1 12.4c0-.7.1-1.3.3-1.9L4.2 8.2C3.5 9.5 3.1 10.9 3.1 12.4c0 1.5.4 2.9 1.1 4.2l3.2-2.3c-.2-.6-.3-1.2-.3-1.9z" opacity=".9" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.4 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8s-1.6-.7-2.7-.7c-1.4 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.6 2 1 0 1.5-.7 2.7-.7s1.6.7 2.7.7 1.8-1 2.5-1.9c.8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.3-3.2zM14.6 6.5c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 1.9-.5 2.5-1.2z" />
    </svg>
  );
}

export function AuthProviders({ mode = "login" }: { mode?: "login" | "signup" }) {
  const enabled = oauthProvidersEnabled();
  const any = enabled.google || enabled.apple;

  return (
    <div className="space-y-3">
      {any && (
        <>
          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface px-2 text-ink-faint">or continue with</span>
            </div>
          </div>
          <div className="grid gap-2">
            {enabled.google && (
              <form action={oauthSignInAction}>
                <input type="hidden" name="provider" value="google" />
                <button type="submit" className="btn-ghost flex w-full items-center justify-center gap-2 py-2.5 text-sm">
                  <GoogleIcon />
                  {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
                </button>
              </form>
            )}
            {enabled.apple && (
              <form action={oauthSignInAction}>
                <input type="hidden" name="provider" value="apple" />
                <button type="submit" className="btn-ghost flex w-full items-center justify-center gap-2 py-2.5 text-sm">
                  <AppleIcon />
                  {mode === "signup" ? "Sign up with Apple" : "Continue with Apple"}
                </button>
              </form>
            )}
          </div>
        </>
      )}
      {!any && (
        <p className="rounded-lg border border-line bg-canvas px-3 py-2 text-center text-[11px] text-ink-faint">
          Google &amp; Apple sign-in activate when OAuth keys are configured on the server.
        </p>
      )}
    </div>
  );
}
