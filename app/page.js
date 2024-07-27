"use client";
import { useEffect, useState } from "react";
import { Howl } from "howler";

const sounds = {
  coffeeShop: "/coffee-shop.mp3",
  rain: "/rain.mp3",
  waves: "/waves.mp3",
};

export default function Home() {
  const [players, setPlayers] = useState({});
  const [volumes, setVolumes] = useState({
    coffeeShop: 0,
    rain: 0,
    waves: 0,
  });

  useEffect(() => {
    const newPlayers = {};
    for (const key in sounds) {
      newPlayers[key] = new Howl({
        src: [sounds[key]],
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {Object.keys(sounds).map((soundKey) => (
        <div key={soundKey} className="mb-4">
          <label>{soundKey}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={volumes[soundKey]}
            className="range range-xs"
            onChange={(e) => handleVolumeChange(soundKey, e.target.value)}
          />
        </div>
      ))}
    </main>
  );
}
