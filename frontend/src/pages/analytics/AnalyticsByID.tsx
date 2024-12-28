import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchTopic } from "@/hooks/useFetchID";
import { useState } from "react";

// Define the shape of data
interface TopicData {
  uniqueUser: number;
  totalClicks: number;
  uniqueClicks: number;
  clicksByDate: { _id: string; clicksByDate: number }[];
  osType: { _id: string; uniqueUser: number; uniqueClick: number }[];
  deviceType: { _id: string; uniqueUser: number; uniqueClick: number }[];
}

export default function AnalyticsByTopic() {
  const [input, setInput] = useState<string>("");
  const { topicData } = useFetchTopic(input); // Assuming this returns an array or null
  const [data, setData] = useState<TopicData | null>(null); // Correct type for data

  function handle_submit() {
    if (topicData) {
      setData(topicData[0]); // Assuming topicData is an array and we select the first item
    }
  }

  return (
    <div className="h-screen w-full overflow-y-auto ">
      <nav className="px-10 h-16 flex items-center w-full mb-10  border-b border-black">
        <h1 className="font-semibold">Get Analytic All</h1>
      </nav>
      <h1 className="text-2xl font-bold my-14  px-32">Analytics for ID </h1>
      <div className="input w-full max-w-xs flex gap-5 ml-10 my-5">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <Button type="button" onClick={handle_submit}>
          Search
        </Button>
      </div>
      {data && (
        <div className="container mx-auto ">
          <div className="flex flex-col xl:flex-row gap-5 w-full">
            <div className="w-full min-w-md">
              <div className="grid grid-cols-2 gap-10 justify-between ml-20 rounded-lg p-5 bg-white mr-28 shadow ">
                <SmallCard title="UniqueUser" number={data.uniqueUser} />
                <SmallCard title="Total Clicks" number={data.totalClicks} />
                <SmallCard
                  title="Total UniqueClicks"
                  number={data.uniqueClicks}
                />
              </div>
            </div>
          </div>
          <div className="more-card flex gap-5 w-full h-full min-h-72 p-10">
            <div className="os bg-gray-50 w-full h-full p-5 rounded-lg shadow">
              <h1 className="text-xl font-semibold">OS TYPE</h1>
              <div className="mt-5 flex flex-col gap-2">
                {data.osType.map((ele, index) => (
                  <OsBox
                    key={index}
                    os={ele._id}
                    user={ele.uniqueUser}
                    click={ele.uniqueClick}
                  />
                ))}
              </div>
            </div>
            <div className="device bg-gray-50 w-full h-full p-5 rounded-lg shadow">
              <h1 className="text-xl font-semibold">Device TYPE</h1>
              <div className="mt-5 flex flex-col gap-2">
                {data.deviceType.map((ele, index) => (
                  <DeviceBox
                    key={index}
                    device={ele._id}
                    user={ele.uniqueUser}
                    click={ele.uniqueClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SmallCard({ title, number }: { title: string; number: number }) {
  return (
    <div className="card p-7 rounded-md max-w-xs text-center">
      <h1 className="text-xl mb-5">{title}</h1>
      <h3 className="text-5xl">{number}</h3>
    </div>
  );
}

function OsBox({
  os,
  user,
  click,
}: {
  os: string;
  user: number;
  click: number;
}) {
  return (
    <div className="p-3 rounded-md bg-gray-200">
      <h2 className="font-semibold">{os}</h2>
      <h2 className="text-xs">Unique User: {user}</h2>
      <h2 className="text-xs">Unique Click: {click}</h2>
    </div>
  );
}

function DeviceBox({
  device,
  user,
  click,
}: {
  device: string;
  user: number;
  click: number;
}) {
  return (
    <div className="p-3 rounded-md bg-gray-200">
      <h2 className="font-semibold">{device}</h2>
      <h2 className="text-xs">Unique User: {user}</h2>
      <h2 className="text-xs">Unique Click: {click}</h2>
    </div>
  );
}
