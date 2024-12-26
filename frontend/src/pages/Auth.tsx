import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router";
export default function Auth() {
  const navigate = useNavigate();
  const handleLogin = () => {
    window.location.href = "http://localhost:6969/auth/google";
  };
  return <Button onClick={handleLogin}>Click here</Button>;
}
