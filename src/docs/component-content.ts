import type { DisinComponent } from "../library/components";

export interface ComponentClassEntry {
  className: string;
  type: "Component" | "Part" | "Color" | "Style" | "Size" | "Shape";
  description: string;
}

const markupById: Record<string, string> = {
  button: `<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary btn-outline">Outline</button>
<button class="btn btn-circle" aria-label="Add">+</button>`,
  dropdown: `<div class="dropdown">
  <button class="btn btn-primary" type="button">Open menu</button>
  <ul class="dropdown-content menu">
    <li><a href="/components/">Components</a></li>
    <li><a href="/docs/install/">Install</a></li>
  </ul>
</div>`,
  fab: `<div class="fab">
  <button class="btn btn-circle" aria-label="New note">Note</button>
  <button class="btn btn-circle" aria-label="New image">Image</button>
  <button class="btn btn-primary fab-main-action">Create</button>
</div>`,
  modal: `<button class="btn btn-primary" onclick="material_dialog.showModal()">Open panel</button>
<dialog class="modal" id="material_dialog">
  <div class="modal-box">
    <h3>Confirm the next move</h3>
    <p>Native dialog semantics on a dimensional panel.</p>
    <div class="modal-action">
      <form method="dialog"><button class="btn">Close</button></form>
    </div>
  </div>
</dialog>`,
  swap: `<label class="swap btn btn-circle">
  <input type="checkbox" />
  <span class="swap-on">On</span>
  <span class="swap-off">Off</span>
</label>`,
  "theme-controller": `<label class="label">
  <input class="theme-controller radio radio-primary" type="radio" name="seed" checked />
  Skeuomorphic
</label>`,
  accordion: `<div class="collapse">
  <input type="radio" name="archive" checked />
  <div class="collapse-title">What is Disin?</div>
  <div class="collapse-content">A tactile CSS component library.</div>
</div>`,
  avatar: `<div class="avatar-group">
  <div class="avatar online"><div><img src="/avatar.jpg" alt="Portrait" /></div></div>
  <div class="avatar placeholder"><div>+4</div></div>
</div>`,
  aura: `<div class="aura">Focused surface</div>`,
  badge: `<span class="badge badge-primary">new</span>
<span class="badge badge-secondary">stable</span>
<span class="badge badge-outline">v0.2</span>`,
  card: `<article class="card">
  <div class="card-body">
    <h2 class="card-title">Material study</h2>
    <p>Depth makes state legible.</p>
    <div class="card-actions"><button class="btn btn-primary">Inspect</button></div>
  </div>
</article>`,
  carousel: `<div class="carousel">
  <div class="carousel-item">Amber</div>
  <div class="carousel-item">Sage</div>
  <div class="carousel-item">Cobalt</div>
</div>`,
  chat: `<div class="chat chat-start">
  <div class="chat-header">Agent · now</div>
  <div class="chat-bubble">The component map is ready.</div>
  <div class="chat-footer">Delivered</div>
</div>`,
  collapse: `<details class="collapse" open>
  <summary class="collapse-title">Native details element</summary>
  <div class="collapse-content">No JavaScript is needed.</div>
</details>`,
  countdown: `<span class="countdown"><span style="--value:42">42</span></span>`,
  diff: `<div class="diff">
  <div class="diff-item-1">Tactile</div>
  <div class="diff-item-2">Flat</div>
  <input class="diff-resizer" type="range" min="0" max="100" value="50" />
</div>`,
  "hover-3d": `<article class="hover-3d card">
  <strong>Hover</strong>
  <span>Physical tilt</span>
</article>`,
  "hover-gallery": `<div class="hover-gallery">
  <img src="/amber.jpg" alt="Amber material" />
  <img src="/sage.jpg" alt="Sage material" />
</div>`,
  kbd: `<kbd class="kbd">⌘</kbd>
<span>+</span>
<kbd class="kbd">K</kbd>`,
  list: `<ul class="list">
  <li class="list-row"><strong>Buttons</strong><span>12</span></li>
  <li class="list-row"><strong>Inputs</strong><span>15</span></li>
</ul>`,
  stat: `<div class="stats">
  <div class="stat">
    <div class="stat-title">Components</div>
    <div class="stat-value">68</div>
    <div class="stat-desc">Full catalog</div>
  </div>
</div>`,
  status: `<span class="status status-success"></span><span>Online</span>
<span class="status status-warning"></span><span>Idle</span>`,
  table: `<table class="table table-zebra">
  <thead><tr><th>Part</th><th>Material</th><th>State</th></tr></thead>
  <tbody><tr><td>Button</td><td>Metal</td><td>Ready</td></tr></tbody>
</table>`,
  "text-rotate": `<p>Designed for
  <span class="text-rotate">
    <span>touch</span><span>clarity</span><span>agents</span>
  </span>
</p>`,
  timeline: `<ul class="timeline">
  <li><div class="timeline-start">Sketch</div><div class="timeline-middle"></div><div class="timeline-end">01</div></li>
  <li><div class="timeline-start">Ship</div><div class="timeline-middle"></div><div class="timeline-end">02</div></li>
</ul>`,
  breadcrumbs: `<nav class="breadcrumbs">
  <ul><li><a href="/">Disin</a></li><li><a href="/components/">Components</a></li><li>Button</li></ul>
</nav>`,
  dock: `<nav class="dock">
  <button><span>Home</span></button>
  <button class="dock-active"><span>Library</span></button>
  <button><span>Setup</span></button>
</nav>`,
  link: `<a class="link link-primary" href="/docs/install/">Installation guide</a>
<a class="link link-hover" href="/components/">Component catalog</a>`,
  megamenu: `<ul class="megamenu">
  <li><a href="/components/">Components</a></li>
  <li><a href="/docs/install/">For agents</a></li>
  <li><a href="/seeds/skeuomorphic/">Seeds</a></li>
</ul>`,
  menu: `<ul class="menu">
  <li class="menu-title">Archive</li>
  <li><a class="active" href="/components/">Components <span class="badge">68</span></a></li>
  <li><a href="/docs/install/">Install</a></li>
</ul>`,
  navbar: `<nav class="navbar">
  <div class="navbar-start"><strong>DISIN</strong></div>
  <div class="navbar-center"><span class="badge badge-primary">01</span></div>
  <div class="navbar-end"><button class="btn btn-sm">Menu</button></div>
</nav>`,
  pagination: `<div class="join">
  <button class="join-item btn">Previous</button>
  <button class="join-item btn btn-primary">2</button>
  <button class="join-item btn">3</button>
  <button class="join-item btn">Next</button>
</div>`,
  steps: `<ul class="steps">
  <li class="step step-primary">Install</li>
  <li class="step step-primary">Import</li>
  <li class="step">Compose</li>
</ul>`,
  tabs: `<div class="tabs tabs-box">
  <button class="tab tab-active">Preview</button>
  <button class="tab">Markup</button>
  <button class="tab">Tokens</button>
</div>`,
  alert: `<div class="alert alert-success">
  <span class="status status-success"></span>
  <span><strong>Package ready.</strong> All styles are included.</span>
</div>`,
  loading: `<span class="loading loading-spinner"></span>
<span class="loading loading-dots"></span>
<span class="loading loading-bars"></span>`,
  progress: `<progress class="progress progress-primary" value="72" max="100"></progress>`,
  "radial-progress": `<div class="radial-progress radial-progress-primary" style="--value:68">68%</div>`,
  skeleton: `<div class="skeleton" style="height:2rem;width:62%"></div>
<div class="skeleton" style="height:.8rem;width:100%"></div>`,
  toast: `<div class="toast">
  <div class="alert alert-info"><span class="status status-info"></span><span>Token copied.</span></div>
</div>`,
  tooltip: `<div class="tooltip" data-tip="Tactile detail">
  <button class="btn">Hover me</button>
</div>`,
  calendar: `<div class="calendar">
  <!-- Apply Disin classes to your calendar library root. -->
</div>`,
  checkbox: `<label class="label"><input class="checkbox checkbox-primary" type="checkbox" checked /> Selected</label>
<label class="label"><input class="checkbox" type="checkbox" /> Idle</label>`,
  fieldset: `<fieldset class="fieldset">
  <legend class="fieldset-legend">Signal settings</legend>
  <label class="label">Station</label>
  <input class="input" value="Disin FM" />
  <p class="label">Broadcast name shown to listeners.</p>
</fieldset>`,
  "file-input": `<input class="file-input file-input-primary" type="file" aria-label="Upload reference" />`,
  filter: `<div class="filter">
  <label><input type="radio" name="filter" checked /> All</label>
  <label><input type="radio" name="filter" /> Actions</label>
  <label><input type="radio" name="filter" /> Forms</label>
</div>`,
  label: `<label class="label"><span>Archive name</span><span>Optional</span></label>`,
  radio: `<label class="label"><input class="radio radio-primary" type="radio" name="accent" checked /> Amber</label>
<label class="label"><input class="radio radio-secondary" type="radio" name="accent" /> Sage</label>`,
  range: `<input class="range range-primary" type="range" min="0" max="100" value="62" aria-label="Output" />`,
  rating: `<div class="rating">
  <input class="mask mask-star-2" type="radio" name="rating" aria-label="1 star" />
  <input class="mask mask-star-2" type="radio" name="rating" aria-label="2 stars" />
  <input class="mask mask-star-2" type="radio" name="rating" aria-label="3 stars" checked />
</div>`,
  select: `<select class="select select-primary">
  <option>Amber material</option><option>Sage material</option><option>Cobalt material</option>
</select>`,
  input: `<label class="input input-primary">
  <input type="search" placeholder="Search components…" />
</label>`,
  textarea: `<textarea class="textarea textarea-primary">The interface should explain its own physics.</textarea>`,
  toggle: `<label class="label"><input class="toggle toggle-primary" type="checkbox" checked /> Power</label>
<label class="label"><input class="toggle toggle-secondary" type="checkbox" /> Monitor</label>`,
  validator: `<input class="input validator" type="email" required value="not-an-email" />
<p class="validator-hint">Enter a valid email address.</p>`,
  otp: `<div class="otp otp-joined">
  <input value="2" maxlength="1" aria-label="Digit 1" />
  <input value="0" maxlength="1" aria-label="Digit 2" />
  <input value="2" maxlength="1" aria-label="Digit 3" />
  <input value="6" maxlength="1" aria-label="Digit 4" />
</div>`,
  divider: `<p>Material</p><div class="divider">and</div><p>Meaning</p>`,
  drawer: `<div class="drawer">
  <input class="drawer-toggle" type="checkbox" />
  <div class="drawer-content">Page content</div>
  <aside class="drawer-side"><ul class="menu"><li><a href="/">Home</a></li></ul></aside>
</div>`,
  footer: `<footer class="footer footer-horizontal">
  <div><span class="footer-title">Disin</span><p>Designed to be touched.</p></div>
  <nav><span class="footer-title">Explore</span><a class="link" href="/components/">Components</a></nav>
</footer>`,
  hero: `<section class="hero">
  <div class="hero-content hero-content-vertical">
    <span class="badge badge-primary">Disin 0.2</span>
    <h1>Interfaces worth touching.</h1>
    <button class="btn btn-primary">Install package</button>
  </div>
</section>`,
  indicator: `<div class="indicator">
  <span class="indicator-item badge badge-primary">new</span>
  <button class="btn">Inbox</button>
</div>`,
  join: `<div class="join">
  <input class="input join-item" placeholder="Search" />
  <button class="btn btn-primary join-item">Go</button>
</div>`,
  mask: `<img class="mask mask-squircle" src="/material.jpg" alt="Material sample" />
<img class="mask mask-hexagon" src="/material.jpg" alt="Material sample" />`,
  stack: `<div class="stack">
  <div class="card">Front</div>
  <div class="card">Middle</div>
  <div class="card">Back</div>
</div>`,
  "browser-mockup": `<div class="mockup-browser">
  <div class="mockup-browser-toolbar">https://disin.vercel.app</div>
  <div>68 tactile components</div>
</div>`,
  "code-mockup": `<div class="mockup-code">
  <pre><code>npm i disin</code></pre>
  <pre><code>@import "disin/styles.css";</code></pre>
</div>`,
  "phone-mockup": `<div class="mockup-phone">
  <div class="mockup-phone-camera"></div>
  <div class="mockup-phone-display">Your responsive preview</div>
</div>`,
  "window-mockup": `<div class="mockup-window"><div>A dimensional desktop surface.</div></div>`,
};

const reactMarkupById: Partial<Record<string, string>> = {
  modal: `import { useRef } from "react";

export function MaterialDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className="btn btn-primary" onClick={() => dialogRef.current?.showModal()}>
        Open panel
      </button>
      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h3>Confirm the next move</h3>
          <p>Native dialog semantics on a dimensional panel.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => dialogRef.current?.close()}>Close</button>
          </div>
        </div>
      </dialog>
    </>
  );
}`,
  countdown: `<span className="countdown">
  <span style={{ "--value": 42 } as React.CSSProperties}>42</span>
</span>`,
  "radial-progress": `<div
  className="radial-progress radial-progress-primary"
  style={{ "--value": 68 } as React.CSSProperties}
>
  68%
</div>`,
  skeleton: `<div className="skeleton" style={{ height: "2rem", width: "62%" }} />
<div className="skeleton" style={{ height: ".8rem", width: "100%" }} />`,
};

const semanticBases = new Set([
  "alert",
  "badge",
  "btn",
  "checkbox",
  "file-input",
  "input",
  "link",
  "progress",
  "radial-progress",
  "radio",
  "range",
  "select",
  "status",
  "tab",
  "textarea",
  "toggle",
]);

const sizedBases = new Set([
  "badge",
  "btn",
  "checkbox",
  "dock",
  "file-input",
  "input",
  "loading",
  "radio",
  "select",
  "status",
  "textarea",
  "toggle",
]);

export function getComponentMarkup(component: DisinComponent) {
  return markupById[component.id] ??
    `<div class="${component.classes.join(" ")}">${component.name}</div>`;
}

export function getReactMarkup(component: DisinComponent) {
  if (reactMarkupById[component.id]) {
    return reactMarkupById[component.id]!;
  }
  return getComponentMarkup(component)
    .replaceAll('class="', 'className="')
    .replaceAll(" checked", " defaultChecked")
    .replaceAll(" maxlength=", " maxLength=");
}

export function getClassEntries(component: DisinComponent): ComponentClassEntry[] {
  const entries: ComponentClassEntry[] = component.classes.map((className, index) => ({
    className,
    type: index === 0 ? "Component" : "Part",
    description: index === 0
      ? `Base class for the ${component.name.toLowerCase()} component.`
      : `Structural part used inside ${component.classes[0]}.`,
  }));
  const base = component.classes[0];

  if (semanticBases.has(base)) {
    for (const tone of ["primary", "secondary", "accent", "info", "success", "warning", "error"]) {
      entries.push({
        className: `${base}-${tone}`,
        type: "Color",
        description: `${tone[0].toUpperCase()}${tone.slice(1)} material signal.`,
      });
    }
  }

  if (sizedBases.has(base)) {
    for (const size of ["sm", "lg", "xl"]) {
      entries.push({
        className: `${base}-${size}`,
        type: "Size",
        description: `${size.toUpperCase()} control size.`,
      });
    }
  }

  if (base === "btn") {
    for (const style of ["outline", "ghost", "soft"]) {
      entries.push({
        className: `btn-${style}`,
        type: "Style",
        description: `${style[0].toUpperCase()}${style.slice(1)} surface treatment.`,
      });
    }
    for (const shape of ["circle", "square"]) {
      entries.push({
        className: `btn-${shape}`,
        type: "Shape",
        description: `${shape[0].toUpperCase()}${shape.slice(1)} button shape.`,
      });
    }
  }

  if (base === "badge") {
    for (const style of ["outline", "ghost", "soft"]) {
      entries.push({
        className: `badge-${style}`,
        type: "Style",
        description: `${style[0].toUpperCase()}${style.slice(1)} label treatment.`,
      });
    }
  }

  if (base === "mask") {
    for (const shape of ["circle", "square", "squircle", "hexagon", "star-2"]) {
      entries.push({
        className: `mask-${shape}`,
        type: "Shape",
        description: `${shape.replace("-", " ")} clipping shape.`,
      });
    }
  }

  return entries;
}
