import { Card } from "@/components/ui/card";

const PriceInfoCard = ({ title, value,  icon, borderColor }) => {
  return (
    <Card
      className="p-4 rounded-lg shadow-sm"
      style={{ borderLeft: `4px solid ${borderColor || "#ccc"}` }}
    >
      {/* Title */}
      <p className="text-xl font-medium text-gray-600 mb-1">{title}</p>

      {/* Icon + Price */}
      <div className="flex items-center gap-1">
        <span>
          {icon}
        </span>
        <p className="text-lg font-bold text-gray-900 leading-none">
          {value}
        </p>
      </div>
    </Card>
  );
};

export default PriceInfoCard;
