import React, { useState, useEffect } from "react";
import makeRequest from '../../libs/request';
import { showErrorMessage } from '../../actions/notification';
import { Form, Card, Col } from "react-bootstrap";
import ButtonLoading from "../../partials/common/ButtonLoading";
import SelectForm from '../../partials/common/SelectForm';
import { STATUS_ANSWER } from '../../config/common/testme'
import { Redirect } from "react-router-dom";
import { Modal, Pagination } from "antd";
import moment from "moment";
import "./user.css";
import Icon from "@material-ui/core/Icon";
import MathJax from 'react-mathjax-preview';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from "@material-ui/core";
import InputForm from '../../partials/common/InputForm';
import { PieChart } from 'react-minimal-pie-chart';
import {
    makeStyles
} from "@material-ui/core/styles";

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
const DetailUser = (props) => {
    const [dataSetTotal, setdataSetTotal] = useState({});
    const [dataDefault, setDataDefautl] = useState({});
    const [LinkImage, setLinkImage] = useState("");
    const [srcImage, setSrcImage] = useState("");
    const [srcImageQuestion, setSrcImageQuestion] = useState("");
    const [isRefuse, setRefuse] = useState(false);
    const [isFirstLoad, setFirstLoad] = useState(false);
    const [dataCancel, setDataCancel] = useState({ visible: false });
    const detailId = props.match.params.id;
    const [isLoadQuestion, setLoadQuestion] = useState(true);
    const [rows, setRow] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const classes1 = useStyles1();
    const [page, setPage] = useState(1);
    const [dataSearch, setData] = useState({});
    const [isLoadSearch, setLoadSearch] = useState(false);
    const [isLoad, setLoad] = useState(false);
    const [dataDetail, setDataDetail] = useState({
        topicData: '', paperData: '', levelData: '',
        titleData: '', typeData: '', descriptionData: '', partialData: '', answerData: '', hintData: '', timeData: '', visible: false
    });
    const [image, setImage] = useState("");
    const inputNameBankRef = React.createRef();
    const inputDescriptionRef = React.createRef();
    let index = (page === 1 ? 0 : (rowsPerPage * (page - 1)));

    const defaultLabelStyle = {
        fontSize: '7px',
        fontFamily: 'sans-serif',


    };
    useEffect(() => {

        getUserById(detailId);
        setChartData(detailId);
        historyList({ page: 1, limit: rowsPerPage });
    }, []);


    if (isRefuse) return <Redirect to="/Error403" />
    if (isFirstLoad) return <Redirect to="/" />



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
        props.history.push(`/User/List`)
    }

    const getUserById = (id) => {
        makeRequest("get", `user/userDetail?id=${id}`)
            .then(({ data }) => {
                if (data.signal) {
                    setDataDefautl(data.data);

                } else {
                    showErrorMessage(data.message);
                    return props.history.push("/User/List");
                }
                setLoadQuestion(false);
            })
            .catch((err) => {
                setLoadQuestion(false);
                showErrorMessage(err);
                return props.history.push("/User/List");
            });
    };

    const getDate = (data) => {
        let d = new Date(data);
        let n = d.getDay();
        if (parseInt(n) < 10) {
            n = 0 + '' + n;
        }
        let m = d.getMonth();
        if (parseInt(m) < 10) {
            m = 0 + '' + m;
        }
        let y = d.getFullYear();
        let fullDate = "" + n + "-" + m + "-" + y + "";

        return fullDate;
    };


    const setChartData = (id) => {
        makeRequest("get", `answer/quesAndSetting?id=${id}`)
            .then(({ data }) => {
                if (data.signal) {
                    setdataSetTotal(data.data);

                } else {
                    showErrorMessage(data.message);
                    return props.history.push("/User/List");
                }
                setLoadQuestion(false);
            })
            .catch((err) => {
                setLoadQuestion(false);
                showErrorMessage(err);
                return props.history.push("/User/List");
            });
    };
    const historyList = (dataSearch = {}) => {
        makeRequest('get', `user/getUserHistory?id=${detailId}`, dataSearch)
            .then(({ data }) => {
                if (data.signal) {
                    const res = data.data.userHistory_List;
                    setRow(res);
                    setTotal(data.data.total);
                    setLoadSearch(false);
                }

            })
            .catch(err => {
                setLoadSearch(false);
                console.log(err)
            })
    }
    const renderStatusText = (category) => {
        if (category === 1) {
            return (<span className="btn btn-label-primary btn-bold btn-sm btn-icon-h" style={{ borderRadius: '.42rem' }}>Correct</span>);
        } else {
            return (<span className="btn btn-label-warning btn-bold btn-sm btn-icon-h" style={{ borderRadius: '.42rem' }}>Wrong</span>);
        }
    }
    const onChangeValueSearch = (key, value) => {
        setData({
            ...dataSearch,
            [key]: value
        })
    }

    const unfilteredData = (e) => {
        setData({
            title: '',
            status: '',
            ans_update: ''
        });
        setPage(1);

        historyList({ page: 1, limit: rowsPerPage });
        setLoad(false);
    }
    const handleChangePage = (newPage) => {
        setPage(newPage);
        if (isLoad) {
            historyList({ ...dataSearch, page: newPage, limit: rowsPerPage });
            return;
        }
        historyList({ page: newPage, limit: rowsPerPage });
        return;
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        historyList(dataSearch, setPage(1));
        setLoad(true);
    }
    const clickModalDetailCancel = () => {
        setDataDetail({
            ...dataDetail,
            visible: false
        })
    }
    const showModalDetail = (row) => {
        makeRequest('get', `question/getById?id=${row.questionId}`)
            .then(({ data }) => {
                if (data.signal) {
                    let dataTitleDetailResult = data.data.title;
                    let dataTopicDetailResult = data.data.topic.map(x => { if (x.label === data.data.topic[0].label) return data.data.topic[0].label; else { return (' ' + x.label) } });
                    let dataPaperDetailResult = data.data.paper.map(x => { if (x.label === data.data.paper[0].label) return data.data.paper[0].label; else { return (' ' + x.label) } });
                    let dataLevelDetailResult = data.data.level.map(x => { if (x.label === data.data.level[0].label) return data.data.level[0].label; else { return (' ' + x.label) } });
                    let dataTypeDetailResult = data.data.type;
                    let dataTimeDetailResult = data.data.time;
                    if ('' + data.data.type === '1') {
                        setImage(data.data.question_content);
                    }
                    let dataDesDetailResult = `${data.data.question_content}`;
                    let dataDeslinebreak = dataDesDetailResult.replaceAll('<mspace linebreak="newline">', '</math><br><math xmlns="http://www.w3.org/1998/Math/MathML">');
                    let dataParDetailResult = `${data.data.partial_mark}`;
                    let dataParlinebreak = dataParDetailResult.replaceAll('<mspace linebreak="newline">', '</math><br><math xmlns="http://www.w3.org/1998/Math/MathML">');
                    let dataAnsDetailResult = `${data.data.answer}`;
                    let dataAnslinebreak = dataAnsDetailResult.replaceAll('<mspace linebreak="newline"/>', '</math><br><math xmlns="http://www.w3.org/1998/Math/MathML">');
                    let dataHintDetailResult = `${data.data.hint}`;
                    let dataHintlinebreak = dataHintDetailResult.replaceAll('<mspace linebreak="newline">', '</math><br><math xmlns="http://www.w3.org/1998/Math/MathML">');


                    setDataDetail({
                        typeData: dataTypeDetailResult,
                        titleData: dataTitleDetailResult,
                        topicData: dataTopicDetailResult,
                        paperData: dataPaperDetailResult,
                        levelData: dataLevelDetailResult,
                        timeData: dataTimeDetailResult,
                        descriptionData: dataDeslinebreak,
                        partialData: dataParlinebreak,
                        answerData: dataAnslinebreak,
                        hintData: dataHintlinebreak,
                        visible: true
                    })
                }

            })
            .catch(err => {
                setLoadSearch(false);
                console.log(err)
            })
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="kt-section">
                        <Card >
                            <Card.Body>
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label font-weight-bolder text-dark">
                                        User Details
                                    </span>
                                </h3>
                                <Form >
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formBasicName">

                                            <Form.Label column sm="8" >
                                                <div className="imgAvatarContainer">
                                                    <div className="imgAvatar">
                                                        {(dataDefault.avatar == null || dataDefault.avatar == '') ? (<img id="avatar" src="/images/avatar.png" alt="/images/avatar.png" />) :
                                                            (<img id="avatar" src={dataDefault.avatar} alt={dataDefault.avatar} className="img-circle img-full-width" />)
                                                        }
                                                    </div>
                                                </div>
                                            </Form.Label>

                                        </Form.Group>
                                        <Form.Group as={Col} style={{ marginRight: '70px'}}>
                                            <Form.Row> <Form.Label id="lable-info">Name: {dataDefault.name} </Form.Label></Form.Row>
                                            <Form.Row> <Form.Label id="lable-info" >Email: {dataDefault.email} </Form.Label></Form.Row>
                                            {dataDefault.birthday != null ? (
                                                <Form.Row> <Form.Label >Birthday: {moment(dataDefault.birthday).format("DD-MM-YYYY")} </Form.Label></Form.Row>
                                            ) : (
                                                    <Form.Row> <Form.Label >Birthday: </Form.Label></Form.Row>
                                                )}
                                            <Form.Row>  <Form.Label >Days Left: {dataDefault.ans_update} </Form.Label></Form.Row>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <div >
                                                {(dataSetTotal.totalAns != 0) ?
                                                    <PieChart style={{ width: '230px' }}
                                                        data={[
                                                            { title: 'Total', value: dataSetTotal.totalAns, color: '#00bfff' },
                                                            { title: 'Correct', value: dataSetTotal.totalCorrect, color: '#00ff00' },
                                                            { title: 'Wrong', value: dataSetTotal.totalWrong, color: '#ff0000' },
                                                        ]}

                                                        lineWidth={60}
                                                        paddingAngle={2}
                                                        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                                                        labelStyle={defaultLabelStyle}
                                                        labelPosition={68}
                                                        lengthAngle={-360}
                                                        animate

                                                    />
                                                    :
                                                    ('')
                                                }
                                            </div>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Row> <Form.Label>Total: {dataSetTotal.totalAns}  </Form.Label> </Form.Row>
                                            <Form.Row> <Form.Label style={{ color: '#00ff00' }}>{dataSetTotal.totalCorrect} correct  </Form.Label></Form.Row>
                                            <Form.Row>  <Form.Label style={{ color: '#ff0000' }}>{dataSetTotal.totalWrong} wrong</Form.Label></Form.Row>
                                        </Form.Group>
                                    </Form.Row>
                                    <div className='col-md-12'>
                                        <Form onSubmit={handleSubmit}>


                                            <div className='form-row'>

                                                <div className="form-group col-md-2" id="search-box" >
                                                    <InputForm
                                                        type="text"
                                                        placeholder="Search name "
                                                        value={dataSearch.title || ''}
                                                        onChangeValue={(value) => { onChangeValueSearch('title', value) }}
                                                        focus={true}
                                                    />
                                                </div>

                                                <div className="form-group col-md-2" d data-toggle="tooltip" title="Search By Status" >
                                                    <SelectForm
                                                        placeholder="Choose status"
                                                        optionData={STATUS_ANSWER}
                                                        keyString="id"
                                                        labelString="name"
                                                        value={dataSearch.status || ''}
                                                        onChangeValue={(value) => { onChangeValueSearch('status', value) }}
                                                    />
                                                </div>


                                                <div className='form-group col-md-4'>
                                                    <div className="form-group" style={{ display: 'flex' }} >
                                                        <button className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10" onClick={unfilteredData} style={{ marginLeft: 10, marginTop: 3 }} type="button"><span>Clear</span></button>
                                                        <ButtonLoading type="submit" loading={isLoadSearch} className="btn btn-label-primary btn-bold btn-sm btn-icon-h kt-margin-l-10"
                                                            style={{ marginLeft: 10, marginTop: 3 }} ><span>Search</span></ButtonLoading>
                                                    </div>
                                                </div>
                                            </div>

                                        </Form>
                                    </div>
                                    <Table className={classes1.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No</TableCell>
                                                <TableCell>Question</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Created date</TableCell>
                                                <TableCell style={{ width: 150 }}>Action</TableCell>


                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.length ? rows.map((row, key) => (

                                                <TableRow key={`user${row.id}`}>
                                                    <TableCell>
                                                        {index = index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.title}
                                                    </TableCell>
                                                    <TableCell>{renderStatusText(row.status)}</TableCell>
                                                    <TableCell> {moment(row.createdAt).format("HH:mm DD-MM-YYYY")}</TableCell>
                                                    <TableCell>
                                                        <span style={{ cursor: 'pointer' }} d data-toggle="tooltip" data-placement="top" title="Detail data"><Icon className="fa fa-info-circle" onClick={(e) => showModalDetail(row)} style={{ color: '#ffa800', fontSize: 15 }} /></span>

                                                    </TableCell>
                                                </TableRow>
                                            )) : (
                                                    <TableRow>
                                                        <TableCell colSpan={10} align="center">No data</TableCell>
                                                    </TableRow>
                                                )}
                                        </TableBody>
                                    </Table>

                                </Form>
                            </Card.Body>


                        </Card>


                        {total > rowsPerPage && (
                            <div className="customSelector custom-svg">
                                <Pagination className="pagination-crm" current={page} pageSize={rowsPerPage} total={total} onChange={(p, s) => handleChangePage(p)} />
                            </div>
                        )}
                        <Modal
                            title='Detail Question'
                            visible={dataDetail.visible}
                            cancelText='Cancel'
                            okText='OK'
                            onCancel={clickModalDetailCancel}
                            onOk={clickModalDetailCancel}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            width={1000}
                        >
                            <>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="kt-section">
                                            <Card >
                                                <Card.Body>
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formBasicNameBank">
                                                                <Form.Label className="starDanger">Question</Form.Label>
                                                                <Form.Control readOnly type="text" maxLength={255} value={dataDetail.titleData} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col}>
                                                                <Form.Label className="starDanger">Topic</Form.Label>
                                                                <Form.Control readOnly type="text" maxLength={255} value={dataDetail.topicData} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col}>
                                                                <Form.Label className="starDanger">Page</Form.Label>
                                                                <Form.Control readOnly type="text" maxLength={255} value={dataDetail.paperData} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col}>
                                                                <Form.Label className="starDanger">Level</Form.Label>
                                                                <Form.Control readOnly type="text" maxLength={255} value={dataDetail.levelData} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        {dataDetail.typeData == '0' ? (
                                                            <Form.Row>
                                                                <Form.Group as={Col} controlId="formBasicName">

                                                                    <Form.Label className="starDanger">Question description</Form.Label>
                                                                    <MathJax math={dataDetail.descriptionData} />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        ) : (
                                                                <Form.Row>
                                                                    <Form.Group as={Col} md={6}>
                                                                        <Form.Label className="starDanger">Question description</Form.Label>
                                                                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                                                                            <div style={{ width: 250 }} className="imgAvatarContainer">
                                                                                <div className="imgAvatar">
                                                                                    {LinkImage ? <img src={srcImageQuestion} alt={srcImageQuestion} className="img-circle img-full-width" /> :
                                                                                        <img src={image} alt={image} className="img-circle img-full-width" />
                                                                                    }
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            )}
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formBasicName">
                                                                <Form.Label className="starDanger">Partial Marks</Form.Label>
                                                                <MathJax math={dataDetail.partialData} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formBasicName">
                                                                <Form.Label className="starDanger">Answer</Form.Label>
                                                                <MathJax math={dataDetail.answerData} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formBasicName">
                                                                <Form.Label className="starDanger">Hint</Form.Label>
                                                                <MathJax math={dataDetail.hintData} />
                                                            </Form.Group>
                                                        </Form.Row>

                                                        <Form.Row>
                                                            <Form.Group as={Col}>
                                                                <Form.Label className="starDanger">Time</Form.Label>
                                                                <Form.Control readOnly type="text" autoFocus maxLength={255} ref={inputDescriptionRef} value={dataDetail.timeData || ''} />
                                                            </Form.Group>
                                                        </Form.Row>

                                                        <Button variant="primary" type="submit" visible={false} style={{ width: 0, height: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }} >
                                                        </Button>
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </Modal>
                        <Modal
                            title='Cancel Question'
                            visible={dataCancel.visible}
                            onOk={clickModalOk}
                            onCancel={clickModalCancelCancel}
                            cancelText='Cancel'
                            okText='Ok'
                        >
                            <p>Do you want to cancel and quit ?</p>
                        </Modal>

                    </div>
                    <div className="kt-login__actions">

                        <button type="button" id="cancelBtn" className="btn btn-secondary btn-elevate kt-login__btn-secondary" onClick={() => showModalCancel()}>Cancel</button>

                    </div>
                </div>
            </div>
        </>
    );

}
export default DetailUser;