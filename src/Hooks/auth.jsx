import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../Services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password }),
        { user, token } = response.data;

      localStorage.setItem("@notes:user", JSON.stringify(user));
      localStorage.setItem("@notes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@notes:user");
    localStorage.removeItem("@notes:token");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    if (avatar) {
      const fileUpdateForm = new FormData();
      fileUpdateForm.append("avatar", avatarFile);

      const response = await api.patch("/users/avatar", fileUpdateForm);
      user.avatar = response.data.avatar;
    }

    try {
      await api.put("/users", user);
      localStorage.setItem("@notes:user", JSON.stringify(user));

      setData({ user, token: data.token });

      alert("Perfil atualizado!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@notes:token"),
      user = localStorage.getItem("@notes:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user: JSON.parse(user), token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user: data.user, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthProvider, useAuth };
