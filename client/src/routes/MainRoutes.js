import { lazy } from "react";
import Loadable from "components/Loadable";
import { Outlet } from "react-router-dom";
import Private from "./PrivateRoute";
import FarmerNavigation from "pages/Farmer/Navigation";
import ConsultantNavigation from "pages/Consultant/Navigation";
// import AddField from "pages/Farmer/AddField";
// import MyField from "pages/Farmer/MyField";
// import MyFields from "pages/Farmer/MyFields";
// import ConnectConsultants from "pages/Farmer/Consultants";
// import ConnectDataProviders from "pages/Farmer/DataProviders";
// import Prediction from "pages/Farmer/Prediction";
// import FarmerRequests from "pages/Consultant/FarmerRequests";
// import DataProviderRequests from "pages/Consultant/DataProviderRequests";
// import ModelBuilderRequests from "pages/Consultant/ModelBuilderRequests";
// import MainLayout from "layout/MainLayout";

const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));

const AddField = Loadable(lazy(() => import('pages/Farmer/AddField')));
const MyFields = Loadable(lazy(() => import('pages/Farmer/MyFields')));
const MyField = Loadable(lazy(() => import('pages/Farmer/MyField')));
const ConnectConsultants = Loadable(lazy(() => import('pages/Farmer/Consultants')));
const ConnectDataProviders = Loadable(lazy(() => import('pages/Farmer/DataProviders')));
const Prediction = Loadable(lazy(() => import('pages/Farmer/Prediction')));

const FarmerRequests = Loadable(lazy(() => import('pages/Consultant/FarmerRequests')));
const DataProviderRequests = Loadable(lazy(() => import('pages/Consultant/DataProviderRequests')));
const ModelBuilderRequests = Loadable(lazy(() => import('pages/Consultant/ModelBuilderRequests')));


const MainRoutes = {
  path: "/",
  element: <Private />,
  children: [
    {
      path: "farmer",
      element: <MainLayout navigation={FarmerNavigation} />,
      children: [
        {
          path: "farm",
          element: <Outlet />,
          children: [
            {
              path: "add-field",
              element: <AddField />,
            },
            {
              path: "my-fields",
              element: <MyFields />,
            },
            {
              path: "my-field/:fieldId",
              element: <MyField />,
            },
          ]
        },
        {
          path: "connect",
          element: <Outlet />,
          children: [
            {
              path: "consultants",
              element: <ConnectConsultants />,
            },
            {
              path: "data-providers",
              element: <ConnectDataProviders />,
            },
          ]
        },
        {
          path: "prediction",
          element: <Outlet />,
          children: [
            {
              path: "predict",
              element: <Prediction />,
            }
          ]
        }
      ]
    },
    {
      path: "consultant",
      element: <MainLayout navigation={ConsultantNavigation} />,
      children: [
        {
          path: "requests",
          element: <Outlet />,
          children: [
            {
              path: "farmer",
              element: <FarmerRequests />
            },
            {
              path: "data-provider",
              element: <DataProviderRequests />
            },
            {
              path: "model-builder",
              element: <ModelBuilderRequests />
            }
          ]
        }
      ]
    }
  ],
};

export default MainRoutes;
