import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import ShippingPriceList from "./components/shipping/list/ShippingPriceList";

export default function Settings() {
  const breadcrumbs = [{ label: "Settings", url: "/app/settings" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ShippingPriceList queryParams="&sort_by=price" />
      </div>
    </div>
  );
}
