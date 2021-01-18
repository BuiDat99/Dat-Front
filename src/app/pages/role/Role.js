
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import makeRequest from '../../libs/request';
import InputForm from '../../partials/common/InputForm';
import ButtonLoading from '../../partials/common/ButtonLoading';
import BaseRole from 'base_role';
import {
    makeStyles
} from "@material-ui/core";
import {
    Paper,
} from "@material-ui/core";

import { Form} from "react-bootstrap";
import { Pagination } from "antd";
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

export default function RoleList() {
    const classes1 = useStyles1();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRow] = useState([]);
    const [dataSearch, setData] = useState({ name: '', Active: 0 });
    const [dataDelete, setDataDelete] = useState({ visible: false });
    const [dataAdd, setDataAdd] = useState({});
    const [dataUpdate, setDataUpdate] = useState({ visible: false });
    const [total, setTotal] = useState(0);
    const inputNameRef = React.createRef();
    const inputPerRef = React.createRef();
    const formAdd = React.createRef();
    const formUpdate = React.createRef();
    const [isLoadSubmit, setLoadSubmit] = useState(false);
    const [isLoadSearch, setLoadSearch] = useState(false);
    const [isLoad, setLoad] = useState(false);
    const [dataPerOneSelect, setDataPerOneSelect] = useState([]);
    const [selectedOptionPer, setSelectedOptionPer] = useState(null);
    const [selectedOptionPerUpdate, setSelectedOptionPerUpdate] = useState([]);
    useEffect(() => {
        searchLevel({ page: 1, limit: rowsPerPage });
        getDataPerOneSelect();
    }, []);
    const LabelListRole = [
        {
            name: 'No',
            type: 'index',
            key: 'index'
        },
        {
            name: 'Name',
            type: 'text',
            key: 'name'
        },
        {
            name: 'Description',
            type: 'text',
            key: 'description'
        },
        {
            name: 'Created date',
            type: 'date',
            key: 'createdAt'
        },
        {
            name: 'Action',
            type: 'action',
        }
    ]  
    
    const getDataPerOneSelect = () => {
        makeRequest("get", `permission/getAllPermission`).then(({ data }) => {
            if (data.signal) {
                const res = data.data;
                setDataPerOneSelect(res);               
            }
        })
            .catch(err => {
                console.log(err)
            })
    };
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
        makeRequest('get', `role/searchRole`, dataSearch)
            .then(({ data }) => {
                if (data.signal) {
                    const res = data.data.rows;
                    setRow(res);
                    setTotal(data.data.total)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const showModalUpdate = (row) => {
        makeRequest('get', `role/getRolebyId?role_id=${row.id}`)
            .then(({ data }) => {

                if (data.signal) {
                    const res = data.data.rows.List_Per;
                    setSelectedOptionPerUpdate(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
        setDataUpdate({
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
        makeRequest('get', `role/deleteRole?id=${idDel}`)
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
            inputNameRef.current.focus();
            return showErrorMessage('please enter role name');
        }
        dataAdd.List_Per = selectedOptionPer;

        if (!dataAdd.List_Per) {
            inputPerRef.current.focus();
            return showErrorMessage('please enter permission of role');
        }       
        makeRequest('post', `role/createRole`, dataAdd)
            .then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Add Successfully!')
                    setPage(1);
                    searchLevel({ page: 1, limit: rowsPerPage });
                    setSelectedOptionPer(null);
                    setDataAdd({
                        visible: false,
                    })
                } else {
                    return showErrorMessage(data.message);
                }
                disableLoadSubmit();
            })
            .catch(err => {
                disableLoadSubmit();
            })
    }
    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        dataUpdate.List_Per = selectedOptionPerUpdate;       
        makeRequest('post', `role/updateRole`, dataUpdate)
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
            <Link onClick={showModalAdd} Icon="" id="tooltip" className="btn btn-primary btn-bold btn-sm btn-icon-h kt-margin-l-10">Add New Role

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
                                
                                <BaseRole
                                    rows={rows} LabelListRole={LabelListRole}
                                    showModalUpdate={showModalUpdate} showModal={showModal}
                                    dataDelete={dataDelete } clickModalOk={clickModalOk } clickModalCancel={ clickModalCancel}
                                    dataAdd={dataAdd} clickModalAddCancel={clickModalAddCancel} onChangeAddValue={onChangeAddValue} submitAdd={submitAdd} handleSubmitAdd={handleSubmitAdd} formAdd={formAdd}
                                    dataUpdate={dataUpdate} clickModalUpdateCancel={clickModalUpdateCancel} onChangeUpdateValue={onChangeUpdateValue} submitUpdate={submitUpdate} handleSubmitUpdate={handleSubmitUpdate} formUpdate={formUpdate}
                                    dataPerOneSelect={dataPerOneSelect} setSelectedOptionPer={setSelectedOptionPer} setSelectedOptionPerUpdate={setSelectedOptionPerUpdate} selectedOptionPerUpdate={selectedOptionPerUpdate}
                                    inputNameRef={inputNameRef} inputPerRef={inputPerRef} makeRequest={makeRequest}
                                    selectedOptionPer={selectedOptionPer} index={index}
                                    
                                />
                            </Paper>
                            {total > rowsPerPage && (
                                <div className="customSelector custom-svg">
                                    <Pagination className="pagination-crm" current={page} pageSize={rowsPerPage} total={total} onChange={(p, s) => handleChangePage(p)} />
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}