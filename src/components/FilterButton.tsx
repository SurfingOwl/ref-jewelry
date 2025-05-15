import {Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Popover, Tooltip} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import React, {MouseEvent, useContext, useEffect, useState} from "react";
import {Context} from "@/app/context";
import {companies, types} from "@/models/constants";
import {products} from "@/models/mockrefs";

// TODO implement multiple filters for different possible ways to filter to insure intersect works correctly + add date range filter
// TODO see https://echarts.apache.org/ to implement data visualisation
export const FilterButton = () => {
  // const {products, setFilteredProducts} = useContext(Context);
  const {setFilteredProducts} = useContext(Context);

  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [companyFilters, setCompanyFilters] = useState<string[]>([]);
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

    if (isTypeFiltersNotEmpty || isCompanyFiltersNotEmpty) {
      setFilteredProducts(
        products.filter((product) => {
          if (isTypeFiltersNotEmpty && !typeFilters.some(filter => product.type === filter)) return false;
          if (isCompanyFiltersNotEmpty && !companyFilters.some(filter => product.company === filter)) return false;
          return true;
        }));
    } else {
      setFilteredProducts(products);
    }
  }, [typeFilters, companyFilters]);

  return (
    <>
      <Tooltip title="Filtrer les produits">
        <IconButton onClick={handleClick} aria-describedby={'simple-popover'}>
          <FilterListIcon/>
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
                                                   key={`checkbox-${company}`}/>}>
              </FormControlLabel>
            ))}
          </FormGroup>
          <Divider orientation="vertical" flexItem/>
          <FormGroup>
            {types.map(type => (
              <FormControlLabel key={`label-${type}`}
                                label={type}
                                control={<Checkbox onClick={() => handleTypeCheck(type)} key={`checkbox-${type}`}/>}>
              </FormControlLabel>
            ))}
          </FormGroup>
          <Divider orientation="vertical" flexItem/>
        </div>
      </Popover>
    </>
  );
}