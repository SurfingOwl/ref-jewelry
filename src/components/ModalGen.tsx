import {useContext} from "react";
import {Context} from "@/app/context";
import {Box, Modal, Typography} from "@mui/material";
import {FormGen} from "@/components/FormGen";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalGen = () => {
  const {open, setOpen} = useContext(Context);

  return (
    <Modal open={open}
           onClose={() => setOpen(false)}
           aria-labelledby="form-modal-title"
           aria-describedby="form-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" className="border-b pb-2 mb-4 text-lg font-bold">Entrer des références</Typography>
        <FormGen/>
      </Box>
    </Modal>
  );
}