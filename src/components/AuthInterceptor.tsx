import { AuthInterceptorProps } from "@/models/types";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export const AuthInterceptor = ({ children }: AuthInterceptorProps) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status])

  return (children);
}