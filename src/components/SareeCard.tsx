
import { useState } from "react";
import { Link } from "react-router-dom";
import { Saree } from "../types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";

interface SareeCardProps {
  saree: Saree;
}

const SareeCard = ({ saree }: SareeCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/saree/${saree.id}`} className="block">
      <div className="saree-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl h-full">
        <div className="relative">
          <AspectRatio ratio={3/4}>
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            ) : (
              <img
                src={saree.image}
                alt={saree.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={handleImageError}
              />
            )}
          </AspectRatio>
          {saree.materialType && (
            <Badge className="absolute top-2 right-2 bg-white text-black">
              {capitalizeFirstLetter(saree.materialType)}
            </Badge>
          )}
          {saree.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {saree.discount}% OFF
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">{saree.name}</h3>
          <p className="text-gold-700 font-semibold mb-2">₹{saree.price.toLocaleString()}</p>
          <p className="text-gray-600 text-sm line-clamp-2">{saree.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default SareeCard;
