import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

import classNames from 'classnames/bind';
import styles from './TableComponent.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

function TableComponent({
    columns,
    rows,
    type,
    attributes,
    deleteButton,
    contactButton,
    updateButton,
    handleDelete,
    handleUpdate,
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openDeleteBox, setOpenDeleteBox] = useState([]);
    const [openVoucherUpdateBox, setOpenVoucherUpdateBox] = useState([]);
    const [openProductUpdateBox, setOpenProductUpdateBox] = useState([]);

    const typeName = {
        customer: 'khách hàng',
        product: 'sản phẩm',
        order: 'đơn hàng',
        voucher: 'mã giảm giá',
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // delete ----------------------------------------------------
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

    // Update Voucher ----------------------------------------------------
    const handleOpenVoucherUpdateBox = (index) => {
        setOpenVoucherUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseVoucherUpdateBox = (index) => {
        setOpenVoucherUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    // update product
    const handleOpenProductUpdateBox = (index) => {
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseProductUpdateBox = (index) => {
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };


    return (
        <div>
            <TableContainer>
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
                                    {attributes.map((attribute, attrIndex) => (
                                        <StyledTableCell key={attrIndex} align="left">
                                            {attribute === 'image' ? (
                                                <Avatar src={row[attribute]} alt="" />
                                            ) : (
                                                row[attribute]
                                            )}
                                        </StyledTableCell>
                                    ))}

                                    {deleteButton && (
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
                                                    <p>
                                                        Xóa {typeName[type]} {row.name} ?
                                                    </p>
                                                    <div className={cx('delete-box-row')}>
                                                        <Button
                                                            size="large"
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleDelete(row.index)}
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
                                    )}

                                    {contactButton && (
                                        <TableCell align="left">
                                            <Button onClick={() => {}} variant="contained" color="primary">
                                                NHẮN TIN
                                            </Button>
                                        </TableCell>
                                    )}

                                    {updateButton && type === 'voucher' && (
                                        // Cập nhật voucher
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleOpenVoucherUpdateBox(row.index - 1)}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                CẬP NHẬT
                                            </Button>

                                            <Modal
                                                open={openVoucherUpdateBox[row.index - 1]}
                                                onClose={() => handleCloseVoucherUpdateBox(row.index - 1)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className={cx('update-modal-box')}>
                                                    <p className={cx('update-modal-title')}>Cập nhật Voucher</p>

                                                    <div className={cx('update-input-wrapper')}>
                                                        <div className={cx('update-input-row')}>
                                                            <p>Tên voucher</p>
                                                            <input
                                                                id={`voucher-name-${row.index - 1}`}
                                                                type="text"
                                                                defaultValue={row.name}
                                                                onChange={null}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Mã giảm giá</p>
                                                            <input
                                                                id={`voucher-code-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.code}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Giá trị</p>
                                                            <input
                                                                id={`voucher-value-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.value}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Điều kiện đơn hàng</p>
                                                            <input
                                                                id={`voucher-condition-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.condition}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Giá trị tối đa</p>
                                                            <input
                                                                id={`voucher-maximum-value-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.maximum_value}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className={cx('update-modal-buttons')}>
                                                        <Button
                                                            color="info"
                                                            variant="contained"
                                                            onClick={() => {
                                                                let data = {
                                                                    name: document.getElementById(
                                                                        `voucher-name-${row.index - 1}`,
                                                                    )?.value,
                                                                    code: document.getElementById(
                                                                        `voucher-code-${row.index - 1}`,
                                                                    )?.value,
                                                                    value: document.getElementById(
                                                                        `voucher-value-${row.index - 1}`,
                                                                    )?.value,
                                                                    condition: document.getElementById(
                                                                        `voucher-condition-${row.index - 1}`,
                                                                    )?.value,
                                                                    maximum_value: document.getElementById(
                                                                        `voucher-maximum-value-${row.index - 1}`,
                                                                    )?.value,
                                                                };

                                                                handleUpdate(data); // Hàm gọi API để cập nhật voucher bên Vouchers.js
                                                                handleCloseVoucherUpdateBox(row.index - 1);
                                                            }}
                                                        >
                                                            Cập nhật
                                                        </Button>

                                                        <Button
                                                            color="error"
                                                            variant="outlined"
                                                            onClick={() => handleCloseVoucherUpdateBox(row.index - 1)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </TableCell>
                                    )}
                                    
                                    {updateButton && type === 'product' && (
                                        // Cập nhật voucher
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleOpenProductUpdateBox(row.index - 1)}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                CẬP NHẬT
                                            </Button>

                                            <Modal
                                                open={openProductUpdateBox[row.index - 1]}
                                                onClose={() => handleCloseProductUpdateBox(row.index - 1)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className={cx('update-modal-box')}>
                                                    <p className={cx('update-modal-title')}>Cập nhật sản phẩm</p>

                                                    <div className={cx('update-input-wrapper')}>
                                                        <div className={cx('update-input-row')}>
                                                            <p>Tên sản phẩm</p>
                                                            <input
                                                                id={`product-name-${row.index - 1}`}
                                                                type="text"
                                                                defaultValue={row.name}
                                                                onChange={null}
                                                            />
                                                        </div>

                                                        
                                                    </div>

                                                    <div className={cx('update-modal-buttons')}>
                                                        <Button
                                                            color="info"
                                                            variant="contained"
                                                            onClick={() => {
                                                                let data = {
                                                                    // name: document.getElementById(
                                                                    //     `voucher-name-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // code: document.getElementById(
                                                                    //     `voucher-code-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // value: document.getElementById(
                                                                    //     `voucher-value-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // condition: document.getElementById(
                                                                    //     `voucher-condition-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // maximum_value: document.getElementById(
                                                                    //     `voucher-maximum-value-${row.index - 1}`,
                                                                    // )?.value,
                                                                };

                                                                handleUpdate(data); // Hàm gọi API để cập nhật voucher bên Vouchers.js
                                                                handleCloseProductUpdateBox(row.index - 1);
                                                            }}
                                                        >
                                                            Cập nhật
                                                        </Button>

                                                        <Button
                                                            color="error"
                                                            variant="outlined"
                                                            onClick={() => handleCloseProductUpdateBox(row.index - 1)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </TableCell>
                                    )}
                                    
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
                page={page}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default TableComponent;
