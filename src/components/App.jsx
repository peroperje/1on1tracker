import React, { Component, PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green100, green500, green700 } from 'material-ui/styles/colors';


import Header from './Header';
import LeftDrawer from './LeftDrawer';
import store from '../store';
import { listenToAuth } from '../actions/auth';

const propTypes = {
  children: PropTypes.object.isRequired,
};

const styles = {
  container: {
    paddingTop: 56,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {open: false};
  }

  componentDidMount() {
    store.dispatch(listenToAuth());
  }

  handleMenuTap = () => this.setState({open: !this.state.open});

  handleNavigate = (path) => {
    this.setState({open: false});
    this.context.router.push(path);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Header onLeftIconButtonTouchTap={this.handleMenuTap}  />
          <LeftDrawer open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            handleNavigate={this.handleNavigate}
          />
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = propTypes;

export default App;
