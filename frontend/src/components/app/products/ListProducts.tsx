import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import ProductList from "./components/list/ProductList";

export default function ListCustomers() {
  const breadcrumbs = [{ label: "Products", url: "/app/prodcuts" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <ProductList />
    </div>
  );
}
