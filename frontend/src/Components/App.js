import './App.css';
import EventDetails from './EventDetails';
import Login from "./Login";
import Navbar from './Navbar';
import Wellcome from './Wellcome';
import ErrorPage from './ErrorPage';
import CreateEvent from './CreateEvent';
import Home from './Home';
import AwarenessProgram from './AwarenessProgram';
import { createBrowserRouter, RouterProvider, Route, Routes, useRouteError } from 'react-router-dom';
import Dashboard from './Dashboard';
import CalendarCallback from './CalendarCalback';

const router = createBrowserRouter([

  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        // path: '/',
        index: true,
        element: <Home />
      },
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: '/wellcome',
        element: <Wellcome />
      },
      {
        path: '/event/:eventId',
        element: <EventDetails />
      },
      {
        path: "/:user/createEvent",
        element: <CreateEvent />
      },
      {
        path: "/dashboard/:user",
        element: <Dashboard />
      },
      {
        path: "/awarenessprograms",
        element: <AwarenessProgram />
      },
      {
        path: '/calendar/google/callback',
        element: <CalendarCallback />
      }
    ]
  }

])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/wellcome" element={<Wellcome />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/dashboard/:user" element={<Dashboard />} />
        </Routes>
      </BrowserRouter> */}
    </div >
  );
}

export default App;
