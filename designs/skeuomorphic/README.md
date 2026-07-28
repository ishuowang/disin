# Skeuomorphic · 拟物化

Disin’s first style studies how material cues can clarify interaction without
turning a product into decoration.

首个设计语言研究如何用材质、深度与机械反馈解释交互，同时避免为了“复古”而复古。

## Principles

1. **Depth communicates state.** Pressed controls move inward; active controls
   also change light or color.
2. **Material follows hierarchy.** Leather contains, metal operates, LCD reports.
3. **Motion needs a physical reason.** Records spin and tonearms travel; labels do not.
4. **Accessibility stays native.** Visual knobs wrap range inputs and every
   control keeps a real button or input underneath.
5. **Texture remains subordinate.** Contrast and hierarchy work before grain,
   shine, or stitching is added.

## Tokens

| Role | Value |
| --- | --- |
| Leather | `#2b241d` |
| Metal | `#d3c9b7` |
| Ink | `#171713` |
| Amber | `#dc714e` |
| LCD | `#c8e188` |
| Mechanical easing | `cubic-bezier(.2,.8,.25,1)` |

## Components

- `TactileButton`
- `RotaryKnob`
- `LcdPanel`
- `VinylRecord`
- `Tonearm`
- `SkeuomorphicPlayer`

## Reference

The original standalone tactile-player artifact is preserved at
[`public/references/tactile-player.html`](../../public/references/tactile-player.html).
It is intentionally not imported by the reusable React components.
