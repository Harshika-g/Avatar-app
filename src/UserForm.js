import React, { Component } from 'react';
import EditForm from './EditForm'
import { Modal } from 'antd';
import "antd/dist/antd.css";
import "./App.css";

class UserForm extends Component {
  render() {
    const { handleOk, handleCancel, userData } = this.props;
    const masked = true;
    const maskClosable = true;
    return(
      <Modal
        title="Basic Modal"
        visible={userData.visible}
        mask = {masked}
        maskClosable = {maskClosable}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      <EditForm userData = {userData}/>
    </Modal>
    )
  }
}

export default UserForm;
