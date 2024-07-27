"use client";
import { useEffect, useState } from "react";
import { Howl } from "howler";
import { Coffee, CloudRain, Waves, Wind, TreePine } from 'lucide-react';
import SoundCard from './SoundCard'

const sounds = {
  coffeeShop: {
    src: "/coffee-shop.mp3",
    icon: Coffee,
    label: "咖啡店",
  },
  rain: {
    src: "/rain.mp3",
    icon: CloudRain,
    label: "下雨天",
  },
  waves: {
    src: "/waves.mp3",
    icon: Waves,
    label: "海浪",
  },
  wind: {
    src: "/wind.mp3",
    icon: Wind,
    label: "风",
  },
  birds: {
    src: "/forest.mp3",
    icon: TreePine,
    label: "森林",
  },
};

export default function Home() {
  const [players, setPlayers] = useState({});
  const [volumes, setVolumes] = useState(
    Object.keys(sounds).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
  );

  useEffect(() => {
    const newPlayers = {};
    for (const key in sounds) {
      newPlayers[key] = new Howl({
        src: [sounds[key].src],
        loop: true,
        volume: volumes[key] / 100,
      });
    }

    setPlayers(newPlayers);

    return () => {
      for (const key in newPlayers) {
        newPlayers[key].stop();
      }
    };
  }, []);

  const handleVolumeChange = (soundKey, volume) => {
    setVolumes((prevVolumes) => ({
      ...prevVolumes,
      [soundKey]: volume,
    }));

    const sound = players[soundKey];
    if (sound) {
      sound.volume(volume / 100);
      if (!sound.playing()) {
        sound.play();
      }
    }
  };

  return (
    <main className="min-h-screen  bg-accent  p-8 pl-64 pr-64">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Easy Mood</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(sounds).map(([soundKey, { icon, label }]) => (
            <SoundCard
              key={soundKey}
              soundKey={soundKey}
              icon={icon}
              label={label}
              volume={volumes[soundKey]}
              onVolumeChange={handleVolumeChange}
            />
          ))}
        </div>
      </div>
    </main>
  );
}