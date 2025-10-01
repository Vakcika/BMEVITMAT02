import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import CustomerList from "./components/list/CustomerList";

export default function ListCustomers() {
  const breadcrumbs = [{ label: "Customers", url: "/app/customers" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <CustomerList />
    </div>
  );
}
