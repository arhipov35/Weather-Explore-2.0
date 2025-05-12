import ReactPlayer from "react-player";
import Wave from "./Wawe/Wawe";
import "./MusicSystem.scss";
import useAudioPlayer from "../../../hooks/useAudioPlayer";
import { useCallback, useEffect, useState } from "react";
import { playlist } from "./playlist";
import { useTheme } from "../../../contexts/ThemeContext";
import { Tooltip } from "@mui/material";

function MusicSystem() {
  const [currentSong, setCurrentSong] = useState<typeof playlist[0] | null>(null);
  const [playedSongs, setPlayedSongs] = useState<Set<string>>(new Set());
  const { isPlaying, volume, onVolumeChange, togglePlayback } = useAudioPlayer();
  const { theme } = useTheme();
  const selectRandomSong = useCallback(() => {
    if (playedSongs.size >= playlist.length - 1) {
      setPlayedSongs(new Set([currentSong?.url || ""]));
    }

    const availableSongs = playlist.filter((song) => !playedSongs.has(song.url));
    const randomIndex = Math.floor(Math.random() * availableSongs.length);
    const selectedSong = availableSongs[randomIndex];

    setPlayedSongs((prev) => new Set([...prev, selectedSong.url]));

    return selectedSong;
  }, [playedSongs, currentSong]);

  useEffect(() => {
    const firstSong = playlist[Math.floor(Math.random() * playlist.length)];
    setCurrentSong(firstSong);
    setPlayedSongs(new Set([firstSong.url]));
  }, []);

  const handleSongEnd = useCallback(() => {
    setCurrentSong(selectRandomSong());
  }, [selectRandomSong]);
  return (
    <>
      <ReactPlayer
        url={currentSong?.url}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        volume={volume / 100}
        onEnded={handleSongEnd}
      />
      <div className="music-system" data-tour="music-system">
        <div className="music-sytem-range">
          <input
            className="sound-size"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onVolumeChange}
            style={{
              background: `linear-gradient(to right, grey ${volume}%, ${theme?.range || 'lightgrey'} ${volume}%)`,
            }}
          />
        </div>
        <Tooltip title={currentSong?.name || 'No song playing'}>
          <div
            style={{ display: "inline-block", cursor: "pointer" }}
            onClick={togglePlayback}
          >
            <Wave isPlaying={isPlaying} />
          </div>
        </Tooltip>
      </div>
    </>
  );
}

export default MusicSystem;
