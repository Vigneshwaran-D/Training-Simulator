import { Training } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TrainingCardProps {
  training: Training;
  onClick?: (id: number) => void;
}

export default function TrainingCard({ training, onClick }: TrainingCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(training.id);
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm overflow-hidden",
      training.active && "border-2 border-primary"
    )}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#e0e4f8] rounded-md flex items-center justify-center text-primary mr-3">
              <i className={`${training.icon} text-xl`}></i>
            </div>
            <div>
              <h3 className="font-semibold">{training.title}</h3>
              <p className="text-xs text-gray-medium">
                {training.level} • Module {training.currentModule} of {training.totalModules}
              </p>
            </div>
          </div>
          <span className="bg-[#e0e4f8] text-primary text-xs py-1 px-2 rounded-full">
            {training.status === "in-progress" ? "In Progress" : "Completed"}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-medium">Progress</span>
            <span className="font-medium">{training.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${training.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-medium">
            <i className="ri-time-line mr-1"></i>
            <span>{training.timeRemaining} remaining</span>
          </div>
          <div className="flex items-center text-gray-medium">
            <i className="ri-calendar-line mr-1"></i>
            <span>Due {training.dueDate}</span>
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "py-3 px-5 flex justify-between items-center cursor-pointer",
          training.active ? "bg-primary text-white" : "bg-gray-100 text-dark"
        )}
        onClick={handleClick}
      >
        <span className="font-medium">Continue Training</span>
        <i className="ri-arrow-right-line"></i>
      </div>
    </div>
  );
}
