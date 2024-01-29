import './App.css';
import ItemComponent from './component/Item.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import AccountMenu from './component/AccountMenu.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication, { AuthMode, isAuthenticated, setToken } from './component/Authentication.tsx';
import { useState } from 'react';


function App() {
  let [authenticated,setAuthenticated] = useState(isAuthenticated());
  const setAuthenticatedW = (token: string) => {
    setToken(token);
    setAuthenticated(isAuthenticated());
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <AccountMenu isLoggedIn={authenticated} setAuthenticated={setAuthenticatedW}></AccountMenu>
            <ItemComponent isLoggedIn={authenticated} />
          </>
        } />
        <Route path={"/" + AuthMode.signing} element={<Authentication authMode={AuthMode.signing} setAuthenticated={setAuthenticatedW} />} />
        <Route path={"/" + AuthMode.signup} element={<Authentication authMode={AuthMode.signup} setAuthenticated={setAuthenticatedW} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
