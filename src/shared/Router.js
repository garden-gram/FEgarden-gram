import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../pages/Auth';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile/mypage/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
