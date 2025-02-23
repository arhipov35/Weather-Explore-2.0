import { useState } from "react";

type UseAudioPlayerReturn = {
  isPlaying: boolean;
  volume: number;
  togglePlayback: () => void;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function useAudioPlayer(initialVolume: number = 50): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(initialVolume);

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return {
    isPlaying,
    volume,
    togglePlayback,
    onVolumeChange,
  };
}

export default useAudioPlayer;
