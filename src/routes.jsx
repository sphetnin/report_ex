import Ex1 from "./pages/ex1/index";

const routes = [
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/executive1",
    element: (
      <div>
        <Ex1 />
      </div>
    ),
  },
  {
    path: "/executive2",
    element: <div>Executive 2 Page</div>,
  },
  {
    path: "/accounting",
    element: <div>Accounting Page</div>,
  },
  {
    path: "/sale1",
    element: <div>Sale 1 Page</div>,
  },
  {
    path: "/sale2",
    element: <div>Sale 2 Page</div>,
  },
  {
    path: "/other1",
    element: <div>Other 1 Page</div>,
  },
  {
    path: "/other2",
    element: <div>Other 2 Page</div>,
  },
];

export default routes;
