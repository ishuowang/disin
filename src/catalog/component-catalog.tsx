import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  componentCategories,
  componentCount,
  disinComponents,
  type ComponentCategory,
  type DisinComponent,
} from "../library/components";

function Glyph({ children }: { children: ReactNode }) {
  return <span className="catalog-glyph" aria-hidden="true">{children}</span>;
}

function Portrait({ label = "D" }: { label?: string }) {
  return <div className="catalog-portrait">{label}</div>;
}

function openCatalogModal() {
  (document.getElementById("disin-catalog-modal") as HTMLDialogElement | null)?.showModal();
}

function closeCatalogModal() {
  (document.getElementById("disin-catalog-modal") as HTMLDialogElement | null)?.close();
}

function ComponentDemo({ id }: { id: string }) {
  switch (id) {
    case "button":
      return (
        <div className="demo-row">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary btn-outline">Outline</button>
          <button className="btn btn-circle" aria-label="Add">+</button>
        </div>
      );
    case "dropdown":
      return (
        <div className="dropdown">
          <button className="btn btn-primary" type="button">Open menu</button>
          <ul className="dropdown-content menu">
            <li><a href="#library">Library</a></li>
            <li><a href="#install">Install</a></li>
          </ul>
        </div>
      );
    case "fab":
      return (
        <div className="fab">
          <button className="btn btn-circle" aria-label="New note">N</button>
          <button className="btn btn-circle" aria-label="New photo">P</button>
          <button className="btn btn-primary fab-main-action" aria-label="Create">+</button>
        </div>
      );
    case "modal":
      return (
        <>
          <button className="btn btn-primary" type="button" onClick={openCatalogModal}>Open panel</button>
          <dialog className="modal" id="disin-catalog-modal" aria-labelledby="disin-modal-title">
            <div className="modal-box">
              <span className="badge badge-primary">Material dialog</span>
              <h3 id="disin-modal-title">Confirm the next move</h3>
              <p>Native dialog semantics with a dimensional instrument-panel surface.</p>
              <div className="modal-action">
                <button className="btn" type="button" onClick={closeCatalogModal}>Close</button>
                <button className="btn btn-primary" type="button" onClick={closeCatalogModal}>Confirm</button>
              </div>
            </div>
          </dialog>
        </>
      );
    case "swap":
      return (
        <label className="swap btn btn-circle" aria-label="Toggle signal">
          <input type="checkbox" />
          <span className="swap-on">●</span>
          <span className="swap-off">○</span>
        </label>
      );
    case "theme-controller":
      return (
        <div className="demo-row">
          <label className="label"><input className="theme-controller radio radio-primary" type="radio" name="catalog-theme" defaultChecked /> Amber</label>
          <label className="label"><input className="theme-controller radio radio-secondary" type="radio" name="catalog-theme" /> Sage</label>
        </div>
      );
    case "accordion":
      return (
        <div className="demo-stack demo-wide">
          <div className="collapse">
            <input type="radio" name="catalog-accordion" defaultChecked aria-label="Open What is Disin" />
            <div className="collapse-title">What is Disin?</div>
            <div className="collapse-content">A tactile CSS component library.</div>
          </div>
          <div className="collapse">
            <input type="radio" name="catalog-accordion" aria-label="Open Does it need Tailwind" />
            <div className="collapse-title">Does it need Tailwind?</div>
            <div className="collapse-content">No. Import one CSS file.</div>
          </div>
        </div>
      );
    case "avatar":
      return (
        <div className="avatar-group">
          <div className="avatar online"><div><Portrait label="D" /></div></div>
          <div className="avatar"><div><Portrait label="I" /></div></div>
          <div className="avatar placeholder"><div>+4</div></div>
        </div>
      );
    case "aura":
      return <div className="aura catalog-aura">FOCUS</div>;
    case "badge":
      return (
        <div className="demo-row">
          <span className="badge badge-primary">new</span>
          <span className="badge badge-secondary">stable</span>
          <span className="badge badge-outline">v0.2</span>
        </div>
      );
    case "card":
      return (
        <article className="card demo-card">
          <div className="catalog-art">TACTILE<br />SYSTEM</div>
          <div className="card-body">
            <h3 className="card-title">Material study <span className="badge badge-primary">01</span></h3>
            <p>Depth makes state legible.</p>
            <div className="card-actions"><button className="btn btn-primary btn-sm">Inspect</button></div>
          </div>
        </article>
      );
    case "carousel":
      return (
        <div className="carousel demo-wide">
          {["AMBER", "SAGE", "COBALT"].map((item) => <div className="carousel-item catalog-slide" key={item}>{item}</div>)}
        </div>
      );
    case "chat":
      return (
        <div className="demo-wide">
          <div className="chat chat-start">
            <div className="chat-header">Agent · now</div>
            <div className="chat-bubble">The component map is ready.</div>
            <div className="chat-footer">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble">Ship the tactile version.</div>
          </div>
        </div>
      );
    case "collapse":
      return (
        <details className="collapse demo-wide" open>
          <summary className="collapse-title">Native details element</summary>
          <div className="collapse-content">No JavaScript needed for this disclosure.</div>
        </details>
      );
    case "countdown":
      return <span className="countdown"><span>42</span></span>;
    case "diff":
      return (
        <div className="diff catalog-diff demo-wide">
          <div className="diff-item-1 catalog-diff__side catalog-diff__side--after">TACTILE</div>
          <div className="diff-item-2 catalog-diff__side">FLAT</div>
          <input className="diff-resizer" type="range" min="0" max="100" defaultValue="50" aria-label="Comparison position" />
        </div>
      );
    case "hover-3d":
      return <div className="hover-3d card catalog-object"><strong>HOVER</strong><span>physical tilt</span></div>;
    case "hover-gallery":
      return (
        <div className="hover-gallery catalog-gallery">
          <div>AMBER</div>
          <div>SAGE</div>
        </div>
      );
    case "kbd":
      return <div className="demo-row"><kbd className="kbd">⌘</kbd><span>+</span><kbd className="kbd">K</kbd></div>;
    case "list":
      return (
        <ul className="list demo-wide">
          <li className="list-row"><span className="status status-success" /><div><strong>Buttons</strong><small>Action controls</small></div><span>12</span></li>
          <li className="list-row"><span className="status status-warning" /><div><strong>Inputs</strong><small>Native forms</small></div><span>15</span></li>
        </ul>
      );
    case "stat":
      return (
        <div className="stats">
          <div className="stat"><div className="stat-title">Components</div><div className="stat-value">68</div><div className="stat-desc">full catalog</div></div>
          <div className="stat"><div className="stat-title">Runtime</div><div className="stat-value">0</div><div className="stat-desc">dependencies</div></div>
        </div>
      );
    case "status":
      return (
        <div className="demo-row">
          <span className="status status-success" /><span>Online</span>
          <span className="status status-warning" /><span>Idle</span>
          <span className="status status-error" /><span>Offline</span>
        </div>
      );
    case "table":
      return (
        <div className="catalog-table-wrap demo-wide">
          <table className="table table-zebra">
            <thead><tr><th>Part</th><th>Material</th><th>State</th></tr></thead>
            <tbody><tr><td>Button</td><td>Metal</td><td>Ready</td></tr><tr><td>Panel</td><td>Leather</td><td>Active</td></tr></tbody>
          </table>
        </div>
      );
    case "text-rotate":
      return <p>Designed for <span className="text-rotate"><span>touch</span><span>clarity</span><span>agents</span><span>people</span></span>.</p>;
    case "timeline":
      return (
        <ul className="timeline demo-wide">
          <li><div className="timeline-start">Sketch</div><div className="timeline-middle" /><div className="timeline-end">01</div></li>
          <li><div className="timeline-start">Tokenize</div><div className="timeline-middle" /><div className="timeline-end">02</div></li>
          <li><div className="timeline-start">Ship</div><div className="timeline-middle" /><div className="timeline-end">03</div></li>
        </ul>
      );
    case "breadcrumbs":
      return <nav className="breadcrumbs"><ul><li><a href="#library">Disin</a></li><li><a href="#library">Components</a></li><li>Button</li></ul></nav>;
    case "dock":
      return (
        <nav className="dock">
          <button><Glyph>⌂</Glyph><span>Home</span></button>
          <button className="dock-active"><Glyph>◫</Glyph><span>Library</span></button>
          <button><Glyph>⚙</Glyph><span>Setup</span></button>
        </nav>
      );
    case "link":
      return <p>Read the <a className="link link-primary" href="#install">installation guide</a> or inspect the <a className="link link-hover" href="#library">catalog</a>.</p>;
    case "megamenu":
      return (
        <ul className="megamenu demo-wide">
          <li><a href="#library">Components</a></li>
          <li><a href="#install">For agents</a></li>
          <li><a href="#reference">References</a></li>
        </ul>
      );
    case "menu":
      return (
        <ul className="menu demo-wide">
          <li className="menu-title">Archive</li>
          <li><a className="active" href="#library">Components <span className="badge">68</span></a></li>
          <li><a href="#install">Install</a></li>
        </ul>
      );
    case "navbar":
      return (
        <nav className="navbar demo-wide">
          <div className="navbar-start"><strong>DISIN</strong></div>
          <div className="navbar-center"><span className="badge badge-primary">01</span></div>
          <div className="navbar-end"><button className="btn btn-sm">Menu</button></div>
        </nav>
      );
    case "pagination":
      return (
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn btn-primary">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">»</button>
        </div>
      );
    case "steps":
      return <ul className="steps demo-wide"><li className="step step-primary">Install</li><li className="step step-primary">Import</li><li className="step">Compose</li></ul>;
    case "tabs":
      return <div className="tabs tabs-box"><button className="tab tab-active">Preview</button><button className="tab">Markup</button><button className="tab">Tokens</button></div>;
    case "alert":
      return <div className="alert alert-success demo-wide"><span className="status status-success" /><span><strong>Package ready.</strong><br />All component styles are included.</span></div>;
    case "loading":
      return <div className="demo-row"><span className="loading loading-spinner" /><span className="loading loading-dots" /><span className="loading loading-bars" /></div>;
    case "progress":
      return <progress className="progress progress-primary" value="72" max="100" />;
    case "radial-progress":
      return <div className="radial-progress radial-progress-primary" style={{ "--value": 68 } as CSSProperties}>68%</div>;
    case "skeleton":
      return <div className="demo-stack demo-wide"><div className="skeleton catalog-skeleton-title" /><div className="skeleton catalog-skeleton-line" /><div className="skeleton catalog-skeleton-line catalog-skeleton-line--short" /></div>;
    case "toast":
      return <div className="toast"><div className="alert alert-info"><span className="status status-info" /><span>Design token copied.</span></div></div>;
    case "tooltip":
      return <div className="tooltip tooltip-open" data-tip="Tactile detail"><button className="btn">Hover me</button></div>;
    case "calendar":
      return (
        <div className="calendar">
          <div className="catalog-calendar-head"><button>‹</button><strong>JULY 2026</strong><button>›</button></div>
          <table><thead><tr>{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <th key={`${day}-${index}`}>{day}</th>)}</tr></thead>
            <tbody><tr>{[27, 28, 29, 30, 1, 2, 3].map((day) => <td key={day}>{day}</td>)}</tr><tr>{[4, 5, 6, 7, 8, 9, 10].map((day) => <td key={day}><button className={day === 7 ? "is-selected" : ""}>{day}</button></td>)}</tr></tbody>
          </table>
        </div>
      );
    case "checkbox":
      return <div className="demo-row"><label className="label"><input className="checkbox checkbox-primary" type="checkbox" defaultChecked /> Selected</label><label className="label"><input className="checkbox" type="checkbox" /> Idle</label></div>;
    case "fieldset":
      return <fieldset className="fieldset demo-wide"><legend className="fieldset-legend">Signal settings</legend><label className="label">Station</label><input className="input" defaultValue="Disin FM" /><p className="label">Broadcast name shown to listeners.</p></fieldset>;
    case "file-input":
      return <input className="file-input file-input-primary" type="file" aria-label="Upload reference" />;
    case "filter":
      return <div className="filter"><label><input type="radio" name="catalog-filter" defaultChecked /> All</label><label><input type="radio" name="catalog-filter" /> Actions</label><label><input type="radio" name="catalog-filter" /> Forms</label></div>;
    case "label":
      return <label className="label demo-wide"><span>Archive name</span><span>Optional</span></label>;
    case "radio":
      return <div className="demo-row"><label className="label"><input className="radio radio-primary" type="radio" name="catalog-radio" defaultChecked /> Amber</label><label className="label"><input className="radio radio-secondary" type="radio" name="catalog-radio" /> Sage</label></div>;
    case "range":
      return <input className="range range-primary" type="range" min="0" max="100" defaultValue="62" aria-label="Output" />;
    case "rating":
      return <div className="rating">{[1, 2, 3, 4, 5].map((value) => <input className="mask mask-star-2" type="radio" name="catalog-rating" aria-label={`${value} stars`} defaultChecked={value === 4} key={value} />)}</div>;
    case "select":
      return <select className="select select-primary" defaultValue="amber"><option value="amber">Amber material</option><option value="sage">Sage material</option><option value="cobalt">Cobalt material</option></select>;
    case "input":
      return <label className="input input-primary"><Glyph>⌕</Glyph><input placeholder="Search components…" /></label>;
    case "textarea":
      return <textarea className="textarea textarea-primary" defaultValue="The interface should explain its own physics." />;
    case "toggle":
      return <div className="demo-row"><label className="label"><input className="toggle toggle-primary" type="checkbox" defaultChecked /> Power</label><label className="label"><input className="toggle toggle-secondary" type="checkbox" /> Monitor</label></div>;
    case "validator":
      return <div><input className="input validator" type="email" required placeholder="agent@example.com" defaultValue="not-an-email" /><p className="validator-hint">Enter a valid email address.</p></div>;
    case "otp":
      return <div className="otp otp-joined">{["2", "0", "2", "6"].map((value, index) => <input key={index} defaultValue={value} maxLength={1} aria-label={`Digit ${index + 1}`} />)}</div>;
    case "divider":
      return <div className="demo-wide"><p>Material</p><div className="divider">and</div><p>Meaning</p></div>;
    case "drawer":
      return (
        <div className="drawer drawer-open catalog-drawer demo-wide">
          <input className="drawer-toggle" type="checkbox" defaultChecked aria-label="Toggle catalog drawer" />
          <div className="drawer-content"><div className="catalog-drawer__content">Content</div></div>
          <aside className="drawer-side"><ul className="menu"><li><a className="active" href="#library">Library</a></li><li><a href="#install">Install</a></li></ul></aside>
        </div>
      );
    case "footer":
      return <footer className="footer footer-horizontal demo-wide"><div><span className="footer-title">Disin</span><p>Designed to be touched.</p></div><nav><span className="footer-title">Explore</span><a className="link" href="#library">Components</a></nav></footer>;
    case "hero":
      return <div className="hero demo-wide"><div className="hero-content hero-content-vertical"><span className="badge badge-primary">Disin 0.2</span><h3>Interfaces worth touching.</h3><button className="btn btn-primary">Install package</button></div></div>;
    case "indicator":
      return <div className="indicator"><span className="indicator-item badge badge-primary">new</span><button className="btn">Inbox</button></div>;
    case "join":
      return <div className="join"><input className="input join-item" placeholder="Search" /><button className="btn btn-primary join-item">Go</button></div>;
    case "mask":
      return <div className="demo-row"><Portrait label="D" /><div className="mask mask-squircle catalog-mask">S</div><div className="mask mask-hexagon catalog-mask">H</div><div className="mask mask-star-2 catalog-mask">★</div></div>;
    case "stack":
      return <div className="stack"><div className="card catalog-stack-card">Front</div><div className="card catalog-stack-card">Middle</div><div className="card catalog-stack-card">Back</div></div>;
    case "browser-mockup":
      return <div className="mockup-browser demo-wide"><div className="mockup-browser-toolbar">https://disin.vercel.app</div><div className="catalog-mock-screen">68 tactile components</div></div>;
    case "code-mockup":
      return <div className="mockup-code demo-wide"><pre><code>npm i disin</code></pre><pre><code>@import "disin/styles.css";</code></pre></div>;
    case "phone-mockup":
      return <div className="mockup-phone"><div className="mockup-phone-camera" /><div className="mockup-phone-display"><div className="catalog-phone-screen"><span>DISIN</span><button className="btn btn-primary">Touch</button></div></div></div>;
    case "window-mockup":
      return <div className="mockup-window demo-wide"><div className="catalog-mock-screen">A dimensional desktop surface.</div></div>;
    default:
      return <span>Preview unavailable</span>;
  }
}

function ComponentCard({ component }: { component: DisinComponent }) {
  const [copied, setCopied] = useState(false);
  const className = component.classes[0];

  async function copyClass() {
    await navigator.clipboard?.writeText(className);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <article className="catalog-card" id={`component-${component.id}`}>
      <header>
        <div>
          <span>{component.category}</span>
          <h3>{component.name}</h3>
        </div>
        <button type="button" onClick={copyClass} aria-label={`Copy ${className} class`}>
          {copied ? "COPIED" : `.${className}`}
        </button>
      </header>
      <div className="catalog-card__demo">
        <ComponentDemo id={component.id} />
      </div>
      <p>{component.description}</p>
      <div className="catalog-card__classes">
        {component.classes.map((item) => <code key={item}>.{item}</code>)}
      </div>
    </article>
  );
}

export function ComponentCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ComponentCategory | "All">("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return disinComponents.filter((component) => {
      const categoryMatch = category === "All" || component.category === category;
      const queryMatch = !normalized || [
        component.name,
        component.id,
        component.category,
        component.description,
        ...component.classes,
      ].some((value) => value.toLowerCase().includes(normalized));
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <section className="component-library" id="library">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span>Daisy-compatible CSS library</span><i /></p>
          <h2>All {componentCount} components,<br /><em>one physical language.</em></h2>
        </div>
        <p>
          Familiar DaisyUI class contracts, rebuilt as a standalone tactile
          system. No Tailwind and no JavaScript runtime required.
        </p>
      </div>

      <div className="catalog-toolbar">
        <label className="catalog-search">
          <span>⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 68 components or class names"
            aria-label="Search component catalog"
          />
          <kbd>⌘ K</kbd>
        </label>
        <div className="catalog-filters" aria-label="Component category">
          {(["All", ...componentCategories] as const).map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="catalog-count"><strong>{String(filtered.length).padStart(2, "0")}</strong><span>shown / {componentCount}</span></div>
      </div>

      {filtered.length ? (
        componentCategories.map((group) => {
          const components = filtered.filter((component) => component.category === group);
          if (!components.length) return null;
          return (
            <section className="catalog-group" key={group}>
              <header><span>{String(componentCategories.indexOf(group) + 1).padStart(2, "0")}</span><h3>{group}</h3><i /></header>
              <div className="catalog-grid">
                {components.map((component) => <ComponentCard component={component} key={component.id} />)}
              </div>
            </section>
          );
        })
      ) : (
        <div className="catalog-empty">
          <strong>No component found.</strong>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters</button>
        </div>
      )}
    </section>
  );
}
