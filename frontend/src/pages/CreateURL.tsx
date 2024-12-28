import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useRef } from "react";
import axios from "axios";
import { BACK_URL } from "@/lib/utils";
import { useNavigate } from "react-router";

export default function CreateURL() {
  const longurl = useRef<HTMLInputElement | null>(null);
  const alias = useRef<HTMLInputElement | null>(null);
  const topic = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${BACK_URL}/api/shorten`,
        {
          longUrl: longurl.current?.value,
          alias: alias.current?.value,
          topic: topic.current?.value,
        },
        { withCredentials: true },
      )
      .then(() => navigate("/"));
  };
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
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
        </form>
      </Card>
    </main>
  );
}
