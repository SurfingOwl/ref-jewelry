import {ChangeEvent, useContext} from "react";
import {FormContext} from "@/app/context";
import {TextField} from "@mui/material";
import {NumberPickerProps} from "@/models/types";

export const NumberPicker = ({label}: NumberPickerProps) => {
  const {count, setCount} = useContext(FormContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(+e.target.value);
  }

  return (
    <TextField
      type="number"
      label={label}
      value={count}
      onChange={onChange}
      fullWidth
      margin="normal"
    />
  );
};