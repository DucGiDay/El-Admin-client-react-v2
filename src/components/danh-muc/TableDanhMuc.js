import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ButtonDelete from 'components/danh-muc/ButtonDelete';
import ButtonEdit from 'components/danh-muc/ButtonEdit';

const columns = [
  { id: 'stt', label: 'STT', minWidth: 70 },
  { id: 'id', label: 'ID', minWidth: 100 },
  {
    id: 'name',
    label: 'Mô tả chi tiết',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'slug',
    label: 'Slug',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'edit',
    label: 'Sửa',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'delete',
    label: 'Xóa',
    minWidth: 170,
    align: 'left',
  },
];

function createData({stt, name, id, slug, optionDanhMuc}) {
  return { stt, id, name, slug, edit: <ButtonEdit id = {id} danhMuc={ optionDanhMuc } />, delete: <ButtonDelete props={ id } danhMuc={ optionDanhMuc }/> };
}

export default function TableDanhMuc(props) {
  const listDanhMuc = props.props
  const optionDanhMuc = props.danhMuc
  const rows = listDanhMuc.map((danhMuc, index) => {
    return createData({stt: index+1, name: danhMuc.Name, slug: danhMuc.Slug, id: danhMuc.id, optionDanhMuc})
  })

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                if (!row.slug) {
                  row.slug = ' '
                }
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.stt}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
