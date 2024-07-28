"use client";
import { useEffect, useState, useCallback } from "react";
import { Howl } from "howler";
import {
  Coffee,
  CloudRain,
  Waves,
  Wind,
  TreePine,
  Bird,
  Ear,
  Github,
} from "lucide-react";
import SoundCard from "./SoundCard";
import { Icon } from "lucide-react";
import { wavesBirds, wavesSharkFin } from "@lucide/lab";
import { Analytics } from "@vercel/analytics/react"
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
  forest: {
    src: "/forest.mp3",
    icon: TreePine,
    label: "森林",
  },
  birds: {
    src: "/birdsong-after-rainfall.m4a",
    icon: Bird,
    label: "鸟鸣",
    title: "birdsong-forest",
  },
  birds2: {
    src: "/birds2.wav",
    icon: Bird,
    label: "雨后鸟鸣",
    title: "birdsong-after-rainfall",
  },
  neighborhood: {
    src: "/living-minute-noisy-neighborhood-at-night.flac",
    icon: Ear,
    label: "夜晚的邻居",
    title: "living-minute-noisy-neighborhood-at-night",
  },
  lakewaves: {
    src: "/lakewaves-n-crowcall.wav",
    icon: <Icon iconNode={wavesBirds} />,
    label: "海浪与乌鸦",
    title: "lakewaves-n-crowcall",
  },
  "evening-urbanscape": {
    src: "/evening-urbanscape-with-birdcalls-in-bengaluru.wav",
    icon: Bird,
    label: "班加罗尔的鸟鸣",
    title: "evening-urbanscape-with-birdcalls-in-bengaluru",
  },
  "waves-children": {
    src: "/waves-children-laughing-gulls-in-madeira.wav",
    icon: <Icon iconNode={wavesSharkFin} />,
    label: "海浪、孩子与海鸥",
    title: "waves-children-laughing-gulls-in-madeira",
  },
};

export default function Home() {
  const [players, setPlayers] = useState({});
  const [volumes, setVolumes] = useState(
    Object.keys(sounds).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
  );

  const loadSound = useCallback((key) => {
    if (!players[key]) {
      const newPlayer = new Howl({
        src: [sounds[key].src],
        loop: true,
        volume: volumes[key] / 100,
      });
      setPlayers((prevPlayers) => ({ ...prevPlayers, [key]: newPlayer }));
      return newPlayer;
    }
    return players[key];
  }, [players, volumes]);

  useEffect(() => {
    return () => {
      Object.values(players).forEach((player) => player.stop());
    };
  }, [players]);

  const handleVolumeChange = useCallback((soundKey, volume) => {
    setVolumes((prevVolumes) => ({
      ...prevVolumes,
      [soundKey]: volume,
    }));

    const sound = loadSound(soundKey);
    sound.volume(volume / 100);
    
    if (volume > 0 && !sound.playing()) {
      sound.play();
    } else if (volume === 0 && sound.playing()) {
      sound.pause();
    }
  }, [loadSound]);

  const handleCardClick = useCallback((soundKey) => {
    const currentVolume = volumes[soundKey];
    const newVolume = currentVolume === 0 ? 50 : 0;
    handleVolumeChange(soundKey, newVolume);
  }, [volumes, handleVolumeChange]);

  return (
    <main
      className="min-h-screen p-8 hero-pattern relative"
      style={{ backgroundImage: "url('/img/color4bg.png')" }}
    >
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-[#f0f0f0]">
          Easy Mood
        </h1>
        <a
          href="https://github.com/AC-greener/easy-mood"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f0f0f0] hover:text-gray-300 transition-colors"
        >
          <Github size={28} />
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(sounds).map(([soundKey, { icon, label }]) => (
            <SoundCard
              key={soundKey}
              soundKey={soundKey}
              icon={icon}
              label={label}
              volume={volumes[soundKey]}
              onVolumeChange={handleVolumeChange}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <Analytics/>
    </main>
  );
}