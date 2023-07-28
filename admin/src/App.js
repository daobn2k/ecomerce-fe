import { notification } from 'antd';
import Loading from 'components/Loading';
import loadingManager from 'components/Loading/LoadingManager';
import { AuthContextProvider } from 'contexts/auth';
import { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router';
import { persist, store } from 'redux/store';
import { Provider } from 'react-redux';
import router from 'routes/root';
import { PersistGate } from 'redux-persist/integration/react';
import { useInitialize } from 'hooks/useInitialize';

function App() {
  notification.config({
    duration: 300,
    rtl: true,
    maxCount: 1,
  });

  const loadingRef = useRef();

  useEffect(() => {
    loadingRef && loadingManager.register(loadingRef);

    return () => {
      loadingManager.unregister(loadingRef);
    };
  }, []);

  useInitialize();

  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <AuthContextProvider>
          <Loading ref={loadingRef} />
          <RouterProvider router={router} />
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
