import Loadable from "components/Loadable";
import Farm from "pages/Consultant/Farm";
import Farms from "pages/Consultant/Farms";
import ConsultantNavigation from "pages/Consultant/Navigation";
import FarmerNavigation from "pages/Farmer/Navigation";
import ModelBuilderNavigation from "pages/ModelBuilder/Navigation";
import { lazy } from "react";
import { Outlet } from "react-router-dom";
import Private from "./PrivateRoute";
import Products from "pages/MillOwner/Products";
import MillOwnerNavigation from "pages/MillOwner/Navigation";
import Tracking from "./Tracking";

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
const CreateWorkflow = Loadable(lazy(() => import('pages/Consultant/CreateWorkflow')));
const AssignWorkflow = Loadable(lazy(() => import('pages/Consultant/AssignWorkflow')));

const UploadModel = Loadable(lazy(() => import('pages/ModelBuilder/UploadModel')));


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
              path: "my-field/:cropid",
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
          path: "farming",
          element: <Outlet />,
          children: [
            {
              path: "farms",
              element: <Farms />
            },
            {
              path: "farm/:cropid",
              element: <Farm />
            },
          ]
        },
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
        },
        {
          path: "workflow",
          element: <Outlet />,
          children: [
            {
              path: "assign",
              element: <AssignWorkflow />
            },
            {

              path: "create",
              element: <CreateWorkflow />
            },
          ]
        }
      ]
    },
    {
      path: "mill_owner",
      element: <MainLayout navigation={MillOwnerNavigation} />,
      children: [
        {
          path: "products",
          element: <Products />,
        }
      ]
    },
    {
      path: "model-builder",
      element: <MainLayout navigation={ModelBuilderNavigation} />,
      children: [
        {
          path: "model",
          element: <Outlet />,
          children: [
            {
              path: "upload",
              element: <UploadModel />
            }
          ]
        }
      ]
    }
  ],
};

export default MainRoutes;
