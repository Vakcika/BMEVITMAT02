import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import { lazy, Suspense } from "react";
import LoadingCircle from "./components/common/LoadingCircle";
import SideBar from "./components/sidebar/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@webbydevs/react-laravel-sanctum-auth";
import { Toaster } from "sonner";
import useIsAuthenticated from "./auth/useIsAuthenticated";
import EditTransaction from "./components/app/customers/components/edit/transaction/EditTransaction";

const Orders = lazy(() => import("./components/app/orders/Orders"));
const Casts = lazy(() => import("./components/app/casts/Casts"));
const ListCustomers = lazy(
  () => import("./components/app/customers/ListCustomers")
);
const ViewCustomer = lazy(
  () => import("./components/app/customers/ViewCustomer")
);
const EditCustomer = lazy(
  () => import("./components/app/customers/EditCustomer")
);
const ListProducts = lazy(
  () => import("./components/app/products/ListProducts")
);
const ViewProduct = lazy(() => import("./components/app/products/ViewProduct"));
const EditProduct = lazy(() => import("./components/app/products/EditProduct"));
const Gems = lazy(() => import("./components/app/gems/Gems"));
const ViewGemShape = lazy(
  () => import("./components/app/gems/components/gem-shapes/view/ViewGemShape")
);
const ViewGemColor = lazy(
  () => import("./components/app/gems/components/gem-colors/view/ViewGemColor")
);
const ViewGem = lazy(
  () => import("./components/app/gems/components/gems/view/ViewGems")
);
const ViewShippingPrice = lazy(
  () =>
    import(
      "./components/app/settings/components/shipping/view/ViewShippingPrice"
    )
);
const Settings = lazy(() => import("./components/app/settings/Settings"));
const ViewMaterial = lazy(
  () =>
    import("./components/app/settings/components/material/view/ViewMaterial")
);
const ViewProductCategory = lazy(
  () =>
    import(
      "./components/app/settings/components/product-categories/view/ViewProductCategory"
    )
);
const ViewUser = lazy(
  () => import("./components/app/settings/components/users/view/ViewUser")
);
const Statements = lazy(() => import("./components/app/statements/Statements"));

const authConfig = {
  baseUrl: import.meta.env.VITE_API_URL,
  loginUrl: "api/login",
  registerUrl: "api/register",
  logoutUrl: "api/logout",
  csrfCookieUrl: "sanctum/csrf-cookie",
};

const queryClient = new QueryClient();

function AppLayout() {
  useIsAuthenticated();

  return (
    <div className="sm:ml-16 sm:pl-20 lg:ml-48 m-4 relative min-h-screen">
      <Suspense fallback={<LoadingCircle />}>
        <SideBar />
        <Outlet />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider config={authConfig}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<AppLayout />}>
                <Route path="orders" element={<Orders />} />
                <Route path="casts" element={<Casts />} />
                <Route path="statements" element={<Statements />} />
                <Route path="customers" element={<ListCustomers />} />
                <Route
                  path="/app/customer/new"
                  element={<EditCustomer isNew={true} />}
                />
                <Route path="/app/customer/:id" element={<ViewCustomer />} />
                <Route
                  path="/app/customer/:id/edit"
                  element={<EditCustomer />}
                />
                <Route
                  path="/app/transaction/new"
                  element={<EditTransaction isNew={true} />}
                />
                <Route
                  path="/app/transaction/:id"
                  element={<EditTransaction />}
                />
                <Route path="products" element={<ListProducts />} />
                <Route
                  path="/app/product/new"
                  element={<EditProduct isNew={true} />}
                />
                <Route path="/app/product/:id" element={<ViewProduct />} />
                <Route
                  path="/app/products/:id/edit"
                  element={<EditProduct />}
                />
                <Route path="gems" element={<Gems />} />
                <Route
                  path="/app/gems/new"
                  element={<ViewGem isNew={true} />}
                />
                <Route path="/app/gems/:id" element={<ViewGem />} />
                <Route
                  path="/app/gems/gem-shape/new"
                  element={<ViewGemShape isNew={true} />}
                />
                <Route
                  path="/app/gems/gem-shape/:id"
                  element={<ViewGemShape />}
                />
                <Route
                  path="/app/gems/gem-color/new"
                  element={<ViewGemColor isNew={true} />}
                />
                <Route
                  path="/app/gems/gem-color/:id"
                  element={<ViewGemColor />}
                />
                <Route path="/app/settings" element={<Settings />} />
                <Route
                  path="/app/settings/shipping/new"
                  element={<ViewShippingPrice isNew={true} />}
                />
                <Route
                  path="/app/settings/shipping/:id"
                  element={<ViewShippingPrice />}
                />
                <Route
                  path="/app/settings/materials/new"
                  element={<ViewMaterial isNew={true} />}
                />
                <Route
                  path="/app/settings/materials/:id"
                  element={<ViewMaterial />}
                />
                <Route
                  path="/app/settings/product-categories/new"
                  element={<ViewProductCategory isNew={true} />}
                />
                <Route
                  path="/app/settings/product-categories/:id"
                  element={<ViewProductCategory />}
                />
                <Route
                  path="/app/settings/users/new"
                  element={<ViewUser isNew={true} />}
                />
                <Route path="/app/settings/users/:id" element={<ViewUser />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster
        position="bottom-right"
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group rounded-md border p-4 shadow-lg bg-n700 border-n600 text-p100 gap-3",
            error: "!bg-w50 !border-w300 !text-w500",
            success: "!bg-s50 !border-s300 !text-s500",
            warning: "!bg-p50 !border-p300 !text-p800",
            info: "!bg-b50 !border-b300 !text-b500",
            title: "font-medium",
            description: "text-sm",
            actionButton:
              "group-data-[type=error]:!bg-w300 group-data-[type=error]:!text-n0",
            closeButton: "group-data-[type=error]:!text-w400",
          },
        }}
      />
    </div>
  );
}

export default App;
