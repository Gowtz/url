import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import axios from "axios";

export default function CreateURL() {
  const longurl = useRef(null);
  const alias = useRef(null);
  const topic = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    const response = axios
      .post(
        "http://localhost:6969/api/shorten",
        {
          longUrl: longurl.current?.value,
          alias: alias.current?.value,
          topic: topic.current?.value,
        },
        { withCredentials: true },
      )
      .then((res) => console.log(res));
    // console.log({
    //   longUrl: longurl.current?.value,
    //   alias: alias.current?.value,
    //   topic: topic.current?.value,
    // });
  };
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create short Url</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>LongUrl</Label>
            <Input className="my-2" type="text" ref={longurl} />
            <Label>Alias</Label>
            <Input className="my-2" type="text" ref={alias} />
            <Label>Topic</Label>
            <Input className="my-2" type="text" ref={topic} />
            <Button type="submit">Submit</Button>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
