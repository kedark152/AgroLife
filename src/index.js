import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </Router>
  </StrictMode>
);
