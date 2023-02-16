// import DataProviderRequests from 'pages/Consultant/DataProviderRequests';
// import FarmerRequests from 'pages/Consultant/FarmerRequests';
// import ModelBuilderRequests from 'pages/Consultant/ModelBuilderRequests';
// import ConsultantNavigation from 'pages/Consultant/Navigation';
// import AddField from 'pages/Farmer/AddField';
// import ConnectConsultants from 'pages/Farmer/Consultants';
// import ConnectDataProviders from 'pages/Farmer/DataProviders';
// import MyField from 'pages/Farmer/MyField';
// import MyFields from 'pages/Farmer/MyFields';
// import FarmerNavigation from 'pages/Farmer/Navigation';
// import Prediction from 'pages/Farmer/Prediction';
// import {
//   createBrowserRouter,
//   Outlet,
//   RouterProvider
// } from "react-router-dom";
// import MainLayout from './layout/MainLayout';
// import Landing from './pages/Landing';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },
//   {
//     path: "farmer",
//     element: <MainLayout navigation={FarmerNavigation} />,
//     children: [
//       {
//         path: "farm",
//         element: <Outlet />,
//         children: [
//           {
//             path: "add-field",
//             element: <AddField />,
//           },
//           {
//             path: "my-fields",
//             element: <MyFields />,
//           },
//           {
//             path: "my-field/:fieldId",
//             element: <MyField />,
//           },
//         ]
//       },
//       {
//         path: "connect",
//         element: <Outlet />,
//         children: [
//           {
//             path: "consultants",
//             element: <ConnectConsultants />,
//           },
//           {
//             path: "data-providers",
//             element: <ConnectDataProviders />,
//           },
//         ]
//       },
//       {
//         path: "prediction",
//         element: <Outlet />,
//         children: [
//           {
//             path: "predict",
//             element: <Prediction />,
//           }
//         ]
//       }
//     ]
//   },
//   {
//     path: "consultant",
//     element: <MainLayout navigation={ConsultantNavigation} />,
//     children: [
//       {
//         path: "requests",
//         element: <Outlet />,
//         children: [
//           {
//             path: "farmer",
//             element: <FarmerRequests />
//           },
//           {
//             path: "data-provider",
//             element: <DataProviderRequests />
//           },
//           {
//             path: "model-builder",
//             element: <ModelBuilderRequests />
//           }
//         ]
//       }
//     ]
//   }
// ]);

// const App = () => {
//   return (
//     <RouterProvider router={router} />
//   )
// }

// export default App


import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
