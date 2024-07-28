import React from "react";

const SoundCard = ({ soundKey, icon: IconComponent, label, volume, onVolumeChange, onClick }) => (
  <div 
    className="mb-6 p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300 ease-in-out cursor-pointer"
    onClick={() => onClick(soundKey)}
  >
    <div className="flex items-center">
      <div className="bg-gray-100 p-4 rounded-full mr-5 group-hover:bg-gray-200 transition-colors duration-300">
        {React.isValidElement(IconComponent) ? (
          IconComponent
        ) : (
          <IconComponent className="w-8 h-8 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
        )}
      </div>
      <div className="flex-grow">
        <label className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
          {label}
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300 transition-colors duration-300"
          onChange={(e) => onVolumeChange(soundKey, parseInt(e.target.value))}
          onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to the card
        />
      </div>
    </div>
  </div>
);

export default SoundCard;