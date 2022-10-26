import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ButtonEdit from '../app/cau-hoi/ButtonEdit'
import ButtonDelete from '../app/cau-hoi/ButtonDelete'
import ButtonChiTiet from '../app/cau-hoi/ButtonChiTiet';

const columns = [
    { id: 'stt', label: 'STT', minWidth: 50 },
    { id: 'id', label: 'ID', minWidth: 100 },
    {
        id: 'date',
        label: 'Date',
        minWidth: 110,
        align: 'left',
    },
    {
        id: 'content_Question',
        label: 'Câu Hỏi',
        minWidth: 250,
        align: 'left',
    },
    {
        id: 'don_kep',
        label: 'Đơn kép',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'level',
        label: 'Level',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'chi_tiet',
        label: 'Chi tiết',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'edit',
        label: 'Sửa',
        minWidth: 70,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 70,
        align: 'left',
    },
];

const api = "http://localhost:4000/api/cau-hoi/"

function createData({ stt, id, date, don_kep, level, content_Question, option_ans, true_ans, sub_question }) {
    let sub_questions = []
    for (var key in sub_question) {
        sub_question[key].forEach((sub_ques) => {
        sub_questions.push(sub_ques)
        })
    }
    const chiTietProps = {
        don_kep, content_Question, option_ans, true_ans, sub_question: sub_questions
    }
    return { stt, id, content_Question, date, don_kep, level, chi_tiet: <ButtonChiTiet don_kep={don_kep} props={ chiTietProps } />, edit: <ButtonEdit props={id} />,delete: <ButtonDelete apilink={api} props={id}/>  };
}

export default function TableCauHoi(props) {
    const listCauHoi = props.props
    const rows = listCauHoi.map((cauHoi, index) => {
        return createData({
            stt: index + 1,
            id: cauHoi.id,
            content_Question: cauHoi.Content_Question ? cauHoi.Content_Question: cauHoi.Question_Main,
            date: cauHoi.Date,
            don_kep: cauHoi.Don_Kep,
            level: cauHoi.Level,
            option_ans: cauHoi.Option_ans,
            true_ans: cauHoi.True_ans,
            sub_question: cauHoi.Sub_Question ? cauHoi.Sub_Question : null
        })
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
