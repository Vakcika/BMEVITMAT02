import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import ShippingPriceList from "./components/shipping/list/ShippingPriceList";
import MaterialList from "./components/material/list/MaterialList";
import ProductCategoryList from "./components/product-categories/list/ProductCategoryList";

export default function Settings() {
  const breadcrumbs = [{ label: "Settings", url: "/app/settings" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ShippingPriceList queryParams="&sort_by=price" />
        <MaterialList />
        <ProductCategoryList />
      </div>
    </div>
  );
}
