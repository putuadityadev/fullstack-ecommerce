import AuthCard from "../components/AuthCard";
import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <AuthCard
        isLogin = {isLogin}
        onClick = {() => !isLogin ? setIsLogin(true) : setIsLogin(false)}
      />
    </div>
  )
}

export default Auth;