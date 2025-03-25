import { RecommendedTraining } from "@/lib/data";

interface RecommendedCardProps {
  training: RecommendedTraining;
  onEnroll?: (id: number) => void;
}

export default function RecommendedCard({ training, onEnroll }: RecommendedCardProps) {
  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(training.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-36 bg-primary-100 relative">
        <img 
          src={training.image} 
          alt={training.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-1">
          <i className="ri-bookmark-line text-primary"></i>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-[#e0e4f8] text-primary px-2 py-1 rounded-full">
            {training.category}
          </span>
          <div className="flex items-center text-yellow-500">
            <i className="ri-star-fill text-xs"></i>
            <span className="text-xs ml-1">{training.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold mb-1">{training.title}</h3>
        
        <p className="text-xs text-gray-medium mb-3">
          {training.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-medium">
            {training.modules} modules • {training.duration}
          </span>
          <button 
            className="text-primary text-sm font-medium"
            onClick={handleEnroll}
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
