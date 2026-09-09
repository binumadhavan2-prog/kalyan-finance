const W = 1920, H = 1080;

const NAVY_DEEP = "#070d22";
const NAVY      = "#16224d";
const GOLD      = "#d4af37";
const GOLD_HI   = "#f2dc94";
const SOFT      = "#aab3cd";
const WHITE     = "#ffffff";
// Lighter than the ground it sits on, not darker. At #101a3d the card was
// below even the brightest point of the radial background (#16224d), so it
// receded instead of lifting and the contact rows read as floating loose on
// the backdrop. White on this is about 11:1.
const CARD_BG   = "#212f63";

// Client facts. Anything not supplied stays visibly pending — never invented.
const CONTACT = {
  phone: "PHONE - TO BE SUPPLIED",
  email: "skalyansundaram24289@gmail.com",
};

const SW = 470, SH = 540;
const SX = (W - SW) / 2;
const SY = 150;
const SHIELD_D =
  "M 235 9 L 461 96 L 461 286 C 461 411 371 493 235 531 C 99 493 9 411 9 286 L 9 96 Z";

// The supplied brand mark — crowned shield with the KF monogram. The opening
// beat still draws SHIELD_D as an outline; this is what that outline resolves
// into once the animation lands, so the sign-off carries the real logo rather
// than a bare shield silhouette.
const LOGO_SRC = "logo.png";

const PILLARS = [
  { icon: "users",       label: "FAMILY" },
  { icon: "briefcase",   label: "BUSINESS" },
  { icon: "trending-up", label: "GROWTH" },
];

const ICON = 76, ICON_GAP = 62;
const ROW_W   = PILLARS.length * ICON + (PILLARS.length - 1) * ICON_GAP;
const ROW_X   = SX + (SW - ROW_W) / 2;
const ICON_Y  = SY + 140;
const LABEL_Y = ICON_Y + 108;
const LABEL_W = 136;

// The contact block is sized for how the clip is actually watched, not for
// how it looks at 1920 wide. It sits in the home hero at roughly 700 CSS px,
// a shade over a third of frame width, so the old 32px rows landed at about
// 12 CSS px on screen - smaller than the body copy beside them. Type, icons
// and the button are all 1.8x their first pass; the gaps between rows are only
// 1.2x, so the block reads bigger without crowding the mark above it or the
// sign-off below.
const CARD_W = 1260;
const CARD_X = (W - CARD_W) / 2;
const CARD_Y = 238;

const bg = () => (
  <rect name="bg" x={0} y={0} width={W} height={H}
        fill={{ kind: "radial", stops: [
          { offset: 0, color: NAVY }, { offset: 1, color: NAVY_DEEP } ] }} />
);

const shieldCore = () => (
  <path name="shield-core" x={0} y={0} width={SW} height={SH} d={SHIELD_D} fill={null}
        stroke={{ color: GOLD_HI, width: 7, cap: "round" }} />
);

const logoMark = () => (
  <image name="logo-mark" src={LOGO_SRC}
         x={0} y={0} width={SW} height={SH} fit="contain" />
);

const shieldGlow = () => (
  <path name="shield-glow" x={0} y={0} width={SW} height={SH} d={SHIELD_D} fill={null}
        stroke={{ color: GOLD, width: 18, cap: "round" }}
        effects={[{ kind: "blur", params: { radius: 22 } }]}
        animate={[{ property: "opacity", keyframes: [
          { at: 0,   value: 0 },
          { at: 1.0, value: 0.55 },
          { at: 1.8, value: 0.28 },
          { at: 2.6, value: 0.5 },
        ] }]} />
);

const beat1 = (icon, t0) => [
  bg(),
  <group name="shield-wrap" x={SX} y={SY} width={SW} height={SH}
         mask={{ shape: "rectangle", x: 0, y: 0, width: SW, height: SH }}
         animate={[{ property: "maskWidth", from: 1, to: SW, at: 0.12, duration: 1.15, easing: "ease-in-out" }]}>
    {shieldGlow()}
    {shieldCore()}
  </group>,
  ...PILLARS.map((pil, i) => icon(pil.icon, {
    name: "icon-" + pil.icon,
    x: ROW_X + i * (ICON + ICON_GAP), y: ICON_Y, size: ICON, color: GOLD_HI,
    animate: [
      { property: "opacity", from: 0,   to: 1, at: 1.18 + i * 0.16, duration: 0.30 },
      { property: "scale",   from: 0.5, to: 1, at: 1.18 + i * 0.16, duration: 0.45, easing: "house" },
      { property: "offsetY", from: 26,  to: 0, at: 1.18 + i * 0.16, duration: 0.45, easing: "house" },
    ],
  })),
  ...PILLARS.map((pil, i) => (
    <text name={"label-" + pil.label} text={pil.label}
          x={ROW_X + i * (ICON + ICON_GAP) + ICON / 2 - LABEL_W / 2} y={LABEL_Y}
          width={LABEL_W} align="center"
          fontFamily="Inter" fontSize={17} fontWeight={600} letterSpacing={2} color={SOFT}
          animate={[
            { property: "opacity", from: 0,  to: 1, at: 1.46 + i * 0.16, duration: 0.35 },
            { property: "offsetY", from: 14, to: 0, at: 1.46 + i * 0.16, duration: 0.40, easing: "house" },
          ]} />
  )),
  <text name="headline" text="Building Better Futures Together"
        x={260} y={800} width={1400} align="center"
        fontFamily="Inter" fontSize={82} fontWeight={700} color={WHITE}
        at={t0 + 1.95} duration={1.04}
        motion={{ by: "word", from: { y: 40, opacity: 0 }, overlap: 0.6, easing: "house" }} />,
];

const beat2 = (icon, t0) => [
  bg(),
  <group name="logo-out" x={SX} y={SY} width={SW} height={SH} origin="center"
         at={t0 + 0} duration={3.0}
         animate={[
           { property: "scale",   from: 1, to: 0.30, at: 0.05, duration: 0.55, easing: "house" },
           { property: "offsetY", from: 0, to: -230, at: 0.05, duration: 0.55, easing: "house" },
         ]}>
    {logoMark()}
  </group>,
  // The stroke object mirrors the shape `path` takes above. The column owns
  // the card's computed height, so the edge has to be drawn by that same node
  // rather than by a rect sized behind it.
  <column name="card" x={CARD_X} y={CARD_Y} width={CARD_W} padding={86} gap={34}
          fill={CARD_BG} radius={28} stroke={{ color: GOLD, width: 3 }}
          at={t0 + 0.30} duration={2.69}
          animate={[
            { property: "opacity", from: 0,  to: 1, at: 0, duration: 0.35 },
            { property: "offsetY", from: 26, to: 0, at: 0, duration: 0.50, easing: "house" },
          ]}>
    <text name="eyebrow" fontFamily="Inter" fontSize={32} fontWeight={600} letterSpacing={7}
          color={SOFT} text="GET IN TOUCH" />
    <row name="row-phone" gap={40} align="center">
      {icon("phone", { size: 65, color: GOLD })}
      <text fontFamily="Inter" fontSize={58} color={WHITE} text={CONTACT.phone} />
    </row>
    <row name="row-mail" gap={40} align="center">
      {icon("mail", { size: 65, color: GOLD })}
      <text fontFamily="Inter" fontSize={58} color={WHITE} text={CONTACT.email} />
    </row>
    <column name="cta" width={CARD_W - 172} padding={{ top: 47, bottom: 47 }} align="center"
            fill={GOLD} radius={14}
            animate={[{ property: "opacity", keyframes: [
              { at: 0,   value: 1 },
              { at: 0.5, value: 0.66 },
              { at: 1.0, value: 1 },
            ], repeat: 2 }]}>
      <text fontFamily="Inter" fontSize={56} fontWeight={700} letterSpacing={4}
            color="#0b1330" text="GET STARTED" />
    </column>
  </column>,
  <text name="signoff" text="Kalyan Finance   |   Reach Out Today"
        x={260} y={800} width={1400} align="center"
        fontFamily="Inter" fontSize={54} fontWeight={600} color={SOFT}
        at={t0 + 0.95} duration={2.04}
        motion={{ by: "word", from: { y: 24, opacity: 0 }, overlap: 0.7, easing: "house" }} />,
];

export default async ({ project, icon }) => {
  const p = await project({ dir: "kf", size: "1920x1080", fps: 30, background: NAVY_DEEP });

  const BEATS = [
    { id: "shield",  dur: 3.0, build: beat1 },
    { id: "contact", dur: 3.0, build: beat2 },
  ];

  let at = 0;
  for (const b of BEATS) {
    p.compose(b.build(icon, at), { at, dur: b.dur, name: b.id });
    at += b.dur;
  }

  await p.render("renders/kalyan-6s.mp4");
};
