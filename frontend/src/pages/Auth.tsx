import { Button } from "@/components/ui/button";
export default function Auth() {
  const handleLogin = () => {
    window.location.href = "http://localhost:6969/auth/google";
  };
  return <Button onClick={handleLogin}>Click here</Button>;
}
