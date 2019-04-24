import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import "antd/dist/antd.css";
import "./App.css";


class UserComponent extends Component {

  render() {
    const { avatar, showModal, likeClick, deleteUser } = this.props;
    const filled = avatar.like ? 'filled' : 'outlined';
    const website = `http://${avatar.website}`;
    return(
      <Card style={{ margin: 15 }}
        cover={<div className = "cardheaderImage"><img alt="example" className = 'imageContent' src={`https://avatars.dicebear.com/v2/avataaars/${avatar.username}.svg?options[mood][]=happy`} /></div>}
        actions={[<Icon type="heart" theme={filled} style = {{ color: '#eb2f96' }} twoToneColor="#eb2f96" onClick = {likeClick(avatar)} className = 'bottomIcon'/>, <Icon type="edit" className = 'bottomIcon' onClick = {showModal(avatar)}/>, <Icon type="delete" className = 'bottomIcon' onClick = {deleteUser(avatar.name)}/>]}>
        <h3>{avatar.name}</h3>
        <div>
          <Icon type="mail" className = 'iconStyle'/>
          <p>{avatar.email}</p>
        </div>
        <div>
          <Icon type="phone" className = 'iconStyle'/>
          <p>{avatar.phone}</p>
        </div>
        <div>
          <Icon type="global" className = 'iconStyle'/>
          <p>{website}</p>
        </div>
      </Card>
    )
  }
}
export default UserComponent;
