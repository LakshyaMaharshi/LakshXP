import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { store } from './store/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const CLERK_PUBLISHABLE_KEY = "pk_test_bGVuaWVudC10cmVlZnJvZy02MS5jbGVyay5hY2NvdW50cy5kZXYk";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      routerPush={(to) => window.location.hash = `#${to}`}
      routerReplace={(to) => window.location.replace(`#${to}`)}
    >
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);