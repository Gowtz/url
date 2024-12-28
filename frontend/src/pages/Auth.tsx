import { Button } from "@/components/ui/button";
import google from "/google.svg";
import { BACK_URL } from "@/lib/utils";
export default function Auth() {
  const handleLogin = () => {
    window.location.href = `${BACK_URL}/auth/google`;
  };
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Button onClick={handleLogin} size={"lg"} className="px-5 py-2">
          Sign In with Google <img src={google} alt="google" width={30} />{" "}
        </Button>
      </div>
    </>
  );
}
