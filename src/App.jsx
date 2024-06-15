import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/HomePage"
import NotFoundPage from './pages/NotFoundPage';
import CoinPage from './pages/CoinPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/coins/:id' element={<CoinPage />} />
      <Route path='*' element={<NotFoundPage />}/>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
