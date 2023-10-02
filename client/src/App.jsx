import { notification } from 'antd';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { persist, store } from './redux/store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { appRouter } from '@router';
import './scss/root.scss';
const App = () => {
  notification.config({
    duration: 500,
    rtl: true,
    maxCount: 1,
  });

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);
