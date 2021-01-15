
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import moment from "moment";
import makeRequest from '../../libs/request';
import InputForm from '../../partials/common/InputForm';
import ButtonLoading from '../../partials/common/ButtonLoading';
import {
    makeStyles
} from "@material-ui/core";
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from "@material-ui/core";

import { Form, Card, Col } from "react-bootstrap";
import { Modal, Pagination } from "antd";
import Icon from "@material-ui/core/Icon";
import { showSuccessMessageIcon, showErrorMessage } from '../../actions/notification';
import "./style.css";

const useStyles1 = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    }
}));

export default function DifficultLevel() {
    const classes1 = useStyles1();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRow] = useState([]);
    const [dataSearch, setData] = useState({ name: '', Active: 0 });
    const [dataDelete, setDataDelete] = useState({ visible: false });
    const [dataAdd, setDataAdd] = useState({});
    const [dataUpdate, setDataUpdate] = useState({ visible: false });
    const [dataDetail, setDataDetail] = useState({ visible: false });
    const [total, setTotal] = useState(0);
    const inputNameLevelRef = React.createRef();
    const inputDescriptionRef = React.createRef();
    const formAdd = React.createRef();
    const formUpdate = React.createRef();
    const [isLoadSubmit, setLoadSubmit] = useState(false);
    const [isLoadSearch, setLoadSearch] = useState(false);
    const [isLoad, setLoad] = useState(false);
    useEffect(() => {
        searchLevel({ page: 1, limit: rowsPerPage });

    }, []);
    const showModalAdd = () => {
        setDataAdd({
            ...dataAdd,
            visible: true
        })
    }
    const clickModalAddCancel = () => {
        setDataAdd({
            ...dataAdd,
            visible: false
        })
    }
    let index = (page === 1 ? 0 : (rowsPerPage * (page - 1)));
    const onChangeAddValue = (key, value) => {
        setDataAdd({
            ...dataAdd,
            [key]: value
        })
    }
    const searchLevel = (dataSearch = {}) => {
        makeRequest('get', `level/search`, dataSearch)
            .then(({ data }) => {
                if (data.signal) {
                    const res = data.data.ListSearchLevel;
                    setRow(res);
                    setTotal(data.data.total)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const showModalUpdate = (row) => {
        setDataUpdate({
            ...row,
            visible: true
        })
    }
    const showModalDetail = (row) => {
        setDataDetail({
            ...row,
            visible: true
        })
    }
    const showModal = (idDel) => {
        setDataDelete({
            ...dataDelete,
            visible: true,
            idDel
        })
    }
    const clickModalUpdateCancel = () => {
        setDataUpdate({
            ...dataUpdate,
            visible: false
        })
    }
    const clickModalDetailCancel = () => {
        setDataDetail({
            ...dataDetail,
            visible: false
        })
    }
    const clickModalCancel = () => {
        setDataDelete({
            ...dataDelete,
            visible: false,
            idDel: 0
        })
    }
    const submitAdd = (e) => {
        e.preventDefault();
        const nodeAdd = formAdd.current;
        nodeAdd.click();
        disableLoadSubmit(false);
    }
    const submitUpdate = (e) => {
        e.preventDefault();
        const nodeUpdate = formUpdate.current;
        nodeUpdate.click();
    }
    const onChangeUpdateValue = (key, value) => {
        setDataUpdate({
            ...dataUpdate,
            [key]: value
        })
    }
    const clickModalOk = () => {
        let idDel = dataDelete.idDel;
        makeRequest('get', `level/delete?id=${idDel}`)
            .then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Deleted successfully!')
                    setDataDelete({
                        visible: false
                    });
                    let dataRow = rows.filter(it => {
                        return it.id !== idDel;
                    })
                    setRow(dataRow);

                } else {
                    return showErrorMessage('Please, delete a question contain this level first');
                }
            })
            .catch(err => {
                console.log('Error', err)
            })
    }

    const onChangeValueSearch = (key, value) => {
        setData({
            ...dataSearch,
            [key]: value
        })
    }

    const disableLoadSubmit = () => {
        setLoadSubmit(false);
    };
    const handleChangePage = (newPage) => {
        setPage(newPage);
        if (isLoad) {
            searchLevel({ ...dataSearch, page: newPage, limit: rowsPerPage });
            return;
        }
        searchLevel({ page: newPage, limit: rowsPerPage });
        return;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        searchLevel(dataSearch, setPage(1));
        setLoad(true);
    }
    const unfilteredData = (e) => {
        setData({
            name: ''
        });
        setPage(1);
        searchLevel({ page: 1, limit: rowsPerPage });
        setLoad(false);
    }
    const handleSubmitAdd = (e) => {
        e.preventDefault();
        if (!dataAdd.name) {
            inputNameLevelRef.current.focus();
            return showErrorMessage('please enter level name');
        }


        //enableLoadSubmit();
        makeRequest('post', `level/create`, dataAdd)
            .then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Add Successfully!')
                    setPage(1);
                    searchLevel({ page: 1, limit: rowsPerPage });
                    setDataAdd({
                        visible: false
                    })
                } else {
                    showErrorMessage('This name has already been used!!!');


                }
                disableLoadSubmit();
            })
            .catch(err => {
                disableLoadSubmit();
            })
    }
    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        if (!dataUpdate.name) {
            inputNameLevelRef.current.focus();
            return showErrorMessage('please enter level name');
        }
        makeRequest('post', `level/update`, dataUpdate)
            .then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Update Successfully!')
                    setDataUpdate({
                        visible: false
                    });
                    setPage(1);
                    searchLevel({ page: 1, limit: rowsPerPage });
                    let dataRow = rows.map(it => {
                        if (it.id === dataUpdate.id) {
                            return dataUpdate;
                        }
                        return it;
                    })

                    setRow(dataRow);

                } else {
                    return showErrorMessage(data.message);
                }
            })
            .catch(err => {
                console.log('Error', err)
            })
    }

    return (
        <>
            <Link onClick={showModalAdd} Icon="" id="tooltip" className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10">Add New Level

            </Link>
            <div className="row">
                <div className="col-md-12">
                    <div className="kt-section">
                        <div className="kt-section__content">
                            <Paper className={classes1.root}>
                                <div className='col-md-12'>
                                    <Form onSubmit={handleSubmit}>
                                        <div style={{ marginTop: 20, fontSize: 20 }}><label>Search</label></div>

                                        <div className='form-row'>
                                            <div className='form-group col-md-2'>
                                                <div className="form-group" style={{ display: 'flex' }} >
                                                    <InputForm
                                                        type="text"
                                                        placeholder="Name"
                                                        value={dataSearch.name || ''}
                                                        onChangeValue={(value) => { onChangeValueSearch('name', value) }}
                                                        focus={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group col-md-2'>
                                                <div className="form-group" style={{ display: 'flex' }} >
                                                    <button className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10" onClick={unfilteredData} style={{ marginLeft: 10, marginTop: 3 }} type="button"><span>Clear</span></button>
                                                    <ButtonLoading type="submit" loading={isLoadSearch} className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                                                        style={{ marginLeft: 10, marginTop: 3 }}><span>Search</span></ButtonLoading>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <Table className={classes1.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Created date</TableCell>
                                            <TableCell style={{ width: 150 }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.length ? rows.map((row, key) => (

                                            <TableRow key={`level${row.id}`}>
                                                <TableCell>
                                                    {index = index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>{row.description}</TableCell>
                                                <TableCell>{moment(row.createdAt).format("HH:mm DD-MM-YYYY")}</TableCell>

                                                <TableCell>
                                                    <span style={{ cursor: 'pointer' }} d data-toggle="tooltip" data-placement="top" title="Detail data"><Icon className="fa fa-info-circle" onClick={(e) => showModalDetail(row)} style={{ color: '#ffa800', fontSize: 15 }} /></span>
                                                    <span style={{ cursor: 'pointer' }} d data-toggle="tooltip" data-placement="top" title="Edit data"><Icon className="fa fa-pen" onClick={(e) => showModalUpdate(row)} style={{ color: '#ffa800', fontSize: 15, marginLeft: 12 }} /></span>
                                                    <span style={{ cursor: 'pointer' }} data-toggle="tooltip" data-placement="top" title="Delete"><Icon className="fa fa-trash" onClick={(e) => showModal(row.id)} style={{ color: 'rgb(220, 0, 78)', fontSize: 15, marginLeft: 12 }} /></span>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                                <TableRow>
                                                    <TableCell colSpan={10} align="center">No data</TableCell>
                                                </TableRow>
                                            )}
                                    </TableBody>
                                </Table>
                            </Paper>
                            {total > rowsPerPage && (
                                <div className="customSelector custom-svg">
                                    <Pagination className="pagination-crm" current={page} pageSize={rowsPerPage} total={total} onChange={(p, s) => handleChangePage(p)} />
                                </div>
                            )}
                        </div>
                        <Modal
                            title='Delete Level'
                            visible={dataDelete.visible}
                            onOk={clickModalOk}
                            onCancel={clickModalCancel}
                            cancelText='Cancel'
                            okText='Ok'
                        >
                            <p>Do you want to delete this level?</p>
                        </Modal>
                        <Modal
                            title='Add New Level'
                            visible={dataAdd.visible}
                            cancelText='Cancel'
                            okText='save'
                            onCancel={clickModalAddCancel}
                            onOk={submitAdd}
                        >
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="kt-section">
                                        <Card >
                                            <Card.Body>
                                                <Form onSubmit={handleSubmitAdd}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formBasicNameBank">
                                                            <Form.Label className="starDanger">Name</Form.Label>
                                                            <Form.Control type="text" autoFocus maxLength={255} ref={inputNameLevelRef} placeholder="Enter Name Level" value={dataAdd.name || ''} onChange={(e) => onChangeAddValue('name', e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Description</Form.Label>
                                                            <Form.Control style={{ height: 100 }} type="text" as="textarea" rows="5" maxLength={500} ref={inputDescriptionRef} placeholder="Enter Description" value={dataAdd.description || ''} onChange={(e) => onChangeAddValue('description', e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Button variant="primary" type="submit" ref={formUpdate} visible={false} style={{ width: 0, height: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }} ref={formAdd}>
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            title='Update Level'
                            visible={dataUpdate.visible}
                            cancelText='Cancel'
                            okText='Update'
                            onCancel={clickModalUpdateCancel}
                            onOk={submitUpdate}
                        >
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="kt-section">
                                        <Card >
                                            <Card.Body>
                                                <Form onSubmit={handleSubmitUpdate}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formBasicNameBank">
                                                            <Form.Label className="starDanger">Name</Form.Label>
                                                            <Form.Control type="text" autoFocus maxLength={255} ref={inputNameLevelRef} placeholder="Enter name level" value={dataUpdate.name || ''} onChange={(e) => onChangeUpdateValue('name', e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formBasicNameBank">
                                                            <Form.Label>Description</Form.Label>
                                                            <Form.Control type="text" autoFocus as="textarea" rows="5" maxLength={255} ref={inputDescriptionRef} placeholder="Enter description" value={dataUpdate.description || ''} onChange={(e) => onChangeUpdateValue('description', e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Button variant="primary" type="submit" ref={formUpdate} visible={false} style={{ width: 0, height: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }} ref={formUpdate}>
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            title='Detail Level'
                            visible={dataDetail.visible}
                            cancelText='Cancel'
                            okText='OK'
                            onCancel={clickModalDetailCancel}
                            onOk={clickModalDetailCancel}
                            cancelButtonProps={{ style: { display: 'none' } }}
                        >
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="kt-section">
                                        <Card >
                                            <Card.Body>
                                                <Form>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formBasicNameBank">
                                                            <Form.Label className="starDanger">Name</Form.Label>
                                                            <Form.Control readOnly type="text" maxLength={255} placeholder="Enter name level" value={dataDetail.name || ''} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Description</Form.Label>
                                                            <Form.Control readOnly type="text" as="textarea" rows="5" maxLength={255} ref={inputDescriptionRef} placeholder="Enter description" value={dataDetail.description || ''} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Button variant="primary" type="submit" visible={false} style={{ width: 0, height: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }} ref={formUpdate}>
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}