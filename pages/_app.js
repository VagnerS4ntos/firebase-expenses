import '../styles/globals.css';
import { store } from '../globalStates/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
