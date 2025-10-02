import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import ShippingPriceList from "./components/shipping/list/ShippingPriceList";
import MaterialList from "./components/material/list/MaterialList";
import ProductCategoryList from "./components/product-categories/list/ProductCategoryList";
import UserList from "./components/users/list/UserList";

export default function Settings() {
  const breadcrumbs = [{ label: "Settings", url: "/app/settings" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        <ShippingPriceList queryParams="&sort_by=price" />
        <MaterialList />
        <div className="col-span-1 lg:col-span-2 2xl:col-span-1">
          <ProductCategoryList />
        </div>
      </div>
      <UserList />
    </div>
  );
}
