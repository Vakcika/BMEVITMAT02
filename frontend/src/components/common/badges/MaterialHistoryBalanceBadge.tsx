import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface MaterialBalances {
  total_gold_14k_equivalent?: number;
  gold_equivalents?: Record<string, number>;
  [key: string]: number | Record<string, number> | undefined;
}

interface MaterialHistoryBadgeProps {
  balances: MaterialBalances;
}

const MaterialHistoryBadge: React.FC<MaterialHistoryBadgeProps> = ({
  balances,
}) => {
  const {
    total_gold_14k_equivalent = 0,
    gold_equivalents = {},
    ...rest
  } = balances || {};

  const getBalanceColor = (value: number) => {
    if (value > 0) return "bg-green-100 text-green-800";
    if (value < 0) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const formatValue = (value: number) => {
    if (isNaN(value)) return "—";
    const formatter = new Intl.NumberFormat("hu-HU", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return `${formatter.format(value)} g`;
  };

  // Filter out non-number keys
  const materialEntries = Object.entries(rest).filter(
    ([key, value]) =>
      key !== "total_gold_14k_equivalent" &&
      key !== "gold_equivalents" &&
      typeof value === "number"
  );

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

        <TooltipContent className="text-xs p-3 bg-white text-gray-900 border border-gray-200 rounded-md shadow-md w-60">
          <div className="font-semibold mb-1">Material Balances</div>
          {materialEntries.map(([type, value]) => (
            <div key={type} className="flex justify-between w-full">
              <span>{type}:</span>
              <span>{formatValue(value as number)}</span>
            </div>
          ))}

          {Object.keys(gold_equivalents).length > 0 && (
            <>
              <hr className="my-2 border-gray-200" />
              <div className="font-semibold mb-1">Gold equivalents (14K)</div>
              {Object.entries(gold_equivalents).map(([type, value]) => (
                <div key={type} className="flex justify-between w-full">
                  <span>{type}:</span>
                  <span>{formatValue(value)}</span>
                </div>
              ))}
            </>
          )}

          <hr className="my-2 border-gray-200" />
          <div className="font-semibold mb-1">Totals</div>
          <div className="flex justify-between w-full">
            <span>Total gold 14K eq:</span>
            <span>{formatValue(total_gold_14k_equivalent)}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MaterialHistoryBadge;
