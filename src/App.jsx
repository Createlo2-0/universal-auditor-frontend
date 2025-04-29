import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/routes.jsx';
import CustomToaster from './components/CustomeToast/CustomToaster.jsx';

const App = () => {

  return (
    <Router>
      <main className="h-screen w-screen overflow-x-hidden">
        <CustomToaster />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </Router>
  );
};

export default App;