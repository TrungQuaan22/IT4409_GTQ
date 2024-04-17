import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    { id: 'image', label: 'Hình ảnh', minWidth: 20 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 200, align: 'left' },
    {
        id: 'category',
        label: 'Phân loại',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'quantity',
        label: 'Số lượng',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
];

function createData(index, image, name, category, price, quantity) {
    return { index, image, name, category, price, quantity };
}

const rows = [
    createData(
        1,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        2,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        3,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        4,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        5,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        6,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        7,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        8,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        9,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        10,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        11,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
];

function ProductsManagement() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openDeleteBox, setOpenDeleteBox] = useState(Array(rows.length).fill(false));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDeleteProduct = (id) => {
        handleCloseDeleteBox(id - 1);
        console.log(`delete ${id}`);
    };

    const handleOpenDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };
    const handleCloseDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Danh sách sản phẩm</h1>
            <TableContainer className={cx('table-container')}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ fontSize: '1.6rem', minWidth: `${column.minWidth}` }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    <StyledTableCell align="left">{row.index}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Avatar src={row.image} alt={row.name} />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                                    <StyledTableCell align="left">{row.category}</StyledTableCell>
                                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                                    <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                                    <TableCell align="left">
                                        <Button
                                            onClick={() => handleOpenDeleteBox(row.index - 1)}
                                            variant="contained"
                                            color="error"
                                        >
                                            XÓA
                                        </Button>
                                        <Modal
                                            open={openDeleteBox[row.index - 1]}
                                            onClose={() => handleCloseDeleteBox(row.index - 1)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <div className={cx('delete-confirm-box')}>
                                                <p>Xóa sản phẩm {row.name} ?</p>
                                                <div className={cx('delete-box-row')}>
                                                    <Button
                                                        size="large"
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDeleteProduct(row.index)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                    <Button
                                                        size="large"
                                                        variant="outlined"
                                                        onClick={() => handleCloseDeleteBox(row.index - 1)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '50px',
                    fontSize: '1.4rem',
                    '.MuiTablePagination-selectLabel': {
                        color: 'rgb(41, 39, 39)',
                        fontSize: '1.4rem',
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '1.4rem',
                    },
                }}
                rowsPerPageOptions={[6]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                // labelRowsPerPage={'Số hàng'}
                page={page}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default ProductsManagement;
