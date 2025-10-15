import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export interface CustomerBalances {
  by_type: Record<string, number>;
  total_gold_14k_equivalent: number;
  total_materials: number;
  transactions: number;
}

interface MaterialBalanceBadgeProps {
  balances: CustomerBalances;
}

const MaterialBalanceBadge: React.FC<MaterialBalanceBadgeProps> = ({
  balances,
}) => {
  const { total_gold_14k_equivalent, by_type, total_materials } = balances;

  const getBalanceColor = (value: number) => {
    if (value > 0) return "bg-green-100 text-green-800";
    if (value < 0) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const formatValue = (value: number) => {
    const formatter = new Intl.NumberFormat("hu-HU", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return `${formatter.format(value)} g`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full cursor-default ${getBalanceColor(
              total_gold_14k_equivalent
            )}`}
          >
            {formatValue(total_gold_14k_equivalent)}
          </span>
        </TooltipTrigger>
        <TooltipContent className="text-xs space-y-1 p-2 bg-n0 text-n900 border border-n30 shadow">
          <div className="font-semibold">Material details</div>
          {Object.entries(by_type).map(([type, value]) => (
            <div key={type} className="flex justify-between w-50">
              <span>{type}:</span>
              <span>{formatValue(value)}</span>
            </div>
          ))}
          <hr className="my-1 text-n100" />
          <div className="flex justify-between w-50">
            <span>Total materials 14K:</span>
            <span>{formatValue(total_gold_14k_equivalent)}</span>
          </div>
          <div className="flex justify-between w-50">
            <span>Total materials:</span>
            <span>{formatValue(total_materials)}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MaterialBalanceBadge;
