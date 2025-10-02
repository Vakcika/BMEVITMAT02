import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";

export default function Statements() {
  const breadcrumbs = [{ label: "Statements", url: "/app/statements" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
    </div>
  );
}
