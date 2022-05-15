import {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import * as usersApi from "../api/users";
import * as api from "../api";
import config from "../config.json";
import { Buffer } from "buffer";

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

//Context die alles in verband met authenticatie beheert
//In-/uitloggen, tokens aanmaken, rollen checken, ...

function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split(".")[1];
  const payload = Buffer.from(base64Url, "base64");
  const jsonPayload = payload.toString("ascii");
  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== "number") exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
}

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { token, user, ready, loading, error, hasRole, setError } = useAuth();
  return {
    token,
    user,
    ready,
    error,
    loading,
    isAuthed: Boolean(token),
    hasRole,
    setError,
  };
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

//eid
export const useLoginE_id = () => {
  const { loginE_id } = useAuth();
  return loginE_id;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

export const AuthProvider = ({ children }) => {
  // will be false until the token is set
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isE_id, setIsE_id] = useState(false);

  const setSession = useCallback(async (token, user) => {
    const { exp, userId } = parseJwt(token);
    if (parseJwt(token).IDNUMBER) {
      setIsE_id(true);
    }
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }

    api.setAuthToken(token);
    setToken(token);
    setReady(token && stillValid);

    if (!user && stillValid) {
      if (!isE_id) {
        user = await usersApi.getUserByIdNumber(isE_id);
      } else {
        user = await usersApi.getUserById(userId);
      }
    }
    setUser(user);
  }, []);

  useEffect(() => {
    setSession(token);
  }, [token, setSession]);

  const login = useCallback(
    async (username, password) => {
      try {
        setLoading(true);
        setError("");
        const { token, user } = await usersApi.login(username, password);
        await setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        setError("Inloggen mislukt, probeert u het later opnieuw");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setSession]
  );

  //eid
  const loginE_id = useCallback(
    async (idnumber, password) => {
      try {
        setLoading(true);
        setError("");
        const { token, user } = await usersApi.loginE_id(idnumber, password);
        await setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        setError("Inloggen mislukt, probeert u het later opnieuw");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setSession]
  );

  const logout = useCallback(() => {
    setSession(null, null);
  }, [setSession]);

  const hasRole = useCallback(
    (role) => {
      if (!user) return false;
      return user.ROLES.includes(role);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      token,
      user,
      ready,
      loading,
      error,
      login,
      loginE_id,
      logout,
      hasRole,
      setError,
    }),
    [
      token,
      user,
      ready,
      loading,
      error,
      login,
      loginE_id,
      logout,
      hasRole,
      setError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
