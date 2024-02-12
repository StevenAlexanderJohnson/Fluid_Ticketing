import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from './pages/Landing';
import Login from './pages/Login';
import CompanySelect from './pages/CompanySelect';
import { setCompany } from './store/reducers/companySlice';
import Logout from './pages/Logout';
import CompanyDashboard from './pages/CompanyDashboard';
import Dashboard from './pages/Dashboard';
import { setProject } from './store/reducers/projectSlice';
import { setTickets } from './store/reducers/ticketSlice';

function App() {
  const authenticated = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const auth_token = useSelector((state: any) => state.auth.token);
  const routes = authenticated
    ? [
      {
        path: '/:companyId',
        loader: async ({ params }: { params: any }) => {
          const response = await fetch(
            `http://localhost:3000/api/company/${params.companyId}`,
            {
              headers: {
                'authorization': `Bearer ${auth_token}`
              }
            }
          );
          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = await response.json();
          dispatch(setCompany(data));

          return null;
        },
        element: <Home />,
        children: [
          {
            path: '',
            element: <CompanyDashboard />
          },
          {
            path: ':projectId',
            loader: async ({params}: {params: any}) => {
              const response = await fetch(
                `http://localhost:3000/api/company/${params.companyId}/project/${params.projectId}/ticket`,
                {
                  headers: {
                    'authorization': `Bearer ${auth_token}`
                  }
                }
              );
              if (!response.ok) {
                throw new Error(response.statusText);
              }

              const data = await response.json();
              dispatch(setTickets(data));
              return null;
            },
            element: <Dashboard />
          },
          {
            path: 'tickets',
            element: <Tickets />
          },
        ]
      },
      {
        path: '/',
        element: <Home />,
        children: [
          { path: '', element: <CompanySelect /> }
        ],
        errorElement: <div>Error</div>,
      },
      {
        path: '/logout',
        element: <Logout />
      }
    ]
    : [
      {
        path: '/',
        element: <LandingPage />,
        errorElement: <Navigate to="/" replace />,
      },
      {
        path: '/login',
        element: <Login />
      }
    ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />
}

export default App
