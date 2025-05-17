import { Login } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export const SignInButton = () => {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn();
  }

  const handleSignOut = () => {
    signOut();
  }

  if (session) {
    return (
      <div className="flex flex-row w-full justify-end">
      <Typography variant="h6" className="text-gray-700 font-bold mb-4">Bienvenue, {session.user?.name}</Typography>
        <IconButton onClick={handleSignOut} >
          <Login />
        </IconButton>

      </div>
    );
  }

  return (
    <IconButton onClick={handleSignIn}>
      <Login />
    </IconButton>
  );
}