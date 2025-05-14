import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePickerProps} from "@/models/types";

export const DatePicker = ({date, label, setDate}: DatePickerProps) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
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