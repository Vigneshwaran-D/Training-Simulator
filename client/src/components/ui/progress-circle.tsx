import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  valueText: string;
  color?: string;
  className?: string;
}

export function ProgressCircle({
  percentage,
  size = 78,
  strokeWidth = 6,
  valueText,
  color = "var(--primary)",
  className
}: ProgressCircleProps) {
  // Calculate dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius}
          fill="none"
          stroke="#F1F1F1"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
        {valueText}
      </div>
    </div>
  );
}
