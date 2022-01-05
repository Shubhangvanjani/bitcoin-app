
import './App.css';
import AuthProvider from './context/AuthProvider';
import RootRoutes from './route';

function App() {

  return (
    <AuthProvider>
      <RootRoutes></RootRoutes>
    </AuthProvider>
  );
}

export default App;
