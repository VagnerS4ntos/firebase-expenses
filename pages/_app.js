import '../styles/globals.css';
import { store } from '../globalStates/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
