import { useFetch } from "@/hooks/useFetch";

// Define the structure of the data object
interface AnalyticsData {
  uniqueUser: number;
  totalClicks: number;
  uniqueClicks: number;
  totalUrl: number;
  clicksByDate: { _id: string; clicksByDate: number }[];
  osType: { _id: string; uniqueUser: number; uniqueClick: number }[];
  deviceType: { _id: string; uniqueUser: number; uniqueClick: number }[];
}

export default function AnalyticsAll() {
  const { data } = useFetch(); // Fetch data without typing here
  //@ts-ignore
  const typedData = data as AnalyticsData | null; // Type the fetched data

  if (typedData) {
    return (
      <div className="h-screen w-full overflow-y-auto ">
        <nav className="px-10 h-16 flex items-center w-full mb-10  border-b border-black">
          <h1 className="font-semibold">Get Analytic All</h1>
        </nav>
        <h1 className="text-2xl font-bold my-14  px-32">
          Analytics for total Urls
        </h1>
        <div className="container mx-auto ">
          <div className="flex flex-col xl:flex-row gap-5 w-full">
            <div className="w-full min-w-md">
              <div className="grid grid-cols-2 gap-10 justify-between ml-20 rounded-lg p-5 bg-white mr-28 shadow ">
                <SmallCard title="UniqueUser" number={typedData.uniqueUser} />
                <SmallCard
                  title="Total Clicks"
                  number={typedData.totalClicks}
                />
                <SmallCard
                  title="Total UniqueClicks"
                  number={typedData.uniqueClicks}
                />
                <SmallCard title="Total URL" number={typedData.totalUrl} />
              </div>
            </div>
            <div className="w-full mr-28 rounded-lg overflow-y-auto">
              <div className="date bg-white shadow-lg rounded-lg p-10 w-full h-full">
                <h2 className="text-xl mb-10 font-semibold ">Click By Date</h2>
                {typedData.clicksByDate.map((ele, index) => (
                  <div
                    key={index}
                    className="flex gap-5 justify-between px-5 py-3"
                  >
                    <span>{ele._id}</span>
                    <span>{ele.clicksByDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="more-card flex gap-5 w-full h-full min-h-72 p-10">
            <div className="os bg-gray-50 w-full h-full p-5 rounded-lg shadow">
              <h1 className="text-xl font-semibold">OS TYPE</h1>
              <div className="mt-5 flex flex-col gap-2">
                {typedData.osType.map((ele, index) => (
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
                {typedData.deviceType.map((ele, index) => (
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
      </div>
    );
  }

  return null; // or a loading state if data is not available
}

function SmallCard({ title, number }: { title: string; number: number }) {
  return (
    <div className="card p-7 rounded-md max-w-xs text-center">
      <h1 className="text-md  mb-5">{title}</h1>
      <h3 className="text-4xl">{number}</h3>
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
