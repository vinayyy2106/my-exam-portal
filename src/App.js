
import './App.css';
import AppRoutes from './routes/AppRoutes';

import { ToastContainer } from 'react-toast';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <>
      <UserProvider>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          delay={3000}
        />
      </UserProvider>
    </>
  );
}

export default App;
