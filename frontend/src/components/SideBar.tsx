import { useStore } from "@/hooks/AuthStore";
import { Button } from "./ui/button";

export default function SideBar() {
  const { user } = useStore();
  return (
    <section className="h-screen w-[250px] bg-gray-100 py-10 px-5 flex flex-col">
      <div className="body">
        <h1 className="text-2xl text-center font-semibold mb-16">
          URL Shortner
        </h1>
        <h3 className="text-xs text-gray-600 mb-5 ml-4">Userfull Links</h3>
        <ul className="flex flex-col  text-sm">
          <li className="w-full p-2 px-4 rounded-md hover:bg-gray-300 transition-all duration-100 ">
            <a href="/analytics/analyticsall">GetAllAnalytics</a>
          </li>
          <li className="w-full p-2 px-4 rounded-md hover:bg-gray-300 transition-all duration-100 ">
            <a href="/analytics/analyticsbytopic">GetAllAnalyticsByTopic</a>
          </li>
          <li className="w-full p-2 px-4 rounded-md hover:bg-gray-300 transition-all duration-100 ">
            <a href="/analytics/analyticsbyid">GetAllAnalyticsById</a>
          </li>
        </ul>
      </div>
      <div className="last mt-auto flex flex-col  justify-start gap-5 pl-4">
        <div className="flex gap-3 items-center justify-start">
          <img
            src={user?.avatar}
            alt="Profile"
            className="size-10 rounded-full"
          />
          <h3 className="text-xl">{user?.name}</h3>
        </div>
        <Button type="button">Logout</Button>
      </div>
    </section>
  );
}
