import { Progress } from "@/lib/data";
import { ProgressCircle } from "@/components/ui/progress-circle";

interface ProgressCardProps {
  title: string;
  subtitle: string;
  progress: Progress;
  percentage: number;
  color?: string;
  valueText: string;
}

export default function ProgressCard({
  title,
  subtitle,
  progress,
  percentage,
  color,
  valueText
}: ProgressCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-medium text-sm">{subtitle}</p>
        </div>
        <div className="text-gray-medium">
          <i className="ri-more-2-fill"></i>
        </div>
      </div>
      
      <div className="flex items-center">
        <ProgressCircle 
          percentage={percentage} 
          valueText={valueText}
          color={color}
        />
        
        <div className="ml-6">
          <div className="mb-3">
            <p className="text-sm text-gray-medium">Completed</p>
            <p className="font-semibold">{progress.completedText}</p>
          </div>
          <div>
            <p className="text-sm text-gray-medium">Remaining</p>
            <p className="font-semibold">{progress.remainingText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
