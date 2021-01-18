import React, { useState, useEffect } from 'react'
import moment from "moment";
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
import DetailIcon from '@material-ui/icons/Details';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function BaseRole(props) {
  const { rows, LabelListRole,
    showModalUpdate, showModal,
    dataDelete, clickModalOk, clickModalCancel,
    dataAdd, clickModalAddCancel, onChangeAddValue, submitAdd, handleSubmitAdd, formAdd,
    dataUpdate, clickModalUpdateCancel, onChangeUpdateValue, submitUpdate, handleSubmitUpdate, formUpdate,
    dataPerOneSelect, setSelectedOptionPer, setSelectedOptionPerUpdate, selectedOptionPerUpdate,
    inputNameRef, inputPerRef, makeRequest, selectedOptionPer,
    index
  } = props;
  const [dataDetail, setDataDetail] = useState({ visible: false });
  const animatedComponents = makeAnimated();
  const showModalDetail = (row) => {
    makeRequest('get', `role/getRolebyId?role_id=${row.id}`)
      .then(({ data }) => {
        if (data.signal) {
          const res = data.data.rows.List_Per;
          row.permiss = res.map(x => { if (x.label === res[0].label) return res[0].label; else { return (' ' + x.label) } })
        }
        setDataDetail({
          ...row,
          visible: true
        })
      })
      .catch(err => {
        console.log(err)
      })

  }
  const clickModalDetailCancel = () => {
    setDataDetail({
      ...dataDetail,
      visible: false
    })
  }


  return (
    <div>
      <Table >
        <TableHead>
          <TableRow>
            {LabelListRole ? LabelListRole.map((label) => (
              <TableCell>{label.name}</TableCell>
            )) : ('')}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? rows.map((row,indexMap) => ( 
            indexMap = index + indexMap + 1,
            <TableRow>
              {LabelListRole ? LabelListRole.map((labelType, key) => (
                <TableCell>
                  {
                    labelType.type === 'index' ? (indexMap) : (
                      labelType.type === 'text' ? (row[labelType.key]) : (
                        labelType.type === 'date' ? moment(row[labelType.key]).format("HH:mm DD-MM-YYYY") : (
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
        title='Delete Role'
        visible={dataDelete.visible}
        onOk={clickModalOk}
        onCancel={clickModalCancel}
        cancelText='Cancel'
        okText='Ok'
      >
        <p>Do you want to delete this level?</p>
      </Modal>
      <Modal
        title='Add New Role'
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
                        <Form.Control type="text" autoFocus maxLength={255} ref={inputNameRef} placeholder="Enter Role Name" value={dataAdd.name || ''} onChange={(e) => onChangeAddValue('name', e.target.value)} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{ height: 100 }} type="text" as="textarea" rows="5" maxLength={500} placeholder="Enter Description" value={dataAdd.description || ''} onChange={(e) => onChangeAddValue('description', e.target.value)} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md={12}>
                        <Form.Label className="starDanger">Permission</Form.Label>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={dataPerOneSelect}
                          onChange={setSelectedOptionPer}
                          ref={inputPerRef}
                          value={selectedOptionPer}
                        />

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
                        <Form.Control type="text" autoFocus maxLength={255} placeholder="Enter role name" value={dataUpdate.name || ''} onChange={(e) => onChangeUpdateValue('name', e.target.value)} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicNameBank">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" autoFocus as="textarea" rows="5" maxLength={255} placeholder="Enter description" value={dataUpdate.description || ''} onChange={(e) => onChangeUpdateValue('description', e.target.value)} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md={12} >
                        <Form.Label className="starDanger">Permission</Form.Label>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          autosize={true}
                          isMulti
                          options={dataPerOneSelect}
                          onChange={setSelectedOptionPerUpdate}
                          value={selectedOptionPerUpdate}
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
                        <Form.Control readOnly type="text" as="textarea" rows="5" maxLength={255} placeholder="Enter description" value={dataDetail.description || ''} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formBasicNameBank">
                        <Form.Label className="starDanger">Permission</Form.Label>
                        <Form.Control placeholder="Permission of user" readOnly type="text" maxLength={255} value={dataDetail.permiss} />
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
  )
}
