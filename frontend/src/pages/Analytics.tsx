import SideBar from "@/components/SideBar";
import { useStore } from "@/hooks/AuthStore";
import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function Analytics() {
  const { user } = useStore();
  const navigate = useNavigate();
  const routes = useLocation();

  useLayoutEffect(() => {
    if (!user?.name) {
      navigate("/");
    } else if (
      routes.pathname === "/analytics" ||
      routes.pathname === "/analytics/"
    ) {
      console.log(routes.pathname);
      navigate("/analytics/analyticsall");
    }
  }, [user, routes.pathname, navigate]);

  return (
    <div className="w-full h-screen overflow-hidden flex">
      <div className="w-[250px]">
        <SideBar />
      </div>
      <div className="w-full h-screen p-5 bg-slate-50">
        <Outlet />
      </div>
    </div>
  );
}
