import React from 'react';
import { NavLink } from 'react-router-dom';

class HeaderCategory extends React.Component {
  render() {
    return (
      <NavLink to={this.props.category.name} className={({isActive}) => isActive ? 'selected category' : 'category'}>
        {this.props.category.name}</NavLink>
    );
  }
}

export default HeaderCategory;
