import { ChakraProvider } from '@chakra-ui/react';
import { PageRoutes } from './routes/PageRoutes';
import '@fontsource/exo-2/500.css';
import '@fontsource/overpass/400.css';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <PageRoutes />
    </ChakraProvider>
  );
}

export default App;
