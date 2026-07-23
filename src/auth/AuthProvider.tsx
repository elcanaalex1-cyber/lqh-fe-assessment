import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./auth-context";

const AUTH_STORAGE_KEY = "lendsqr:auth-session";

function hasStoredSession() {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "authenticated";
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasStoredSession);

  const signIn = useCallback(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    localStorage.setItem(AUTH_STORAGE_KEY, "authenticated");
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, signIn, signOut }),
    [isAuthenticated, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
