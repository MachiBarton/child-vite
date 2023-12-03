/* eslint-disable react-refresh/only-export-components */

import { lazyLoad } from "./utils";

const routes = [
  {
    path: "/",
    element: lazyLoad("/Home"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/app",
    element: lazyLoad("/First"),
    meta: {
      title: "App",
    },
  },
  {
    path: "*",
    element: lazyLoad("/404"),
  },
];

export default routes;
