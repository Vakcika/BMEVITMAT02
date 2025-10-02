import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";

export default function Orders() {
  const breadcrumbs = [{ label: "Orders", url: "/app/orders" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
    </div>
  );
}
