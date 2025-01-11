import {useContext} from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FormContext} from "@/app/context";

export const DatePicker = () => {
  const {date, setDate} = useContext(FormContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Selectionner une date"
        value={date}
        viewRenderers={{
          hours: null,
          minutes: null,
          seconds: null,
        }}
        onChange={(newValue) => setDate(newValue!)}
      />
    </LocalizationProvider>
  );
}