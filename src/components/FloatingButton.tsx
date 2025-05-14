import {Box, Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useContext} from "react";
import {Context} from "@/app/context";

export const FloatingButton = () => {
  const {setOpen} = useContext(Context);
  const open = () => setOpen(true);

  return (
    <Box sx={{'& > :not(style)': {m: 1}}} className="fixed bottom-24 right-4">
      <Fab color="primary" aria-label="add" onClick={open}>
        <AddIcon/>
      </Fab>
    </Box>
  );
}