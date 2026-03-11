import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import AlgorithmVisualizer from "@/pages/AlgorithmVisualizer";
import ARExperience from "@/pages/ARExperience";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/visualizer",
        element: <AlgorithmVisualizer />,
      },
      {
        path: "/ar/:algorithmId",
        element: <ARExperience />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
