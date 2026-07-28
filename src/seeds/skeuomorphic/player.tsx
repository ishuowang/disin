import { useEffect, useMemo, useState } from "react";
import {
  LcdPanel,
  RotaryKnob,
  TactileButton,
  Tonearm,
  VinylRecord,
} from "./components";

const tracks = [
  { title: "Velvet Static", artist: "Disin Archive", duration: 247 },
  { title: "Copper Morning", artist: "Studio 01", duration: 218 },
  { title: "Soft Mechanics", artist: "Material Study", duration: 264 },
];

export type PlayerTheme = "amber" | "sage" | "cobalt";

interface SkeuomorphicPlayerProps {
  theme: PlayerTheme;
}

function formatTime(value: number) {
  const safeValue = Math.max(0, Math.floor(value));
  return `${Math.floor(safeValue / 60)}:${String(safeValue % 60).padStart(2, "0")}`;
}

export function SkeuomorphicPlayer({ theme }: SkeuomorphicPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [elapsed, setElapsed] = useState(74);
  const [volume, setVolume] = useState(68);
  const [liked, setLiked] = useState(false);
  const track = tracks[trackIndex];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        if (current + 1 < track.duration) return current + 1;
        setTrackIndex((index) => (index + 1) % tracks.length);
        return 0;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing, track.duration]);

  const progress = useMemo(
    () => `${Math.min(100, (elapsed / track.duration) * 100)}%`,
    [elapsed, track.duration],
  );

  const move = (direction: number) => {
    setTrackIndex((index) => (index + direction + tracks.length) % tracks.length);
    setElapsed(0);
    setPlaying(true);
  };

  return (
    <article className="skeuo-player" data-theme={theme} data-testid="skeuo-player">
      <div className="skeuo-player__stitch" aria-hidden="true" />
      <header className="skeuo-player__header">
        <span>DISIN / 01</span>
        <strong>{playing ? "PLAYING" : "PAUSED"}</strong>
        <span>33⅓ RPM</span>
      </header>

      <section className="skeuo-player__deck">
        <VinylRecord playing={playing} title={track.title} artist={track.artist} />
        <Tonearm playing={playing} onClick={() => setPlaying((value) => !value)} />
      </section>

      <section className="skeuo-player__console">
        <LcdPanel
          eyebrow={`${String(trackIndex + 1).padStart(2, "0")} / ${String(tracks.length).padStart(2, "0")}`}
          title={track.title}
          subtitle={track.artist}
          value={formatTime(elapsed)}
        />

        <div className="skeuo-player__progress" aria-label="Playback position">
          <span style={{ width: progress }} />
        </div>

        <div className="skeuo-player__controls">
          <div className="transport-controls">
            <TactileButton label="Previous track" round onClick={() => move(-1)}>‹</TactileButton>
            <TactileButton
              label={playing ? "Pause" : "Play"}
              tone="amber"
              round
              active={playing}
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? "Ⅱ" : "▶"}
            </TactileButton>
            <TactileButton label="Next track" round onClick={() => move(1)}>›</TactileButton>
          </div>
          <TactileButton
            label={liked ? "Remove from favorites" : "Add to favorites"}
            tone="dark"
            active={liked}
            round
            onClick={() => setLiked((value) => !value)}
          >
            ♥
          </TactileButton>
          <RotaryKnob value={volume} label="Volume" onChange={setVolume} />
        </div>
      </section>

      <footer className="skeuo-player__footer">
        <span><i /> analog memory</span>
        <span>{formatTime(track.duration - elapsed)} left</span>
      </footer>
    </article>
  );
}
