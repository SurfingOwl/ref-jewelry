import { Context } from "@/app/context";
import { DatePicker } from "@/components/DatePicker";
import { isInDeliveryRange, isInReceptionRange } from "@/components/utils";
import { companies, types } from "@/models/constants";
import { products } from "@/models/mockrefs";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { MouseEvent, useContext, useEffect, useState } from "react";

// TODO see https://echarts.apache.org/ to implement data visualisation
export const FilterButton = () => {
  // const {products, setFilteredProducts} = useContext(Context);
  const { setFilteredProducts } = useContext(Context);

  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [companyFilters, setCompanyFilters] = useState<string[]>([]);
  const [receptionFrom, setReceptionFrom] = useState<Dayjs | null>(null);
  const [receptionTo, setReceptionTo] = useState<Dayjs | null>(null);
  const [deliveryFrom, setDeliveryFrom] = useState<Dayjs | null>(null);
  const [deliveryTo, setDeliveryTo] = useState<Dayjs | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeCheck = (filter: string) => {
    if (typeFilters.some(f => f === filter)) {
      setTypeFilters(typeFilters.filter(f => f !== filter));
    } else {
      setTypeFilters([...typeFilters, filter])
    }
  };

  const handleCompanyCheck = (filter: string) => {
    if (companyFilters.some(f => f === filter)) {
      setCompanyFilters(companyFilters.filter(f => f !== filter));
    } else {
      setCompanyFilters([...companyFilters, filter])
    }
  };

  useEffect(() => {
    const isTypeFiltersNotEmpty = typeFilters.length > 0;
    const isCompanyFiltersNotEmpty = companyFilters.length > 0;

    if (isTypeFiltersNotEmpty || isCompanyFiltersNotEmpty || receptionFrom || receptionTo || deliveryFrom || deliveryTo) {
      setFilteredProducts(
        products.filter((product) => {
          if (isTypeFiltersNotEmpty && !typeFilters.some(filter => product.type === filter)) return false;
          if (isCompanyFiltersNotEmpty && !companyFilters.some(filter => product.company === filter)) return false;
          if (!isInReceptionRange(receptionTo, receptionFrom, product.receptionDate)) return false;
          if (!isInDeliveryRange(deliveryTo, deliveryFrom, product.deliveryDate)) return false;
          return true;
        }));
    } else {
      setFilteredProducts(products);
    }
  }, [typeFilters, companyFilters, receptionFrom, receptionTo, deliveryFrom, deliveryTo]);

  return (
    <>
      <Tooltip title="Filtrer les produits">
        <IconButton onClick={handleClick} aria-describedby={'simple-popover'}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id='simple-popover'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div className={'flex w-full flex-row gap-4 m-2 p-2'}>
          <FormGroup>
            {companies.map(company => (
              <FormControlLabel key={`label-${company}`}
                label={company}
                control={<Checkbox onClick={() => handleCompanyCheck(company)}
                  key={`checkbox-${company}`} />}>
              </FormControlLabel>
            ))}
          </FormGroup>
          <Divider orientation="vertical" flexItem />
          <FormGroup>
            {types.map(type => (
              <FormControlLabel key={`label-${type}`}
                label={type}
                control={<Checkbox onClick={() => handleTypeCheck(type)} key={`checkbox-${type}`} />}>
              </FormControlLabel>
            ))}
          </FormGroup>
          <Divider orientation="vertical" flexItem />
          <div className={'flex flex-col gap-3'}>
            <Typography variant="h6" className="text-gray-700 font-bold mb-4">
              Date réception
            </Typography>
            <DatePicker label={'Du'} date={receptionFrom} setDate={setReceptionFrom} />
            <DatePicker label={'Au'} date={receptionTo} setDate={setReceptionTo} />
            <Divider orientation="horizontal" flexItem />
            <Typography variant="h6" className="text-gray-700 font-bold mb-4">
              Date livraison
            </Typography>
            <DatePicker label={'Du'} date={deliveryFrom} setDate={setDeliveryFrom} />
            <DatePicker label={'Au'} date={deliveryTo} setDate={setDeliveryTo} />
          </div>
        </div>
      </Popover>
    </>
  );
}