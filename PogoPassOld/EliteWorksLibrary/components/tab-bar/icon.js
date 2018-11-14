import React from 'react';
import { Icon } from 'expo';


const COLOR_ACTIVE = '#aaaaaa';
const COLOR_NOT_ACTIVE = '#000000';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? COLOR_ACTIVE : COLOR_NOT_ACTIVE}
      />
    );
  }
}