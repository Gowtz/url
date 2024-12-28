import { Navigate, Outlet } from "react-router";
import { useStore } from "./AuthStore";
import { useLayoutEffect } from "react";
import axios from "axios";
import { BACK_URL } from "@/lib/utils";
export const ProtectedRoute = () => {
  const { user, setUser } = useStore();
  useLayoutEffect(() => {
    const getSession = () => {
      axios
        .get(`${BACK_URL}/getsession`, { withCredentials: true })
        .then((res) =>
          setUser({ name: res.data.user?.name, avatar: res.data.user?.avatar }),
        )
        .catch(() => setUser(null));
    };
    getSession();
  }, [setUser]);

  return user?.name ? <Outlet /> : <Navigate to="/auth" />;
};
