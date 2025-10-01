import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import { Suspense } from "react";
import LoadingCircle from "./components/common/LoadingCircle";
import SideBar from "./components/sidebar/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@webbydevs/react-laravel-sanctum-auth";
import { Toaster } from "sonner";
import useIsAuthenticated from "./auth/useIsAuthenticated";
import ListCustomers from "./components/app/customers/ListCustomers";
import ViewCustomer from "./components/app/customers/ViewCustomer";
import EditCustomer from "./components/app/customers/EditCustomer";
import Dashboard from "./components/app/dashboard/Dashboard";
import ListProducts from "./components/app/products/ListProducts";
import ViewProduct from "./components/app/products/ViewProduct";
import EditProduct from "./components/app/products/EditProduct";
import Gems from "./components/app/gems/Gems";
import ViewGemShape from "./components/app/gems/components/gem-shapes/view/ViewGemShape";
import ViewGemColor from "./components/app/gems/components/gem-colors/view/ViewGemColor";
import ViewGem from "./components/app/gems/components/gems/view/ViewGems";

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
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="customers" element={<ListCustomers />} />
                <Route
                  path="/app/customer/new"
                  element={<EditCustomer isNew={true} />}
                />
                <Route path="/app/customer/:id" element={<ViewCustomer />} />
                <Route
                  path="/app/customer/:id/edit"
                  element={<EditProduct />}
                />
                <Route path="products" element={<ListProducts />} />
                <Route
                  path="/app/product/new"
                  element={<EditCustomer isNew={true} />}
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
