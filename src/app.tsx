import { useState } from "react";
import { designStyles } from "./designs/registry";
import {
  LcdPanel,
  RotaryKnob,
  TactileButton,
  VinylRecord,
} from "./designs/skeuomorphic/components";
import {
  SkeuomorphicPlayer,
  type PlayerTheme,
} from "./designs/skeuomorphic/player";

const themes: Array<{ value: PlayerTheme; label: string; color: string }> = [
  { value: "amber", label: "Amber", color: "#dc714e" },
  { value: "sage", label: "Sage", color: "#7c9172" },
  { value: "cobalt", label: "Cobalt", color: "#5e7899" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState<PlayerTheme>("amber");
  const [specimenActive, setSpecimenActive] = useState(false);
  const [knobValue, setKnobValue] = useState(62);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Disin home">
          <img src="/disin-mark.svg" alt="" />
          <span><strong>DISIN</strong><small>interface archive</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#specimens">Components</a>
          <a href="#reference">Reference</a>
        </nav>
        <a className="header-link" href="https://github.com/ishuowang/disin">
          GitHub <ArrowIcon />
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__copy">
            <p className="eyebrow"><span>Independent design archive</span><i /></p>
            <h1>Interfaces<br />worth <em>touching.</em></h1>
            <p className="hero__lede">
              A growing collection of visual languages, preserved as reusable
              code, decision notes, and interactive references.
            </p>
            <div className="hero__actions">
              <a className="primary-action" href="#collection">Explore style 01 <span>↓</span></a>
              <span>设计语言 · 组件 · 原始稿</span>
            </div>
          </div>
          <div className="hero__index" aria-label="Archive summary">
            <span>VOL.</span>
            <strong>01</strong>
            <p>ONE ACTIVE STYLE<br />FIVE PRIMITIVES<br />ONE COMPOSITION</p>
          </div>
        </section>

        <section className="collection" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span>Current collection</span><i /></p>
              <h2>Style 01 — Skeuomorphic</h2>
            </div>
            <p>
              Physical cues without nostalgia for nostalgia’s sake. Depth
              communicates state; materials make hierarchy legible.
            </p>
          </div>

          <div className="gallery-grid">
            <div className="player-stage">
              <div className="stage-label"><span>COMPOSED EXAMPLE</span><strong>TACTILE PLAYER</strong></div>
              <SkeuomorphicPlayer theme={theme} />
            </div>

            <aside className="gallery-notes">
              <div className="notes-card notes-card--dark">
                <span className="notes-card__number">01</span>
                <p>STYLE DNA</p>
                <h3>Leather, brushed metal, amber light.</h3>
                <ul>
                  <li><span>Shadow</span><strong>Directional / layered</strong></li>
                  <li><span>Radius</span><strong>16–999 px</strong></li>
                  <li><span>Motion</span><strong>Weighted / mechanical</strong></li>
                  <li><span>Feedback</span><strong>Depth + state light</strong></li>
                </ul>
              </div>

              <div className="theme-picker" aria-label="Player material themes">
                <p>Accent material</p>
                <div>
                  {themes.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={theme === item.value ? "is-selected" : ""}
                      aria-pressed={theme === item.value}
                      onClick={() => setTheme(item.value)}
                    >
                      <i style={{ background: item.color }} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <blockquote>
                “The interface should explain its own physics before the user
                reads a label.”
              </blockquote>
            </aside>
          </div>
        </section>

        <section className="specimens" id="specimens">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow"><span>Reusable primitives</span><i /></p>
              <h2>Component specimens</h2>
            </div>
            <p>Live controls extracted from the composition—not decorative screenshots.</p>
          </div>

          <div className="specimen-grid">
            <article className="specimen-card specimen-card--button">
              <header><span>01 / BUTTON</span><code>tactile-button</code></header>
              <div className="specimen-card__demo">
                <TactileButton
                  label="Toggle specimen button"
                  tone="amber"
                  active={specimenActive}
                  onClick={() => setSpecimenActive((value) => !value)}
                >
                  {specimenActive ? "ON" : "PUSH"}
                </TactileButton>
              </div>
              <p>Layered highlights and a short vertical travel make state visible.</p>
            </article>

            <article className="specimen-card specimen-card--knob">
              <header><span>02 / KNOB</span><code>rotary-control</code></header>
              <div className="specimen-card__demo">
                <RotaryKnob value={knobValue} label="Output" onChange={setKnobValue} />
              </div>
              <p>Native range input underneath a material dial preserves accessibility.</p>
            </article>

            <article className="specimen-card specimen-card--lcd">
              <header><span>03 / DISPLAY</span><code>lcd-panel</code></header>
              <div className="specimen-card__demo">
                <LcdPanel eyebrow="ARCHIVE 01" title="Soft Mechanics" subtitle="Material Study" />
              </div>
              <p>A restrained glow and scan texture evoke hardware without hurting contrast.</p>
            </article>

            <article className="specimen-card specimen-card--record">
              <header><span>04 / OBJECT</span><code>vinyl-record</code></header>
              <div className="specimen-card__demo">
                <VinylRecord playing title="Disin" artist="Style archive" />
              </div>
              <p>Motion belongs to the object with a reason to move.</p>
            </article>
          </div>
        </section>

        <section className="reference-section" id="reference">
          <div className="reference-section__copy">
            <p className="eyebrow"><span>Source artifact</span><i /></p>
            <h2>The original stays inspectable.</h2>
            <p>
              The first tactile-player HTML is preserved beside the reusable
              implementation. It remains a reference, not a hidden runtime dependency.
            </p>
            <div>
              <a className="primary-action" href="/references/tactile-player.html" target="_blank">
                Open original HTML <ArrowIcon />
              </a>
              <a className="text-action" href="https://github.com/ishuowang/disin/tree/main/designs/skeuomorphic">
                Read design notes →
              </a>
            </div>
          </div>
          <div className="reference-window">
            <header><i /><i /><i /><span>references/tactile-player.html</span></header>
            <iframe
              src="/references/tactile-player.html?embedded=1"
              title="Original tactile player design reference"
            />
          </div>
        </section>

        <section className="future-styles">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow"><span>Archive index</span><i /></p>
              <h2>Built to grow sideways.</h2>
            </div>
            <p>Every style remains isolated, comparable, and independently reusable.</p>
          </div>
          <div className="style-index">
            {designStyles.map((style) => (
              <article key={style.slug} className={style.status === "planned" ? "is-planned" : ""}>
                <span>{style.index}</span>
                <div><strong>{style.name}</strong><small>{style.chineseName}</small></div>
                <p>{style.description}</p>
                <i style={{ background: style.accent }} />
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand">
          <img src="/disin-mark.svg" alt="" />
          <span><strong>DISIN</strong><small>interface archive</small></span>
        </div>
        <p>Designed to be inspected. Built to be reused.</p>
        <div><a href="https://github.com/ishuowang/disin">GitHub</a><a href="https://ifdian.net/a/burienchow">爱发电</a></div>
      </footer>
    </div>
  );
}

export default App;
