import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserComponent from './UserComponent';
import UserForm from './UserForm';
import _ from 'lodash';
import { Col } from 'antd';
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
    }
  }

  updateState(allUsers) {
    this.setState({
      users: allUsers
    });
  }

  showModal = user => e => {
    _.forEach(this.state.users, (obj) => {
      if(obj === user) {
        obj.formData.visible = true;
      }
    });
    this.updateState(this.state.users);
  }

  handleOk = (e) => {
    const { name, email, phone, website, userOriginalId } = this.props.changedUser;
    var re = /\S+@\S+\.\S+/;
    if (name.length <= 0 || email.length <=0 || phone.length <=0 || website.length <=0 || !re.test(email)) {
      return;
    }
    _.forEach(this.state.users, (obj) => {
      if(obj.id === userOriginalId) {
        obj.formData.visible = false;
        obj.name = name;
        obj.email = email;
        obj.phone = phone;
        obj.website = website;
      }
    });
    this.updateState(this.state.users);
  }

  handleCancel = (e) => {
    _.forEach(this.state.users, (obj) => {
      obj.formData.visible = false;
    });
    this.updateState(this.state.users);
  }

  deleteUser = user => e => {
    const filtered = _.filter(this.state.users, (obj) => {
      return obj.name !== user;
    });
    this.updateState(filtered);
  }

  likeClick = (user) => e => {
    _.forEach(this.state.users, (obj) => {
      if(obj === user) {
        obj.like = !obj.like;
      }
    });
    this.updateState(this.state.users);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' })
      .then(response => response.json())
      .then((result) => {
          _.forEach(result, (obj) => {
            obj.like = false;
            obj.edited = false;
            obj.formData = {
              name: obj.name,
              phone: obj.phone,
              email: obj.email,
              website: obj.website,
              visible: false,
              id: obj.id
            }
          });
          this.setState({
            users: result,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    if (this.state.error || this.state.users.length <= 0) {
      return (
        <div className = "spinner">
          <div className = "bounce1"></div>
          <div className = "bounce2"></div>
          <div className = "bounce3"></div>
        </div>
      );
    } else {
      let users = [];
      _.forEach(this.state.users, (user, i) => {
        users.push(
          <div key = {`div_${i}`}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} key = {`div_${i}`} className = 'userCss'>
            <UserComponent avatar = {user} deleteUser = {this.deleteUser} likeClick = {this.likeClick} showModal = {this.showModal}/>
          </Col>
          <UserForm handleOk = {this.handleOk} handleCancel = {this.handleCancel} visible = {this.state.visible} userData = {user.formData}/>
        </div>)
      })
        return (
          <div>
            {users}
          </div>
        );
      }
    }
}

const mapStateToProps = (state) => {
  if(state.users) {
    return state.users;
  } else {
    return {}
  }
}

export default connect(mapStateToProps, {})(App);
