/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import objectPath from "object-path";
import Header from "./header/Header";
import SubHeader from "./sub-header/SubHeader";
import HeaderMobile from "./header/HeaderMobile";
import AsideLeft from "./aside/AsideLeft";
// import Footer from "./footer/Footer";
import ScrollTop from "../../app/partials/layout/ScrollTop";
// import StickyToolbar from "../../app/partials/layout/StickyToolbar";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import QuickPanel from "../../app/partials/layout/QuickPanel";
import KtContent from "./KtContent";
import "./assets/Base.scss";
import makeRequest from '../../app/libs/request';
import * as auth from "../../app/store/ducks/auth.duck";

const htmlClassService = new HTMLClassService();

function Layout(props) {
  let { children,
    asideDisplay,
    subheaderDisplay,
    selfLayout,
    layoutConfig } = props;
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  // window.scrollTo(0, 0);
  const [listNotify, setListNotify] = useState([]);

  useEffect(() => {
    let dataUser = {};
    makeRequest('get', 'user/userInfo')
      .then(({ data }) => {
        if (data.signal) {
          dataUser = data.data;
        } else {
          props.logout();
        }
      })
  }, [props])

  const clickOkModal = () => {
    let newList = [];

    let id = listNotify[0].id;

    if (listNotify.length > 1) {
      newList = listNotify.slice(1, listNotify.length)
    } else {
      newList = listNotify.slice(0, 0);
    }

    setListNotify(newList);

    makeRequest('get', `notification/createdistrinotify?notify_id=${id}`)
      .then(() => {
      }).catch(err => {
        console.log(err);
      })
  }

  const clickCancelModal = () => {
    let newList = [];
    newList = listNotify.slice(0, 0);
    setListNotify(newList);
  }

  return selfLayout !== "blank" ? (
    <LayoutInitializer
      menuConfig={MenuConfig}
      layoutConfig={LayoutConfig}
      htmlClassService={htmlClassService}
    >
      {/* <!-- begin:: Header Mobile --> */}
      <HeaderMobile />
      {/* <!-- end:: Header Mobile --> */}

      <div className="kt-grid kt-grid--hor kt-grid--root">
        {/* <!-- begin::Body --> */}
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
          {/* <!-- begin:: Aside Left --> */}
          {asideDisplay && (
            <>
              <AsideLeft />
            </>
          )}
          {/* <!-- end:: Aside Left --> */}
          <div
            className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
            id="kt_wrapper"
          >
            {/* <!-- begin:: Header READY --> */}

            <Header />
            {/* <!-- end:: Header --> */}

            {/* <!-- begin:: Content --> */}
            <div
              id="kt_content"
            >
              {/* <!-- begin:: Content Head --> */}
              {subheaderDisplay && (
                <SubHeader />
              )}
              {/* <!-- end:: Content Head --> */}

              {/* <!-- begin:: Content Body --> */}
              {/* TODO: add class to animate  kt-grid--animateContent-finished */}
              <KtContent>
                {children}
              </KtContent>
              {/*<!-- end:: Content Body -->*/}
            </div>
            {/* <!-- end:: Content --> */}
            {/* <Footer /> */}
          </div>
        </div>
        {/* <!-- end:: Body --> */}
      </div>
      <QuickPanel />
      <ScrollTop />
      <Modal
        title='Thông báo'
        visible={listNotify && listNotify.length > 0 ? true : false}
        cancelText='Đóng tất cả'
        okText='Đánh dấu đã đọc'
        onCancel={clickCancelModal}
        onOk={clickOkModal}
        width={500}
      >
        <div className="modal-header d-flex justify-content-center">
          <h5 className="heading text-h5">{listNotify && listNotify.length > 0 ? listNotify[0].title : null}</h5>
        </div>
        <div>
          <div>
            <div className="modal-dialog modal-notify modal-info" role="document">
              <div className="modal-content text-center">
                <div className="modal-body">
                  <i className="fas fa-bell fa-4x animated rotateIn mb-4" />
                  <p>{listNotify && listNotify.length > 0 ? listNotify[0].content : null}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* <StickyToolbar /> */}
    </LayoutInitializer>
  ) : (
      // BLANK LAYOUT
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <KtContent>
          {children}
        </KtContent>
      </div>
    );
}

const mapStateToProps = ({ builder: { layoutConfig } }) => ({
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display"),
  subheaderDisplay: objectPath.get(layoutConfig, "subheader.display"),
  desktopHeaderDisplay: objectPath.get(
    layoutConfig,
    "header.self.fixed.desktop"
  ),
  contentContainerClasses: ""
});

export default connect(mapStateToProps, auth.actions)(Layout);
