import React from 'react';
import { editUser } from './actions/UserActions';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form, Input,
} from 'antd';


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    const { name, email, phone, website, id } = this.props.userData;
    this.state = {
      name,
      email,
      phone,
      website,
      userOriginalId: id,
    }
  }

  nameChangehandler = (userId) => (e) => {
    this.setState({
      name: e.target.value,
      userOriginalId: userId
    });
    this.props.editUser({...this.state, name: e.target.value});
  }

  emailChangehandler = (userId) => (e) => {
    this.setState({
      email: e.target.value,
      userOriginalId: userId
    });
    this.props.editUser({...this.state, email: e.target.value});
  }

  numberChangehandler = (userId) => (e) => {
    this.setState({
      phone: e.target.value,
      userOriginalId: userId
    });
    this.props.editUser({...this.state, phone: e.target.value});
  }

  websiteChangehandler = (userId) => (e) => {
    this.setState({
      website: e.target.value,
      userOriginalId: userId
    });
    this.props.editUser({...this.state, website: e.target.value});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userData } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Form.Item
        label={(
          <span>
            Name&nbsp;
          </span>
        )}
      >
        {getFieldDecorator('nickname', {
          initialValue: [userData.name],
          rules: [{ required: true, message: 'This field is required', whitespace: true }],
        })(
          <Input onChange = {this.nameChangehandler(userData.id)}/>
        )}
      </Form.Item>
        <Form.Item
          label="E-mail"
        >
          {getFieldDecorator('email', {
            initialValue: [userData.email],
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'This field is required',
            }],
          })(
            <Input onChange = {this.emailChangehandler(userData.id)}/>
          )}
        </Form.Item>
        <Form.Item
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            initialValue: [userData.phone],
            rules: [{ required: true, message: 'This field is required' }],
          })(
            <Input style={{ width: '100%' }} onChange = {this.numberChangehandler(userData.id)}/>
          )}
        </Form.Item>
        <Form.Item
          label="Website"
        >
          {getFieldDecorator('website', {
            initialValue: [userData.website],
            rules: [{ required: true, message: 'This field is required' }],
          })(
              <Input onChange = {this.websiteChangehandler(userData.id)}/>
          )}
        </Form.Item>
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  if(state.users.allUsers) {
    return state.users;
  } else {
    return {}
  }
}

const EditForm = Form.create({ name: 'register' })(RegistrationForm);
export default connect(mapStateToProps, { editUser })(EditForm);
