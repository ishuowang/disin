import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Boxes,
  Check,
  ChevronDown,
  Command,
  Copy,
  LayoutGrid,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Navigation,
  Package,
  Palette,
  Search,
  Sparkles,
  TextCursorInput,
  type LucideIcon,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { ComponentDemo } from "../catalog/component-catalog";
import { SkeuomorphicPlayer } from "../seeds/skeuomorphic/player";
import {
  componentCategories,
  componentCount,
  disinComponents,
  getComponent,
  type ComponentCategory,
  type DisinComponent,
} from "../library/components";
import { activeSeed, designSeeds } from "../seeds/registry";
import {
  getClassEntries,
  getComponentMarkup,
  getReactMarkup,
} from "./component-content";

const categoryIcons: Record<ComponentCategory, LucideIcon> = {
  Actions: MousePointerClick,
  "Data display": LayoutGrid,
  Navigation,
  Feedback: MessageCircle,
  "Data input": TextCursorInput,
  Layout: Boxes,
  Mockup: MonitorSmartphone,
};

const overviewComponents = [...disinComponents].sort((left, right) =>
  left.name.localeCompare(right.name)
);

function getPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path || "/";
}

function componentHref(component: DisinComponent) {
  return `/components/${component.id}/`;
}

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

function Brand() {
  return (
    <a className="docs-brand" href="/" aria-label="Disin home">
      <img src="/disin-mark.svg" alt="" />
      <span>
        <strong>DISIN</strong>
        <small>design seeds</small>
      </span>
    </a>
  );
}

function TopBar({
  path,
  onMenu,
  onSearch,
}: {
  path: string;
  onMenu: () => void;
  onSearch: () => void;
}) {
  const [seedOpen, setSeedOpen] = useState(false);
  const componentsActive = path === "/" || path.startsWith("/components");
  const seedActive = path.startsWith("/seeds");
  const installActive = path.startsWith("/docs/install");

  return (
    <>
      <a className="docs-announcement" href="/seeds/skeuomorphic/">
        <Sparkles aria-hidden="true" />
        <span>Seed 01 · Skeuomorphic now covers all {componentCount} components</span>
        <ArrowRight aria-hidden="true" />
      </a>
      <header className="docs-topbar">
        <div className="docs-topbar__start">
          <button
            className="docs-icon-button docs-menu-button"
            type="button"
            onClick={onMenu}
            aria-label="Open component menu"
          >
            <Menu aria-hidden="true" />
          </button>
          <Brand />
          <span className="docs-version">0.2.0</span>
        </div>

        <nav className="docs-primary-nav" aria-label="Primary navigation">
          <a className={componentsActive ? "is-active" : ""} href="/components/">
            <Boxes aria-hidden="true" />
            Components
          </a>
          <a className={seedActive ? "is-active" : ""} href="/seeds/skeuomorphic/">
            <Palette aria-hidden="true" />
            Seeds
          </a>
          <a className={installActive ? "is-active" : ""} href="/docs/install/">
            <BookOpen aria-hidden="true" />
            Install
          </a>
        </nav>

        <div className="docs-topbar__end">
          <button className="docs-search-trigger" type="button" onClick={onSearch}>
            <Search aria-hidden="true" />
            <span>Search…</span>
            <kbd><Command aria-hidden="true" />K</kbd>
          </button>
          <div className="docs-seed-control">
            <button
              className="docs-icon-button docs-seed-button"
              type="button"
              onClick={() => setSeedOpen((value) => !value)}
              aria-label="Change design seed"
              aria-expanded={seedOpen}
            >
              <Palette aria-hidden="true" />
              <i />
              <ChevronDown aria-hidden="true" />
            </button>
            {seedOpen && (
              <div className="docs-seed-menu" role="menu">
                <p>Design seed</p>
                {designSeeds.map((seed) => (
                  <a
                    href={seed.status === "active" ? `/seeds/${seed.slug}/` : undefined}
                    aria-disabled={seed.status !== "active"}
                    role="menuitem"
                    key={seed.slug}
                  >
                    <i style={{ background: seed.accent }} />
                    <span><strong>{seed.name}</strong><small>{seed.chineseName}</small></span>
                    {seed.status === "active" ? <Check aria-hidden="true" /> : <small>soon</small>}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a
            className="docs-github-link"
            href="https://github.com/ishuowang/disin"
            aria-label="Disin on GitHub"
          >
            <SiGithub aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </header>
    </>
  );
}

function Sidebar({
  activeId,
  mobile = false,
  onNavigate,
  onSearch,
}: {
  activeId?: string;
  mobile?: boolean;
  onNavigate?: () => void;
  onSearch?: () => void;
}) {
  return (
    <aside className={mobile ? "docs-sidebar docs-sidebar--mobile" : "docs-sidebar"}>
      {mobile && (
        <div className="docs-drawer-head">
          <button className="docs-drawer-search" type="button" onClick={onSearch}>
            <Search aria-hidden="true" />
            <span>Search components…</span>
            <kbd><Command aria-hidden="true" />K</kbd>
          </button>
          <button className="docs-drawer-back" type="button" onClick={onNavigate}>
            <ArrowLeft aria-hidden="true" />
            Back
          </button>
        </div>
      )}
      <nav aria-label="Component navigation">
        <div className="docs-sidebar__title">
          <span>Components</span>
          <strong>{componentCount}</strong>
        </div>
        {componentCategories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <section className="docs-sidebar__group" key={category}>
              <h2><Icon aria-hidden="true" />{category}</h2>
              <ul>
                {disinComponents
                  .filter((component) => component.category === category)
                  .map((component) => (
                    <li key={component.id}>
                      <a
                        className={activeId === component.id ? "is-active" : ""}
                        href={componentHref(component)}
                        onClick={onNavigate}
                      >
                        <span>{component.name}</span>
                        {activeId === component.id && <i aria-hidden="true" />}
                      </a>
                    </li>
                  ))}
              </ul>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}

function MobileDrawer({
  open,
  activeId,
  onClose,
  onSearch,
}: {
  open: boolean;
  activeId?: string;
  onClose: () => void;
  onSearch: () => void;
}) {
  useBodyLock(open);
  if (!open) return null;
  return (
    <div className="docs-drawer" role="dialog" aria-modal="true" aria-label="Component navigation">
      <button className="docs-drawer__backdrop" type="button" onClick={onClose} aria-label="Close menu" />
      <Sidebar activeId={activeId} mobile onNavigate={onClose} onSearch={onSearch} />
    </div>
  );
}

function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return disinComponents.filter((component) => {
      if (!normalized) return ["button", "card", "input", "modal", "drawer", "tabs"].includes(component.id);
      return [
        component.name,
        component.id,
        component.category,
        component.description,
        ...component.classes,
      ].some((value) => value.toLowerCase().includes(normalized));
    }).slice(0, 10);
  }, [query]);

  useBodyLock(open);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function handleSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      window.location.href = componentHref(results[selectedIndex]);
    }
    if (event.key === "Escape") {
      onClose();
    }
  }

  if (!open) return null;
  return (
    <div className="docs-command" role="dialog" aria-modal="true" aria-label="Search components">
      <button className="docs-command__backdrop" type="button" onClick={onClose} aria-label="Close search" />
      <div className="docs-command__panel">
        <label className="docs-command__input">
          <Search aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Type to search components…"
            aria-label="Search components"
          />
          <span>{results.length} results</span>
        </label>
        <div className="docs-command__results">
          <p>{query ? "Matching components" : "Popular components"}</p>
          {results.map((component, index) => {
            const Icon = categoryIcons[component.category];
            return (
              <a
                href={componentHref(component)}
                key={component.id}
                className={index === selectedIndex ? "is-selected" : ""}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <Icon aria-hidden="true" />
                <span>
                  <strong>{component.name}</strong>
                  <small>{component.description}</small>
                </span>
                <code>components/{component.id}</code>
              </a>
            );
          })}
          {!results.length && (
            <div className="docs-command__empty">
              <Search aria-hidden="true" />
              <strong>No component found</strong>
              <span>Try a class name such as “btn” or “input”.</span>
            </div>
          )}
        </div>
        <footer>
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>esc</kbd> close</span>
        </footer>
      </div>
    </div>
  );
}

function DocsLayout({
  path,
  activeId,
  children,
}: {
  path: string;
  activeId?: string;
  children: ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setDrawerOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="docs-shell disin" data-theme="disin" data-seed={activeSeed.slug}>
      <TopBar path={path} onMenu={() => setDrawerOpen(true)} onSearch={() => setSearchOpen(true)} />
      <div className="docs-frame">
        <Sidebar activeId={activeId} />
        {children}
      </div>
      <MobileDrawer
        open={drawerOpen}
        activeId={activeId}
        onClose={() => setDrawerOpen(false)}
        onSearch={() => {
          setDrawerOpen(false);
          setSearchOpen(true);
        }}
      />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function OverviewCard({ component }: { component: DisinComponent }) {
  return (
    <article className="docs-component-card">
      <div
        className="docs-component-card__preview catalog-card__demo"
        data-component={component.id}
      >
        <ComponentDemo id={component.id} instanceId={`overview-${component.id}`} />
      </div>
      <a href={componentHref(component)}>
        <span>
          <strong>{component.name}</strong>
          <small>{component.category}</small>
        </span>
        <ArrowRight aria-hidden="true" />
      </a>
    </article>
  );
}

function OverviewPage() {
  return (
    <main className="docs-main docs-main--overview">
      <div className="docs-content">
        <header className="docs-page-heading docs-page-heading--overview">
          <p className="docs-kicker"><span>Component library</span><i /></p>
          <h1>All Disin components</h1>
          <div className="docs-page-heading__meta">
            <p>{componentCount} components</p>
            <span>Seed 01 · {activeSeed.name}</span>
          </div>
          <p className="docs-page-heading__lede">
            Familiar semantic class contracts, rebuilt in one tactile visual
            language. Browse the collection, open a component, and copy
            production-ready markup.
          </p>
        </header>

        <div className="docs-overview-grid">
          {overviewComponents.map((component) => (
            <OverviewCard component={component} key={component.id} />
          ))}
        </div>

        <footer className="docs-content-footer">
          <div>
            <span>Next</span>
            <strong>Install Disin</strong>
          </div>
          <a href="/docs/install/" aria-label="Open installation guide"><ArrowRight aria-hidden="true" /></a>
        </footer>
      </div>
      <aside className="docs-right-rail">
        <a className="docs-rail-card docs-rail-card--seed" href="/seeds/skeuomorphic/">
          <span>ACTIVE SEED · 01</span>
          <Palette aria-hidden="true" />
          <strong>Skeuomorphic</strong>
          <small>拟物化 · warm signal / honest depth</small>
        </a>
        <a className="docs-rail-card" href="/docs/install/">
          <Package aria-hidden="true" />
          <strong>Install for agents</strong>
          <small>Skill + CSS + manifest</small>
        </a>
      </aside>
    </main>
  );
}

type DemoTab = "preview" | "html" | "react";

function DemoPanel({
  component,
  surface = "light",
}: {
  component: DisinComponent;
  surface?: "light" | "dark";
}) {
  const [tab, setTab] = useState<DemoTab>("preview");
  const [copied, setCopied] = useState(false);
  const markup = tab === "react" ? getReactMarkup(component) : getComponentMarkup(component);

  async function copyMarkup() {
    await navigator.clipboard?.writeText(markup);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="docs-example">
      <div className="docs-example__tabs" role="tablist" aria-label={`${component.name} example format`}>
        {(["preview", "html", "react"] as const).map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? "is-active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item === "preview" ? "Preview" : item.toUpperCase()}
          </button>
        ))}
        {tab !== "preview" && (
          <button className="docs-example__copy" type="button" onClick={copyMarkup}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      {tab === "preview" ? (
        <div
          className="docs-demo-stage catalog-card__demo"
          data-surface={surface}
          role="tabpanel"
        >
          <ComponentDemo id={component.id} instanceId={`detail-${component.id}-${surface}`} />
        </div>
      ) : (
        <pre className="docs-code-block" role="tabpanel"><code>{markup}</code></pre>
      )}
    </div>
  );
}

function ClassTable({ component }: { component: DisinComponent }) {
  const entries = getClassEntries(component);
  return (
    <div className="docs-class-table-wrap" id="classes">
      <table className="docs-class-table">
        <thead>
          <tr><th>Class name</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={`${entry.className}-${entry.type}`}>
              <td><code>{entry.className}</code></td>
              <td><span data-type={entry.type.toLowerCase()}>{entry.type}</span></td>
              <td>{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComponentPage({ component }: { component: DisinComponent }) {
  const [copied, setCopied] = useState(false);
  const index = disinComponents.findIndex((item) => item.id === component.id);
  const previous = disinComponents[index - 1];
  const next = disinComponents[index + 1];

  async function copyDocs() {
    const markdown = `# ${component.name}\n\n${component.description}\n\n\`\`\`html\n${getComponentMarkup(component)}\n\`\`\``;
    await navigator.clipboard?.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className="docs-main docs-main--detail">
      <article className="docs-content">
        <header className="docs-page-heading">
          <div className="docs-title-row">
            <h1>{component.name}</h1>
            <button type="button" onClick={copyDocs}>
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copied ? "Copied" : "Copy docs"}
            </button>
          </div>
          <p className="docs-page-heading__lede">{component.description}</p>
        </header>

        <ClassTable component={component} />

        <section className="docs-doc-section" id="example">
          <h2><a href="#example" aria-label={`Link to ${component.name} example`}>#</a>{component.name}</h2>
          <p>
            The base example uses semantic class names and native HTML behavior.
            Its depth, highlight, and feedback come from the active seed.
          </p>
          <DemoPanel component={component} />
        </section>

        <section className="docs-doc-section" id="material-context">
          <h2><a href="#material-context" aria-label="Link to material context">#</a>Material context</h2>
          <p>
            The same component remains legible on a darker instrument surface;
            structure stays semantic while the seed supplies the material.
          </p>
          <DemoPanel component={component} surface="dark" />
        </section>

        <section className="docs-doc-section docs-agent-note" id="agent-note">
          <div><Sparkles aria-hidden="true" /></div>
          <div>
            <span>Agent note</span>
            <h2>Compose with meaning, then choose the seed.</h2>
            <p>
              Use the component class first. Add color, size, and shape modifiers
              only when they communicate product state—not as decoration.
            </p>
            <a href="/docs/install/">Read the agent installation guide <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <nav className="docs-pagination" aria-label="Component pagination">
          {previous ? (
            <a href={componentHref(previous)}>
              <ArrowLeft aria-hidden="true" />
              <span><small>Previous</small><strong>{previous.name}</strong></span>
            </a>
          ) : <span />}
          {next ? (
            <a href={componentHref(next)}>
              <span><small>Next</small><strong>{next.name}</strong></span>
              <ArrowRight aria-hidden="true" />
            </a>
          ) : <span />}
        </nav>
      </article>

      <aside className="docs-right-rail docs-on-this-page">
        <p>On this page</p>
        <a href="#classes">Class names</a>
        <a href="#example">Example</a>
        <a href="#material-context">Material context</a>
        <a href="#agent-note">Agent note</a>
        <div>
          <span>ACTIVE SEED</span>
          <strong>{activeSeed.name}</strong>
          <small>{activeSeed.chineseName}</small>
        </div>
      </aside>
    </main>
  );
}

function CodeCard({
  label,
  code,
}: {
  label: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }
  return (
    <div className="docs-install-code">
      <header><span>{label}</span><button type="button" onClick={copy}>{copied ? <Check /> : <Copy />}<span>{copied ? "Copied" : "Copy"}</span></button></header>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function InstallPage() {
  return (
    <main className="docs-main docs-main--detail">
      <article className="docs-content">
        <header className="docs-page-heading">
          <p className="docs-kicker"><span>Getting started</span><i /></p>
          <h1>Install Disin</h1>
          <p className="docs-page-heading__lede">
            Bring the complete skeuomorphic component seed into a project as
            CSS, or teach an AI coding agent how to compose it.
          </p>
        </header>
        <section className="docs-doc-section" id="css-package">
          <h2><a href="#css-package">#</a>CSS package</h2>
          <p>Install the package and import the complete seed stylesheet.</p>
          <CodeCard label="Terminal" code="npm install disin" />
          <CodeCard label="CSS" code={'@import "disin/styles.css";'} />
          <CodeCard label="HTML" code={'<html data-theme="disin" data-seed="skeuomorphic">'} />
        </section>
        <section className="docs-doc-section" id="agent-skill">
          <h2><a href="#agent-skill">#</a>Agent skill</h2>
          <p>
            Install the repository skill so compatible coding agents receive
            class contracts, composition guidance, and accessibility rules.
          </p>
          <CodeCard label="Terminal" code="npx skills add ishuowang/disin --skill disin -y" />
          <div className="docs-link-grid">
            <a href="/llms.txt"><strong>llms.txt</strong><small>Reader map for agents</small><ArrowRight /></a>
            <a href="/components.json"><strong>components.json</strong><small>Machine-readable manifest</small><ArrowRight /></a>
            <a href="/ai.json"><strong>ai.json</strong><small>Composition recipe</small><ArrowRight /></a>
          </div>
        </section>
      </article>
      <aside className="docs-right-rail docs-on-this-page">
        <p>On this page</p>
        <a href="#css-package">CSS package</a>
        <a href="#agent-skill">Agent skill</a>
        <a href="/components/">Browse components</a>
      </aside>
    </main>
  );
}

function SeedPage() {
  return (
    <main className="docs-main docs-main--detail">
      <article className="docs-content">
        <header className="docs-page-heading docs-seed-heading">
          <p className="docs-kicker"><span>Design seed 01</span><i /></p>
          <span className="docs-seed-chip">ACTIVE</span>
          <h1>{activeSeed.name}</h1>
          <p className="docs-seed-chinese">{activeSeed.chineseName}</p>
          <p className="docs-page-heading__lede">{activeSeed.description}</p>
        </header>

        <section className="docs-seed-hero" id="composed-example">
          <div className="docs-seed-hero__copy">
            <span>COMPOSED EXAMPLE</span>
            <h2>A language you can almost touch.</h2>
            <p>
              Leather holds the object together. Metal clarifies control
              surfaces. Warm signal light reserves attention for state.
            </p>
            <ul>
              {activeSeed.materials.map((material) => <li key={material}>{material}</li>)}
            </ul>
          </div>
          <div className="docs-seed-player">
            <SkeuomorphicPlayer theme="amber" />
          </div>
        </section>

        <section className="docs-doc-section" id="seed-contract">
          <h2><a href="#seed-contract">#</a>Seed contract</h2>
          <p>
            Every seed implements the same semantic component manifest. Product
            markup stays stable while tokens, surfaces, motion, and feedback can change.
          </p>
          <div className="docs-seed-contract">
            <div><span>Coverage</span><strong>{componentCount} / {componentCount}</strong><small>components</small></div>
            <div><span>Runtime</span><strong>0</strong><small>dependencies</small></div>
            <div><span>Root</span><strong>01</strong><small>active seed</small></div>
          </div>
          <a className="docs-inline-cta" href="/components/">Browse all components <ArrowRight /></a>
        </section>
      </article>
      <aside className="docs-right-rail docs-on-this-page">
        <p>On this page</p>
        <a href="#composed-example">Composed example</a>
        <a href="#seed-contract">Seed contract</a>
        <a href="/components/">Components</a>
      </aside>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="docs-main docs-main--detail">
      <article className="docs-content docs-not-found">
        <span>404</span>
        <h1>That surface is not in the archive.</h1>
        <p>Return to the component index and choose a documented part.</p>
        <a className="btn btn-primary" href="/components/">Browse components</a>
      </article>
    </main>
  );
}

export function DocsApp() {
  const path = getPath();
  const componentMatch = path.match(/^\/components\/([^/]+)$/);
  const component = componentMatch ? getComponent(componentMatch[1]) : undefined;

  useEffect(() => {
    if (component) {
      document.title = `${component.name} component — Disin`;
    } else if (path === "/docs/install") {
      document.title = "Install Disin — CSS package and Agent Skill";
    } else if (path === "/seeds/skeuomorphic") {
      document.title = "Skeuomorphic seed — Disin";
    } else if (path === "/" || path === "/components") {
      document.title = "Disin components — Skeuomorphic design seed";
    } else {
      document.title = "Not found — Disin";
    }
  }, [component, path]);

  let page: ReactNode;
  if (path === "/" || path === "/components") {
    page = <OverviewPage />;
  } else if (component) {
    page = <ComponentPage component={component} />;
  } else if (path === "/docs/install") {
    page = <InstallPage />;
  } else if (path === "/seeds/skeuomorphic") {
    page = <SeedPage />;
  } else {
    page = <NotFoundPage />;
  }

  return (
    <DocsLayout path={path} activeId={component?.id}>
      {page}
    </DocsLayout>
  );
}
