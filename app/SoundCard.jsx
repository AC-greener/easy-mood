import React from "react";

const SoundCard = ({ soundKey, icon: IconComponent, label, volume, onVolumeChange }) => (
  <div className="mb-6 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
    <div className="flex items-center">
      <div className="bg-gray-100 p-4 rounded-full mr-5">
        {/* <Icon className="w-8 h-8 text-gray-600" /> */}
        {React.isValidElement(IconComponent) ? (
            IconComponent
          ) : (
            <IconComponent className="w-8 h-8 text-gray-600" />
          )}
      </div>
      <div className="flex-grow">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          onChange={(e) => onVolumeChange(soundKey, e.target.value)}
        />
      </div>
    </div>
  </div>
);

export default SoundCard;
