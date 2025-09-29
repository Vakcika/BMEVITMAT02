import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import ProductListWrapper from "./components/list/ProductListWrapper";

export default function ListCustomers() {
  const breadcrumbs = [{ label: "Products", url: "/app/prodcuts" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <ProductListWrapper />
    </div>
  );
}
