import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, UserPage } from '../pages/public';
import { PublicRoute } from './PublicRouter';
import { PrivateRoute } from './PrivateRouter';
import { PerfilPage, TaskPage, NewtaskPage, EdittaskPage } from '../pages/private';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/newtasks" element={<NewtaskPage />} />
          <Route path="/edittasks" element={<EdittaskPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};
