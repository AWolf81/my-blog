import React from 'react';
import MainPane from '../MainPane';
import Navigation from '../Navigation';

class Template extends React.Component {
  render() {
    const { children, location } = this.props;

    return (
      <MainPane>
        {location.pathname !== '/' && <Navigation />}
        {children}
      </MainPane>
    );
  }
}

export default Template;
