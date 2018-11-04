import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Counter from './pages/counter/counter';
import Intro from './pages/intro/intro';
import Header from './components/header/header';
import PageContainer from './components/page-container';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00AAFF',
      dark: '#0080d0',
    },
    secondary: {
      main: '#FF8D00',
    },
    error: {
      main: '#FF0000',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <div style={{ width: '100%' }}>
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Route exact path="/" component={() => <PageContainer title="Introduction" Component={Intro} />} />
        <Route exact path="/match" component={() => <PageContainer title="Match" Component={Counter} />} />
      </MuiThemeProvider>
    </HashRouter>
  </div>
);
export default App;
