import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {StateSetter} from "@/app/types";

type DatePickerProps = {
  date: Dayjs;
  label: string;
  setDate: StateSetter<Dayjs>;
}

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