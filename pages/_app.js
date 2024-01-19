/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/custom-bootstrap.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        {' '}
        {/* gives children components access to user and auth methods */}
        <ViewDirectorBasedOnUserAuthStatus
          // if status is pending === loading
          // if status is logged in === view app
          // if status is logged out === sign in page
          component={Component}
          pageProps={pageProps}
        />
      </AuthProvider>
      <ToastContainer />
    </>

  );
}

export default MyApp;
