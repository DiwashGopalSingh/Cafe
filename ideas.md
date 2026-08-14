# Café Website Design Brainstorm

## Approach 1 — Hearth & Paper

**Very Brief Intro:** A tactile editorial café identity built from espresso ink, oat paper, sage leaves, and small terracotta marks. It should feel like a well-loved neighborhood journal: warm, crafted, and quietly confident.

**Probability:** 0.07

## Approach 2 — Sunroom Modernism

**Very Brief Intro:** A bright, architectural café system with pale stone, citrus accents, geometric blocks, and generous daylight. The mood is optimistic, clean, and design-conscious.

**Probability:** 0.03

## Approach 3 — Night Roast Club

**Very Brief Intro:** A darker late-night coffee bar direction with charcoal surfaces, copper details, and restrained amber glow. It feels intimate, energetic, and a little mysterious without becoming cyberpunk.

**Probability:** 0.05

## Chosen Direction — Hearth & Paper

### Design Movement

Contemporary editorial design with references to independent food magazines, letterpress menus, and modern European café interiors. The system should feel tactile and human rather than overly polished or tech-oriented.

### Core Principles

1. **Warmth with restraint:** Use a small, grounded palette and let texture, typography, and photography create richness instead of decorative clutter.
2. **Editorial asymmetry:** Build layouts around offset columns, pull quotes, staggered image frames, and strong left-aligned reading paths rather than centered template blocks.
3. **Craft as evidence:** Details such as small caps labels, hairline rules, handwritten-style marks, menu notation, and paper grain should suggest care and provenance.
4. **Every action earns its place:** Calls to action should be clear, physical, and local—read the menu, find the café, call ahead, or order when a real link exists.

### Color Philosophy

The signature color is **Copper Kettle**, a burnished terracotta that carries the warmth of roasted beans and the patina of a well-used kettle. It appears sparingly on primary actions, rules, and small graphic marks. Espresso brown anchors text and navigation; oat cream keeps the page breathable; muted sage provides a quiet botanical counterpoint. Color should feel like material, not decoration.

### Layout Paradigm

Use a **margin-led editorial composition**. Pages should begin with a narrow eyebrow or folio marker, then open into an offset headline and a wider image or content panel. On desktop, content can break the main column with a side note, floating label, or overlapping photo. On mobile, the same structure collapses into a clean vertical rhythm without losing the small editorial details.

### Signature Elements

- A thin copper rule with a small circular seal used to divide sections and frame “today’s note” moments.
- A small folio-style label such as `NO. 04 / OPEN DAILY` that gives each section a tactile print-editorial cue.
- Softly clipped photography with paper-edge shadows and a subtle grain overlay to create physical depth.

### Interaction Philosophy

Interactions should feel like turning a page or moving a card across a counter: immediate, tactile, and never showy. Buttons compress slightly on press, navigation underlines draw in from the left, menu filters change with a quick crossfade, and the mobile menu opens as a calm paper-colored sheet. Placeholder actions must say exactly what they do.

### Animation

Use 180–260ms ease-out transitions for buttons, links, filters, and navigation. Use staggered 40ms reveals for grouped hero content and menu cards, limited to opacity and transform. Image frames may lift by 2–4px on hover while their shadows deepen. Do not animate layout dimensions. Gate entrance motion behind `prefers-reduced-motion: no-preference`.

### Typography System

Use **DM Serif Display** for large headlines and section titles, **Manrope** for navigation, body copy, labels, and metadata, and occasional uppercase small caps with generous tracking for folio labels. Headlines should be compact and expressive; body text should remain comfortably readable at 17–18px on large screens and 16px on mobile. Prices should use Manrope with medium weight and tabular-looking spacing.

### Brand Essence

**Copper Kettle Café is a neighborhood coffee room for slow mornings, sharp conversations, and food made with care—distinct because its warmth is considered rather than performative.**

Personality adjectives: **grounded, observant, generous**.

### Brand Voice

Headlines are concise, sensory, and lightly poetic. CTAs are direct and inviting, never salesy. Microcopy sounds like a thoughtful note from someone who knows the room well.

Example headline: **“A good cup changes the shape of the morning.”**

Example CTA: **“Find your way to the kettle.”**

### Wordmark & Logo

The wordmark should use a custom stacked lockup with “COPPER” in spaced small caps above “KETTLE” in a bold, slightly condensed serif. The symbol is a simple geometric kettle seal: a copper circle containing a tilted kettle silhouette whose negative-space spout doubles as a small flame. The symbol must work independently as a favicon and menu stamp.

### Signature Brand Color

**Copper Kettle — `#B65E3C`**. Use it for primary CTAs, the seal mark, active menu states, and occasional typographic accents against oat and espresso backgrounds.

### File-level Style Reminder

Every CSS, component, and page file created for this site should begin with a short comment naming the **Hearth & Paper** direction, its editorial asymmetry, palette, typography, and motion rules. When deciding between two implementations, ask: “Does this choice reinforce or dilute our design philosophy?”
