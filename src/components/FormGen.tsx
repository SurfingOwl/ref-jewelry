import {FreeAutoComplete} from "@/components/FreeAutoComplete";
import {SelectGen} from "@/components/SelectGen";
import {DatePicker} from "@/components/DatePicker";
import {useContext, useMemo, useState} from "react";
import {Context, FormContext} from "@/app/context";
import {companies, companyLabel, typeLabel, types} from "@/models/constants";
import dayjs, {Dayjs} from "dayjs";
import {RefProduct} from "@/models/RefProduct";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {Product} from "@/models/Product";
import {NumberPicker} from "@/components/NumberPicker";


export const FormGen = () => {
  const [ref, setRef] = useState<RefProduct>({} as RefProduct);
  const [company, setCompany] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [date, setDate] = useState<Dayjs>(dayjs(Date.now()));
  const [count, setCount] = useState<number>(0);
  const [cachedProduct, setCachedProduct] = useState<Product[]>([]);

  const context = useContext(Context);
  const contextValue = useMemo(() => ({
    date, setDate, company, setCompany, type, setType, ref, setRef, count, setCount
  }), [date, company, type, ref, count])

  const resetForm = () => {
    setRef({} as RefProduct);
    setCompany('');
    setType('');
    setDate(dayjs(Date.now()));
  };

  const handleAdd = () => {
    const product = {
      name: ref.name,
      company: company,
      type: type,
      date: date.toDate(),
      count: count,
    } as Product;
    resetForm();

    setCachedProduct(cachedProduct.concat(product));
  };

  const handleSubmit = () => {
    //TODO inserer les donnees dans la dynamo/mongo/jsp
    console.log(cachedProduct);
  }

  return (
    <FormContext.Provider value={contextValue}>
      <Typography variant="h6" className="text-gray-700 font-bold mb-4">
        Ajouter une nouvelle référence :
      </Typography>
      {/*<Divider className="mb-4"/>*/}

      <Stack spacing={3}>
        <FreeAutoComplete options={context.refProducts}/>
        <SelectGen label={companyLabel} elements={companies} company={true}/>
        <SelectGen label={typeLabel} elements={types}/>
        <NumberPicker label={'Nombre de pièces'}/>
        <DatePicker/>
      </Stack>

      <Box className="flex justify-end gap-4 mt-6">
        <Button variant="outlined" onClick={handleAdd}>Ajouter à la liste</Button>
        <Button variant="contained" onClick={handleSubmit}>Valider les entrées</Button>
      </Box>

    </FormContext.Provider>
  );
};

