import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {CSSProperties, useContext} from "react";
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

  const placeHolderGen = (): CSSProperties | undefined => {
    if (context.company == '' || context.type == '') return {color: 'grey'} as CSSProperties;
    return undefined;
  }

  return (
    <Select defaultValue={''} value={company ? context.company : context.type}
            onChange={onChange} variant="outlined" displayEmpty
            style={placeHolderGen()}>
      <MenuItem value={''} style={{color: "grey"}}>{label}</MenuItem>
      {elements.map((el: string, index: number) => (
        <MenuItem key={index} value={el}>{el}</MenuItem>
      ))}
    </Select>
  );
}