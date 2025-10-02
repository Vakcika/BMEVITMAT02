import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";

export default function Casts() {
  const breadcrumbs = [{ label: "Casts", url: "/app/casts" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
    </div>
  );
}
