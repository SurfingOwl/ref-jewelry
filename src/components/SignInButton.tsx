import {IconButton} from "@mui/material";
import {Login} from "@mui/icons-material";

export const SignInButton = () => {

  return (
    <IconButton /*onClick={signIn}*/>
      <Login/>
    </IconButton>
  );
}