export const componentCategories = [
  "Actions",
  "Data display",
  "Navigation",
  "Feedback",
  "Data input",
  "Layout",
  "Mockup",
] as const;

export type ComponentCategory = (typeof componentCategories)[number];

export interface DisinComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  classes: string[];
  description: string;
}

export const disinComponents = [
  { id: "button", name: "Button", category: "Actions", classes: ["btn"], description: "A weighted control with visible travel and tactile states." },
  { id: "dropdown", name: "Dropdown", category: "Actions", classes: ["dropdown", "dropdown-content"], description: "A raised trigger opening a floating material panel." },
  { id: "fab", name: "FAB / Speed Dial", category: "Actions", classes: ["fab", "fab-main-action"], description: "A floating primary action with mechanical secondary controls." },
  { id: "modal", name: "Modal", category: "Actions", classes: ["modal", "modal-box", "modal-action"], description: "A focused dialog presented as a lifted instrument panel." },
  { id: "swap", name: "Swap", category: "Actions", classes: ["swap", "swap-on", "swap-off"], description: "Two states exchanged through a native checkbox." },
  { id: "theme-controller", name: "Theme Controller", category: "Actions", classes: ["theme-controller"], description: "A native input contract for choosing a material theme." },

  { id: "accordion", name: "Accordion", category: "Data display", classes: ["collapse", "collapse-title", "collapse-content"], description: "A single-open disclosure group with recessed content." },
  { id: "avatar", name: "Avatar", category: "Data display", classes: ["avatar", "avatar-group"], description: "Portraits mounted in beveled frames with status cues." },
  { id: "aura", name: "Aura", category: "Data display", classes: ["aura"], description: "A focused edge light for important material surfaces." },
  { id: "badge", name: "Badge", category: "Data display", classes: ["badge"], description: "Compact engraved labels for status and metadata." },
  { id: "card", name: "Card", category: "Data display", classes: ["card", "card-body", "card-title", "card-actions"], description: "A stitched, layered container for related content." },
  { id: "carousel", name: "Carousel", category: "Data display", classes: ["carousel", "carousel-item"], description: "A horizontal rail with snap-aligned content plates." },
  { id: "chat", name: "Chat Bubble", category: "Data display", classes: ["chat", "chat-bubble", "chat-header", "chat-footer"], description: "Conversation bubbles shaped like soft molded material." },
  { id: "collapse", name: "Collapse", category: "Data display", classes: ["collapse", "collapse-title", "collapse-content"], description: "A disclosure surface controlled by native details or input." },
  { id: "countdown", name: "Countdown", category: "Data display", classes: ["countdown"], description: "Changing numbers presented on a split-flap display." },
  { id: "diff", name: "Diff", category: "Data display", classes: ["diff", "diff-item-1", "diff-item-2", "diff-resizer"], description: "A before-and-after comparison with a physical slider seam." },
  { id: "hover-3d", name: "Hover 3D Card", category: "Data display", classes: ["hover-3d"], description: "A card that tilts like a small object under the pointer." },
  { id: "hover-gallery", name: "Hover Gallery", category: "Data display", classes: ["hover-gallery"], description: "Layered media plates revealed across the hover axis." },
  { id: "kbd", name: "Kbd", category: "Data display", classes: ["kbd"], description: "Keyboard keys with a cap, rim, and short travel." },
  { id: "list", name: "List", category: "Data display", classes: ["list", "list-row"], description: "Structured rows separated like entries in a hardware console." },
  { id: "stat", name: "Stat", category: "Data display", classes: ["stats", "stat", "stat-title", "stat-value", "stat-desc"], description: "Instrument-like readouts for metrics and supporting context." },
  { id: "status", name: "Status", category: "Data display", classes: ["status"], description: "A tiny illuminated status lamp." },
  { id: "table", name: "Table", category: "Data display", classes: ["table"], description: "Dense data presented on a recessed ledger surface." },
  { id: "text-rotate", name: "Text Rotate", category: "Data display", classes: ["text-rotate"], description: "A rotating label strip with masked mechanical motion." },
  { id: "timeline", name: "Timeline", category: "Data display", classes: ["timeline", "timeline-start", "timeline-middle", "timeline-end"], description: "Events connected by a machined chronological rail." },

  { id: "breadcrumbs", name: "Breadcrumbs", category: "Navigation", classes: ["breadcrumbs"], description: "A compact engraved path through information hierarchy." },
  { id: "dock", name: "Dock", category: "Navigation", classes: ["dock", "dock-active"], description: "A bottom navigation shelf with illuminated active control." },
  { id: "link", name: "Link", category: "Navigation", classes: ["link"], description: "A text action with a precise ink-like underline." },
  { id: "megamenu", name: "Megamenu", category: "Navigation", classes: ["megamenu", "megamenu-active"], description: "A broad navigation console for large link groups." },
  { id: "menu", name: "Menu", category: "Navigation", classes: ["menu"], description: "A vertical or horizontal set of pressable navigation rows." },
  { id: "navbar", name: "Navbar", category: "Navigation", classes: ["navbar", "navbar-start", "navbar-center", "navbar-end"], description: "A top instrument rail with three alignment zones." },
  { id: "pagination", name: "Pagination", category: "Navigation", classes: ["join", "join-item", "btn"], description: "Joined tactile buttons for traversing a sequence." },
  { id: "steps", name: "Steps", category: "Navigation", classes: ["steps", "step", "step-primary"], description: "A sequence of labeled indicator lamps connected by a rail." },
  { id: "tabs", name: "Tabs", category: "Navigation", classes: ["tabs", "tab", "tab-active"], description: "Raised tabs whose selected state settles into the panel." },

  { id: "alert", name: "Alert", category: "Feedback", classes: ["alert"], description: "An inset notification panel with semantic signal light." },
  { id: "loading", name: "Loading", category: "Feedback", classes: ["loading", "loading-spinner"], description: "Mechanical motion indicators for pending work." },
  { id: "progress", name: "Progress", category: "Feedback", classes: ["progress"], description: "A liquid-like fill moving through a recessed track." },
  { id: "radial-progress", name: "Radial Progress", category: "Feedback", classes: ["radial-progress"], description: "A circular gauge with readable numeric value." },
  { id: "skeleton", name: "Skeleton", category: "Feedback", classes: ["skeleton"], description: "A softly animated placeholder pressed into the surface." },
  { id: "toast", name: "Toast", category: "Feedback", classes: ["toast"], description: "A corner stack of raised transient messages." },
  { id: "tooltip", name: "Tooltip", category: "Feedback", classes: ["tooltip"], description: "A compact material label revealed on hover or focus." },

  { id: "calendar", name: "Calendar", category: "Data input", classes: ["calendar"], description: "Calendar-library elements normalized to the material language." },
  { id: "checkbox", name: "Checkbox", category: "Data input", classes: ["checkbox"], description: "A native checkbox styled as a square mechanical latch." },
  { id: "fieldset", name: "Fieldset", category: "Data input", classes: ["fieldset", "fieldset-legend"], description: "A framed group for related controls and descriptions." },
  { id: "file-input", name: "File Input", category: "Data input", classes: ["file-input"], description: "A file picker with a distinct tactile browse control." },
  { id: "filter", name: "Filter", category: "Data input", classes: ["filter", "filter-reset"], description: "A joined set of single-choice filter keys." },
  { id: "label", name: "Label", category: "Data input", classes: ["label"], description: "A concise engraved title or supporting input note." },
  { id: "radio", name: "Radio", category: "Data input", classes: ["radio"], description: "A circular selector with an illuminated center." },
  { id: "range", name: "Range Slider", category: "Data input", classes: ["range"], description: "A recessed rail with a machined metal thumb." },
  { id: "rating", name: "Rating", category: "Data input", classes: ["rating", "mask", "mask-star-2"], description: "A row of native radio inputs masked into rating markers." },
  { id: "select", name: "Select", category: "Data input", classes: ["select"], description: "A compact recessed picker with a material chevron." },
  { id: "input", name: "Text Input", category: "Data input", classes: ["input"], description: "A writable inset surface with clear focus illumination." },
  { id: "textarea", name: "Textarea", category: "Data input", classes: ["textarea"], description: "A multiline inset writing surface." },
  { id: "toggle", name: "Toggle", category: "Data input", classes: ["toggle"], description: "A spring-loaded switch with visible track state." },
  { id: "validator", name: "Validator", category: "Data input", classes: ["validator", "validator-hint"], description: "Native validation feedback expressed through light and border." },
  { id: "otp", name: "OTP", category: "Data input", classes: ["otp", "otp-joined"], description: "A bank of aligned one-character code inputs." },

  { id: "divider", name: "Divider", category: "Layout", classes: ["divider"], description: "A fine etched rule with an optional centered label." },
  { id: "drawer", name: "Drawer Sidebar", category: "Layout", classes: ["drawer", "drawer-toggle", "drawer-content", "drawer-side"], description: "A two-surface layout with a sliding side cabinet." },
  { id: "footer", name: "Footer", category: "Layout", classes: ["footer"], description: "A structured closing panel for navigation and metadata." },
  { id: "hero", name: "Hero", category: "Layout", classes: ["hero", "hero-content", "hero-overlay"], description: "A large presentation surface for one primary message." },
  { id: "indicator", name: "Indicator", category: "Layout", classes: ["indicator", "indicator-item"], description: "A mounted badge positioned at the edge of another object." },
  { id: "join", name: "Join", category: "Layout", classes: ["join", "join-item"], description: "Multiple controls mechanically joined into one assembly." },
  { id: "mask", name: "Mask", category: "Layout", classes: ["mask", "mask-squircle"], description: "Reusable clipping shapes for media and controls." },
  { id: "stack", name: "Stack", category: "Layout", classes: ["stack"], description: "Layered surfaces with visible depth behind the front item." },

  { id: "browser-mockup", name: "Browser Mockup", category: "Mockup", classes: ["mockup-browser", "mockup-browser-toolbar"], description: "A browser frame with a tactile toolbar." },
  { id: "code-mockup", name: "Code Mockup", category: "Mockup", classes: ["mockup-code"], description: "A dark terminal-like code display with line markers." },
  { id: "phone-mockup", name: "Phone Mockup", category: "Mockup", classes: ["mockup-phone", "mockup-phone-camera", "mockup-phone-display"], description: "A dimensional phone shell for responsive previews." },
  { id: "window-mockup", name: "Window Mockup", category: "Mockup", classes: ["mockup-window"], description: "A desktop window frame with mechanical chrome." },
] as const satisfies readonly DisinComponent[];

export const componentCount = disinComponents.length;

export function getComponent(id: string) {
  return disinComponents.find((component) => component.id === id);
}
