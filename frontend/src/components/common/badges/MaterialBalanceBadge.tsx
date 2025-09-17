import React from "react";

interface MaterialBalanceBadgeProps {
  balance: number;
}

const MaterialBalanceBadge: React.FC<MaterialBalanceBadgeProps> = ({
  balance,
}) => {
  const getBalanceColor = () => {
    if (balance > 0) {
      return "bg-green-100 text-green-800";
    } else if (balance < 0) {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const formatBalance = (value: number) => {
    const formatter = new Intl.NumberFormat("hu-HU", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return `${formatter.format(value)} g`;
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getBalanceColor()}`}
    >
      {formatBalance(balance)}
    </span>
  );
};

export default MaterialBalanceBadge;
