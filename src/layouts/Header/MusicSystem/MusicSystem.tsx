import ReactPlayer from "react-player";
import Wave from "./Wawe/Wawe";
import "./MusicSystem.scss";
import useAudioPlayer from "../../../hooks/useAudioPlayer";
import { useCallback, useEffect, useState } from "react";
function MusicSystem() {
  const [startTime, setStartTime] = useState<number>(0);
  const { isPlaying, volume, onVolumeChange, togglePlayback } =
    useAudioPlayer();

  const generateRandomStart = useCallback(() => {
    return Math.floor(Math.random() * 6660);
  }, []);

  useEffect(() => {
    setStartTime(generateRandomStart());
  }, []);

  return (
    <>
      <ReactPlayer
        url={`https://youtu.be/DCcQ-HOhOXk?start=${startTime}`}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        volume={volume / 100}
        onEnded={() => setStartTime(generateRandomStart())}
      />
      <div className="music-system">
        <div className="music-sytem-range">
          <input
            className="sound-size"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onVolumeChange}
            style={{
              background: `linear-gradient(to right, grey ${volume}%, lightgrey ${volume}%)`,
            }}
          />
        </div>
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={togglePlayback}
        >
          <Wave isPlaying={isPlaying} />
        </div>
      </div>
    </>
  );
}

export default MusicSystem;
