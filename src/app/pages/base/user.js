import React, { useState, useEffect } from 'react'
import moment from "moment";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Redirect, useHistory } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@material-ui/core";
import { Modal } from "antd";
import 'antd/dist/antd.css';
import { Form, Card, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailIcon from '@material-ui/icons/Details';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  makeStyles
} from "@material-ui/core/styles";
import "./style.css";
function ListUser(props) {
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
  const { rows, LabelListUser, showModalUpdate, showModal,
    dataDelete, clickModalOk, clickModalCancel,
    dataUpdate, clickModalUpdateCancel, onChangeUpdateValue, submitUpdate, handleSubmitUpdate, formUpdate,
    LinkImage, srcImage, onChangeLink, ACTIVE_STATUS, SelectForm,
    dataRoleOneSelect, setSelectedOptionRole

  } = props;
  const animatedComponents = makeAnimated();
  const [dataDetail, setDataDetail] = useState({ visible: false });
  const showModalDetail = (row) => {
    setDataDetail({
      ...row,
      visible: true
    })
  }
  const clickModalDetailCancel = () => {
    setDataDetail({
      ...dataDetail,
      visible: false
    })
  }
  const classes1 = useStyles1();
  const renderStatusText = (category) => {
    if (category === 1) {
      return (<span className="btn btn-label-primary btn-bold btn-sm btn-icon-h" style={{ borderRadius: '.42rem' }}>Active</span>);
    } else {
      return (<span className="btn btn-label-warning btn-bold btn-sm btn-icon-h" style={{ borderRadius: '.42rem' }}>De-active</span>);
    }
  }

  return (
    <div>
      <Table className={classes1.table}>
        <TableHead>
          <TableRow>
            {LabelListUser ? LabelListUser.map((label, index) => (
              <TableCell>{label.name}</TableCell>
            )) : ('')}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? rows.map((row, index) => (

            <TableRow>
              {LabelListUser ? LabelListUser.map((labelType, key) => (
                <TableCell>
                  {
                    labelType.type === 'index' ? (index = index + 1) : (
                      labelType.type === 'text' ? (row[labelType.key]) : (
                        labelType.type === 'date' ? moment(row[labelType.key]).format("HH:mm DD-MM-YYYY") : (
                          labelType.type === 'status' ? renderStatusText(row[labelType.key]) : (
                            labelType.type === 'action' ? (
                              <div>
                                <DetailIcon style={{ cursor: 'pointer', color: '#ffa800', fontSize: 25 }} title="Detail data" onClick={(e) => showModalDetail(row)} />
                                <EditIcon style={{ cursor: 'pointer', color: '#ffa800', fontSize: 25 }} title="Edit data" onClick={(e) => showModalUpdate(row)} />
                                <DeleteIcon style={{ cursor: 'pointer', color: 'rgb(220, 0, 78)', fontSize: 25 }} title="Delete" onClick={(e) => showModal(row.id)} />
                              </div>
                            )
                              : '')
                        )
                      )
                    )
                  }
                </TableCell>
              )) : ('')}
            </TableRow>
          )) : (
              <TableRow>
                <TableCell colSpan={10} align="center">No data</TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
      <Modal
        title='Delete User'
        visible={dataDelete.visible}
        onOk={clickModalOk}
        onCancel={clickModalCancel}
        cancelText='Cancel'
        okText='Ok'
      >
        <p>Do you want to delete this User?</p>
      </Modal>

      <Modal
        title='Update User'
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
                        <Form.Control type="text" autoFocus maxLength={255} autoFocus
                          placeholder="Enter name of user" value={dataUpdate.name || ''} onChange={(e) => onChangeUpdateValue('name', e.target.value)} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicNameBank">
                        <Form.Label className="starDanger">Email</Form.Label>
                        <Form.Control type="text" maxLength={255}
                          placeholder="Enter email of user" value={dataUpdate.email || ''} onChange={(e) => onChangeUpdateValue('email', e.target.value)} />
                      </Form.Group>
                    </Form.Row>


                    <Form.Row>
                      <Form.Group as={Col} >
                        <Form.Label>Birthday</Form.Label>

                        <Form.Control type="date" value={moment(dataUpdate.birthday).format('YYYY-MM-DD') || ''} onChange={(e) => onChangeUpdateValue('birthday', e.target.value)} />
                      </Form.Group>


                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} >
                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                          <div className="imgAvatarContainer">
                            <div className="imgAvatar">
                              {LinkImage ? <img src={srcImage} alt={srcImage} className="img-circle img-full-width" /> :
                                <img src={dataUpdate.avatar} alt={dataUpdate.avatar} className="img-circle img-full-width" />
                              }
                            </div>
                            <div className="marginT10">
                              <label className="fileInputTextKT" htmlFor="inputGroupFile01">
                                Click here to upload avatar
                                                                         <input type="file" accept="image/*" id="inputGroupFile01" onChange={onChangeLink} />
                              </label>
                            </div>
                          </div>
                        </div>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label className="starDanger">Role</Form.Label>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={dataRoleOneSelect}
                          onChange={setSelectedOptionRole}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label className="starDanger">Status</Form.Label>
                        <SelectForm
                          optionData={ACTIVE_STATUS}
                          keyString="id"
                          labelString="name"
                          value={dataUpdate.status || ''}
                          onChangeValue={(value) => { onChangeUpdateValue('status', value) }}
                        />
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
        title='Detail User'
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
                        <Form.Control type="text" autoFocus maxLength={255} autoFocus
                          placeholder="Enter name of user" value={dataDetail.name || ''} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicNameBank">
                        <Form.Label className="starDanger">Email</Form.Label>
                        <Form.Control type="text" maxLength={255}
                          placeholder="Enter email of user" value={dataDetail.email || ''} />
                      </Form.Group>
                    </Form.Row>


                    <Form.Row>
                      <Form.Group as={Col} >
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" value={moment(dataDetail.birthday).format('YYYY-MM-DD') || ''} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} >
                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                          <div className="imgAvatarContainer">
                            <div className="imgAvatar">
                              {LinkImage ? <img src={srcImage} alt={srcImage} className="img-circle img-full-width" /> :
                                <img src={dataDetail.avatar} alt={dataDetail.avatar} className="img-circle img-full-width" />
                              }
                            </div>

                          </div>
                        </div>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicNameBank">
                        <Form.Label className="starDanger">Status</Form.Label>
                        <Form.Control type="text" maxLength={255}
                          placeholder="Enter email of user" value={dataDetail.status == '1' ? 'Active' : 'De-Active'} />
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
    </div>
  )
}

function AddUser(props) {
  const {
    ButtonLoading, SelectForm, ACTIVE_STATUS, makeRequest,
    showSuccessMessageIcon, showErrorMessage,
    inputNameRef,inputEmailRef
  } = props;
  const [dataRoleOneSelect, setDataRoleOneSelect] = useState([]);
  const [selectedOptionRole, setSelectedOptionRole] = useState(null);
  const history = useHistory()
  const [dataAdd, setData] = useState({});
  const [isLoadSubmit, setLoadSubmit] = useState(false);
  const [LinkImage, setLinkImage] = useState("");
  const [srcImage, setSrcImage] = useState("");
  const [isRefuse, setRefuse] = useState(false);
  const [isFirstLoad, setFirstLoad] = useState(false);
  const [dataCancel, setDataCancel] = useState({ visible: false });

  useEffect(() => {
    getDataRoleOneSelect();
  }, []);
  if (isRefuse) return <Redirect to="/Error403" />
  if (isFirstLoad) return <Redirect to="/" />
  const animatedComponents = makeAnimated();
  const getDataRoleOneSelect = () => {
    makeRequest("get", `role/getallRole`).then(({ data }) => {
      if (data.signal) {
        const res = data.data.dataRoleMap;
        setDataRoleOneSelect(res);
      }
    })
      .catch(err => {
        console.log(err)
      })
  };
  const enableLoadSubmit = () => {
    setLoadSubmit(true);
  };

  const disableLoadSubmit = () => {
    setLoadSubmit(false);
  };
  const onChangeValue = (key, value) => {
    setData({
      ...dataAdd,
      [key]: value
    })
    document.getElementById("status1").style.borderColor = "white";

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
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    dataAdd.List_Role = selectedOptionRole;
    if (!dataAdd.name) {
      console.log('name');
      inputNameRef.current.focus();
      return showErrorMessage('Please enter name! ');
    }
    if (!dataAdd.email) {
      inputEmailRef.current.focus();
      return showErrorMessage('Please enter email!');
    }
    if (!dataAdd.status) {
      document.getElementById("status1").style.borderColor = "#ff3333";
      return showErrorMessage('Please set status!')
    }
    enableLoadSubmit();
    let dataPost = new FormData();
    dataPost.append('file', LinkImage);
    dataPost.append('name', dataAdd.name);
    dataPost.append('email', dataAdd.email);
    if (dataAdd.birthday) {
      dataPost.append('birthday', dataAdd.birthday);
    }
    dataPost.append('status', dataAdd.status);
    dataPost.append('List_Role', JSON.stringify(selectedOptionRole));
    makeRequest('post', `user/create`, dataPost)
      .then(({ data }) => {
        if (data.signal) {
          showSuccessMessageIcon('Add Successfully!');
          history.push('/User/List');
        } else {
          showErrorMessage(data.message);
        }
        disableLoadSubmit();
      })
      .catch(err => {
        disableLoadSubmit();
      })
  }

  const showModalCancel = (iCan) => {
    setDataCancel({
      ...dataCancel,
      visible: true,
      iCan
    })
  }
  const clickModalCancelCancel = () => {
    setDataCancel({
      ...dataCancel,
      visible: false,
    })
  }
  const clickModalOk = () => {
    history.push('/User/List');
  }
  return (
    <div>
      <Card >
        <Card.Body>
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Add New User
                                    </span>
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicName">
                <Form.Label className="starDanger">Name</Form.Label>
                <Form.Control type="text" maxLength={255} autoFocus ref={inputNameRef} placeholder="Enter your name" value={dataAdd.name || ''} onChange={(e) => onChangeValue('name', e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} >
                <Form.Label className="starDanger">Email </Form.Label> <span id='tooltiptext'>Invalid Email</span>
                <Form.Control type="email" maxLength={255} ref={inputEmailRef} placeholder="Enter your email" value={dataAdd.email || ''} onChange={(e) => onChangeValue('email', e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Row>

              <Form.Group as={Col} >
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" maxLength={255} onChange={(e) => onChangeValue('birthday', e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label className="starDanger">Status</Form.Label>
                <div id="status1">
                  <SelectForm
                    optionData={ACTIVE_STATUS}
                    keyString="id"
                    labelString="name"
                    value={dataAdd.status || ''}
                    onChangeValue={(value) => { onChangeValue('status', value) }}
                  />
                </div>
              </Form.Group>

            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={6}>
                <Form.Label className="starDanger">Status</Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={dataRoleOneSelect}
                  onChange={setSelectedOptionRole}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={6}>
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                  <div className="imgAvatarContainer">
                    <div className="imgAvatar">
                      {LinkImage ? <img src={srcImage} alt={srcImage} className="img-circle img-full-width" /> :
                        <img src={dataAdd.avatar} alt={dataAdd.avatar} className="img-circle img-full-width" />
                      }
                    </div>
                    <div className="marginT10">
                      <label className="fileInputTextKT" htmlFor="inputGroupFile01">
                        Click here to upload logo
                                                        <input type="file" accept="image/*" id="inputGroupFile01" onChange={onChangeLink} />
                      </label>
                    </div>
                  </div>
                </div>
              </Form.Group>
            </Form.Row>

            <div className="kt-login__actions">

              <button type="button" id="cancelBtn" className="btn btn-secondary btn-elevate kt-login__btn-secondary" onClick={() => showModalCancel()}>Cancel</button>

              <ButtonLoading className='btn btn-primary' loading={isLoadSubmit} type="submit" >
                Add New
                                        </ButtonLoading>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Modal
        title='Cancel User'
        visible={dataCancel.visible}
        onOk={clickModalOk}
        onCancel={clickModalCancelCancel}
        cancelText='Cancel'
        okText='Ok'
      >
        <p>Do you want to cancel and quit ?</p>
      </Modal>
    </div>
  )
}

export { ListUser, AddUser };
