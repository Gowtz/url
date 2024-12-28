export default function Home() {
  return (
    <>
      <div className="container w-full h-screen mx-auto  flex items-center justify-center flex-col gap-20">
        <h1 className="text-5xl font-semibold tracking-tighter animate-bounce">
          This is an Home Page
        </h1>

        <div className="button flex gap-5">
          <a
            href="/analytics"
            className="px-2 py-1.5 rounded-md bg-black text-white"
          >
            {" "}
            Go to Analytics
          </a>
          <a
            href="/create"
            className="px-2 py-1.5 rounded-md bg-black text-white"
          >
            {" "}
            Create URL
          </a>
        </div>
      </div>
    </>
  );
}
