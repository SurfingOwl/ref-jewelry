import {InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useContext} from "react";
import {FormContext} from "@/app/context";

type SelectProps = {
  label: string;
  elements: string[];
  company?: boolean;
}

export const SelectGen = ({label, elements, company}: SelectProps) => {

  const context = useContext(FormContext);

  const onChange = (e: SelectChangeEvent) => {
    if (company) context.setCompany(e.target.value);
    else context.setType(e.target.value);
  }

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={company ? context.company : context.type} onChange={onChange}>
        {elements.map((el: string, index: number) => (
          <MenuItem key={index} value={el}>{el}</MenuItem>
        ))}
      </Select>
    </>
  );
}