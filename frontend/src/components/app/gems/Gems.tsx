import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import GemColorList from "./components/gem-colors/list/GemColorList";
import GemShapeList from "./components/gem-shapes/list/GemShapeList";
import GemList from "./components/gems/list/GemList";

export default function ListCustomers() {
  const breadcrumbs = [{ label: "Gems", url: "/app/gems" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GemColorList defaultRows={5} />
        <GemShapeList defaultRows={5} />
      </div>
      <GemList />
    </div>
  );
}
