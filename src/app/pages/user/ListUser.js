
import React, { useState, useEffect } from "react";
import makeRequest from '../../libs/request';
import InputForm from '../../partials/common/InputForm';
import ButtonLoading from '../../partials/common/ButtonLoading';
import {ListUser} from 'base_user';
import {
    makeStyles
} from "@material-ui/core/styles";
import {
    Paper
} from "@material-ui/core";

import { Form, Card, Col } from "react-bootstrap";
import { Modal, Pagination } from "antd";
import { showSuccessMessageIcon, showErrorMessage } from '../../actions/notification';
import SelectForm from '../../partials/common/SelectForm';
import { ACTIVE_STATUS } from '../../config/common/testme'
import "./user.css";
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

export default function List_User(props) {
    const classes1 = useStyles1();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRow] = useState([]);
    const [dataSearch, setData] = useState('');

    const [dataDelete, setDataDelete] = useState({ visible: false });
    const [dataUpdate, setDataUpdate] = useState({ visible: false });
    const [dataRoleOneSelect, setDataRoleOneSelect] = useState([]);
    const [selectedOptionRole, setSelectedOptionRole] = useState([]);
    const [total, setTotal] = useState(0);
    const inputNameBankRef = React.createRef();
    const inputEmailBankRef = React.createRef();
    const formUpdate = React.createRef();
    const [isLoadSearch, setLoadSearch] = useState(false);
    const [LinkImage, setLinkImage] = useState("");
    const [srcImage, setSrcImage] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [changeImage, setChangeImage] = useState(false);
    useEffect(() => {
        searchUser({ page: 1, limit: rowsPerPage });
        getDataRoleOneSelect();
    }, []);

    const LabelListUser = [
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
            name: 'Email',
            type: 'text',
            key: 'email'
        },
        {
            name: 'Day left',
            type: 'date',
            key: 'ans_update'
        },
        {
            name: 'Created date',
            type: 'date',
            key: 'creation_Date'
        },
        {
            name: 'Status',
            type: 'status',
            key: 'status'
        },
        {
            name: 'Action',
            type: 'action',
        }
    ]

    let index = (page === 1 ? 0 : (rowsPerPage * (page - 1)));
    
     
    const getDataRoleOneSelect = () => {
        makeRequest("get", `role/getOneSelect`).then(({ data }) => {
            
            if (data.signal) {
                const res = data.data;
                setDataRoleOneSelect(res);
            }
        })
            .catch(err => {
                console.log(err)
            })
    };
    
    const searchUser = (dataSearch = {}) => {
        makeRequest('get', `user/getAll`, dataSearch)
            .then(({ data }) => {

                if (data.signal) {
                    const res = data.data.listAllUserAndAnswerUpdateAt;
                    setRow(res);
                    setTotal(data.data.total);

                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const showModalUpdate = (row) => {
        makeRequest('get', `user/getById?id=${row.id}`)
            .then(({ data }) => {

                if (data.signal) {
                    const res = data.data.List_Role;
                    console.log('b',res)
                    setSelectedOptionRole(res);
                }
            })
            .catch(err => {
                console.log(err)
            })
        setLinkImage("");
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
        setChangeImage(false);
    }
    const clickModalCancel = () => {
        setDataDelete({
            ...dataDelete,
            visible: false,
            idDel: 0
        })
    }
    const submitUpdate = (e) => {
        e.preventDefault();
        const nodeUpdate = formUpdate.current;
        nodeUpdate.click();
        setChangeImage(false);

    }

    const onChangeUpdateValue = (key, value) => {
        setDataUpdate({
            ...dataUpdate,
            [key]: value
        })
    }
    const clickModalOk = () => {
        let idDel = dataDelete.idDel;
        makeRequest('get', `user/delete?id=${idDel}`)
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
                    return showErrorMessage(data.message);
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
    const handleChangePage = (newPage) => {
        setPage(newPage);
        if (isSearch) {
            searchUser({ ...dataSearch, page: newPage, limit: rowsPerPage });
            return;
        }
        searchUser({ page: newPage, limit: rowsPerPage });
        return;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSearch(true);
        searchUser(dataSearch, setPage(1));
    }
    const unfilteredData = (e) => {
        setData({
            name: '',
            email: '',
            status: ''
        });
        setPage(1);
        searchUser({ page: 1, limit: rowsPerPage });
        setIsSearch(false);
    }
    const onChangeLink = (event) => {
        const file = event.target.files[0];
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            return showErrorMessage('Support PNG|JPEG|JPG.');
        }
        let url = window.URL.createObjectURL(file);
        setSrcImage(url);
        setLinkImage(event.target.files[0]);
        setChangeImage(true);

    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        dataUpdate.List_Role = selectedOptionRole;
        if (!dataUpdate.name) {
            inputNameBankRef.current.focus();
            return showErrorMessage('please enter name of user');
        }
        if (!dataUpdate.email) {
            inputEmailBankRef.current.focus();
            return showErrorMessage('please enter email of user')
        }
        if (!dataUpdate.birthday) {
            return showErrorMessage('please enter birthday of user')
        }
        if (!dataUpdate.status) {
            return showErrorMessage('please enter status type');
        }
    
        makeRequest('post', `user/update`, dataUpdate)
            .then(({ data }) => {
                if (data.signal) {
                    showSuccessMessageIcon('Update Successfully!')
                    document.getElementById('inputGroupFile01').value = '';
                    setChangeImage(false);

                    setDataUpdate({
                        visible: false
                    });

                    searchUser({ page: 1, limit: rowsPerPage }, setPage(1));


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

            <div className="row">
                <div className="col-md-12">
                    <div className="kt-section">
                        <div className="kt-section__content">
                            <Paper className={classes1.root}>
                                <div className='col-md-12'>
                                    <Form onSubmit={handleSubmit}>
                                        <h3 className="card-title align-items-start flex-column" style={{ marginTop: '20px', marginLeft: '10px' }}>
                                            <span className="card-label font-weight-bolder text-dark" >
                                                Search
                                                  </span>
                                        </h3>
                                        <div className='form-row'>

                                            <div className="form-group col-md-2" id="search-box" d data-toggle="tooltip" >
                                                <InputForm
                                                    type="text"
                                                    placeholder="Search name "
                                                    value={dataSearch.name || ''}
                                                    onChangeValue={(value) => { onChangeValueSearch('name', value) }}
                                                    focus={true}
                                                />
                                            </div>
                                            <div className="form-group col-md-2" d data-toggle="tooltip"  >
                                                <InputForm
                                                    type="text"
                                                    placeholder="Search email"
                                                    value={dataSearch.email || ''}
                                                    onChangeValue={(value) => { onChangeValueSearch('email', value) }}
                                                />
                                            </div>
                                            <div className="form-group col-md-1" d data-toggle="tooltip" title="Search By Status" >
                                                <SelectForm
                                                    placeholder="Status"
                                                    optionData={ACTIVE_STATUS}
                                                    keyString="id"
                                                    labelString="name"
                                                    value={dataSearch.status || ''}
                                                    onChangeValue={(value) => { onChangeValueSearch('status', value) }}
                                                />
                                            </div>
                                            <div className='form-group col-md-2'>
                                                <div className="form-group" style={{ display: 'flex' }} >
                                                    <button id='cancel' className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10" onClick={unfilteredData} style={{ marginLeft: 10, marginTop: 3 }} type="button"><span>Clear</span></button>
                                                    <ButtonLoading type="submit" loading={isLoadSearch} className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                                                        style={{ marginLeft: 10, marginTop: 3 }}><span>Search</span></ButtonLoading>

                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>

                                <ListUser
                                    rows={rows}
                                    LabelListUser={LabelListUser}
                                    showModalUpdate={showModalUpdate} showModal={showModal}
                                    dataDelete={dataDelete} clickModalOk={clickModalOk} clickModalCancel={clickModalCancel}
                                    dataUpdate={dataUpdate} clickModalUpdateCancel={clickModalUpdateCancel} onChangeUpdateValue={onChangeUpdateValue} submitUpdate={submitUpdate} handleSubmitUpdate={handleSubmitUpdate} formUpdate={formUpdate}
                                    ACTIVE_STATUS={ACTIVE_STATUS} LinkImage={LinkImage} srcImage={srcImage} onChangeLink={onChangeLink} SelectForm={SelectForm}
                                    dataRoleOneSelect ={dataRoleOneSelect} setSelectedOptionRole={setSelectedOptionRole} selectedOptionRole={selectedOptionRole}
                                    makeRequest={makeRequest} index={index}
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