import {Product} from "@/models/Product";
import {MouseEvent, useMemo, useState} from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import {getComparator} from "@/components/DataTable.utils";
import {products} from "@/models/mockrefs";

export type Order = 'asc' | 'desc';

type HeadCell = {
  id: keyof Product;
  label: string;
  numeric: boolean;
}

type EnhancedTableProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Product) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Référence produit',
  },
  {
    id: 'company',
    numeric: false,
    label: 'Maison',
  },
  {
    id: 'count',
    numeric: false,
    label: 'Nombre de pièces',
  },
  {
    id: 'receptionDate',
    numeric: false,
    label: 'Date de réception',
  },
  {
    id: 'deliveryDate',
    numeric: false,
    label: 'Date de livraison',
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {order, orderBy, onRequestSort} =
    props;
  const createSortHandler =
    (property: keyof Product) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id}
                     align="left"
                     padding={"none"}
                     sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const DataTable = () => {
  // const {products} = useContext(Context);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Product,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...products]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.company}</TableCell>
                    <TableCell align="left">{row.count}</TableCell>
                    <TableCell align="left">{row.receptionDate.toLocaleDateString()}</TableCell>
                    <TableCell align="left">{row.deliveryDate.toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};