import type { ReactNode } from "react";

type ButtonTone = "cream" | "amber" | "dark";

interface TactileButtonProps {
  children: ReactNode;
  label: string;
  tone?: ButtonTone;
  active?: boolean;
  round?: boolean;
  onClick?: () => void;
}

export function TactileButton({
  children,
  label,
  tone = "cream",
  active = false,
  round = false,
  onClick,
}: TactileButtonProps) {
  return (
    <button
      className={`tactile-button tactile-button--${tone} ${active ? "is-active" : ""} ${round ? "is-round" : ""}`}
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}

interface RotaryKnobProps {
  value: number;
  label: string;
  onChange: (value: number) => void;
}

export function RotaryKnob({ value, label, onChange }: RotaryKnobProps) {
  const rotation = -132 + value * 2.64;

  return (
    <label className="rotary-control">
      <span className="rotary-control__well">
        <span className="rotary-control__ticks" aria-hidden="true" />
        <span className="rotary-control__knob" style={{ transform: `rotate(${rotation}deg)` }}>
          <i />
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          aria-label={label}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </span>
      <strong>{label}</strong>
      <small>{value}%</small>
    </label>
  );
}

interface LcdPanelProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  value?: string;
}

export function LcdPanel({ eyebrow, title, subtitle, value = "02:14" }: LcdPanelProps) {
  return (
    <div className="lcd-panel">
      <div className="lcd-panel__scan" aria-hidden="true" />
      <div className="lcd-panel__top">
        <span>{eyebrow}</span>
        <strong>{value}</strong>
      </div>
      <strong className="lcd-panel__title">{title}</strong>
      <span className="lcd-panel__subtitle">{subtitle}</span>
    </div>
  );
}

interface VinylRecordProps {
  playing: boolean;
  title: string;
  artist: string;
}

export function VinylRecord({ playing, title, artist }: VinylRecordProps) {
  return (
    <div className="record-well">
      <div className={`vinyl-record ${playing ? "is-playing" : ""}`}>
        <span className="vinyl-record__grooves" />
        <span className="vinyl-record__shine" />
        <span className="vinyl-record__label">
          <strong>{title}</strong>
          <small>{artist}</small>
          <i />
        </span>
      </div>
    </div>
  );
}

interface TonearmProps {
  playing: boolean;
  onClick: () => void;
}

export function Tonearm({ playing, onClick }: TonearmProps) {
  return (
    <button
      className={`tonearm ${playing ? "is-lowered" : ""}`}
      type="button"
      aria-label={playing ? "Lift tonearm and pause" : "Lower tonearm and play"}
      onClick={onClick}
    >
      <span className="tonearm__pivot"><i /></span>
      <span className="tonearm__tube" />
      <span className="tonearm__head" />
    </button>
  );
}
