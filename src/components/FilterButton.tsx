import {Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Popover, Tooltip} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import React, {MouseEvent, useContext, useEffect, useState} from "react";
import {Context} from "@/app/context";
import {companies, types} from "@/models/constants";
import {products} from "@/models/mockrefs";

export const FilterButton = () => {
  // const {products, setFilteredProducts} = useContext(Context);
  const {setFilteredProducts} = useContext(Context);

  const [filters, setFilters] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheck = (filter: string) => {
    if (filters.some(f => f === filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters([...filters, filter])
    }
  };

  useEffect(() => {
    if (filters.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          filters.some(filter => product.type === filter)
          || filters.some(filter => product.company === filter)));
    } else {
      setFilteredProducts(products);
    }
  }, [filters]);

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
                                control={<Checkbox onClick={() => handleCheck(company)} key={`checkbox-${company}`}/>}>
              </FormControlLabel>
            ))}
          </FormGroup>
          <Divider orientation="vertical" flexItem/>
          <FormGroup>
            {types.map(type => (
              <FormControlLabel key={`label-${type}`}
                                label={type}
                                control={<Checkbox onClick={() => handleCheck(type)} key={`checkbox-${type}`}/>}>
              </FormControlLabel>
            ))}
          </FormGroup>
        </div>
      </Popover>
    </>
  );
}