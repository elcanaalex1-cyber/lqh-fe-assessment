import { type FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import signInArt from "@/assets/images/pablo-sign-in 1.png";
import { useAuth } from "@/auth/auth-context";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password)
      return setError("Enter your email and password to continue.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("Enter a valid email address.");
    setLoading(true);
    try {
      await signIn();
      const destination =
        (location.state as { from?: { pathname?: string } } | null)?.from
          ?.pathname ?? "/users";
      navigate(destination, { replace: true });
    } catch {
      setError("Unable to sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="login-grid min-h-screen bg-white font-avenir">
      <section className="relative hidden min-h-screen px-[6.8vw] pt-[10vh] lg:block">
        <Logo />
        <img
          src={signInArt}
          alt=""
          className="absolute left-[8%] top-[36%] w-[88%] max-w-[600px]"
        />
      </section>
      <section className="flex min-h-screen items-center justify-center px-6 shadow-[-10px_0_30px_rgba(0,0,0,.025)] sm:px-12">
        <div className="w-full max-w-[447px]">
          <div className="mb-16 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-[40px] font-bold tracking-[-1px] text-brand-navy">
            Welcome!
          </h1>
          <p className="mt-1 text-base text-brand-muted">
            Enter details to login
          </p>
          <form onSubmit={submit} className="mt-14 space-y-6" noValidate>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="Email"
              aria-label="Email"
              disabled={loading}
              className="h-[52px] px-4"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Password"
                aria-label="Password"
                disabled={loading}
                className="h-[52px] px-4 pr-20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-semibold tracking-widest text-brand-aqua"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                setError("Password recovery is unavailable in this demo.")
              }
              className="text-xs font-semibold tracking-widest text-brand-aqua hover:underline mb-3"
            >
              FORGOT PASSWORD?
            </button>
            {error && (
              <p role="alert" className="text-sm text-rose-500">
                {error}
              </p>
            )}
            <Button
              type="submit" disabled={loading}
              className="h-[50px] w-full rounded-lg tracking-[1.5px]"
            >
              {loading ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />LOGGING IN…</span> : "LOG IN"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
