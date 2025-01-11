import {useContext} from "react";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {RefProduct} from "@/models/RefProduct";
import {FormContext} from "@/app/context";

type FreeAutoCompleteProps = {
  options: RefProduct[];
};


export const FreeAutoComplete = ({options}: FreeAutoCompleteProps) => {

  const filter = createFilterOptions<RefProduct>();
  const {ref, setRef} = useContext(FormContext);

  return (
    <Autocomplete value={ref}
                  onChange={(e, newValue) => {
                    if (typeof newValue === "string") {
                      setRef({name: newValue});
                    } else if (newValue && newValue.inputValue) {
                      setRef({name: newValue.name})
                    } else {
                      setRef(newValue!);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const {inputValue} = params;
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: inputValue,
                      });
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={options}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option?.name ?? '';
                  }}
                  renderOption={(props, option) => {
                    const {key, ...optionProps} = props;
                    return (
                      <li key={key} {...optionProps}>
                        {option.name}
                      </li>
                    );
                  }}
                  sx={{width: 300}}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="Référence"/>
                  )}/>
  );
}