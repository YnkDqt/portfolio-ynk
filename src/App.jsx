import { useState, useEffect } from "react";

// ── Palette ────────────────────────────────────────────────────────────
const C = {
  bg:            "#f7f5f0",
  white:         "#ffffff",
  sand:          "#edeae3",
  sandDark:      "#d8d4cb",
  primary:       "#1a2c4e",
  primaryLight:  "#2d4a7a",
  primaryPale:   "#e8edf5",
  primaryDeep:   "#0f1b30",
  secondary:     "#5c7a6b",
  secondaryPale: "#edf3f0",
  secondaryDark: "#3d5c4f",
  text:          "#1c1c1c",
  muted:         "#6b7280",
  border:        "#e2ddd6",
  green:         "#4a7c6f",
  greenPale:     "#e8f2ef",
  yellow:        "#c09b4a",
  yellowPale:    "#fdf6e3",
  red:           "#c0444a",
  redPale:       "#fdeaea",
};

// ── Navigation ─────────────────────────────────────────────────────────
const NAVS = [
  { id: "accueil",   label: "Accueil" },
  { id: "apropos",   label: "À propos" },
  { id: "expertise", label: "Expertise" },
  { id: "projets",   label: "Projets" },
  { id: "articles",  label: "Articles" },
  { id: "contact",   label: "Contact" },
];

// ── Styles globaux ─────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    line-height: 1.6;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 { font-family: 'Cormorant Garamond', serif; }

  a { color: inherit; text-decoration: none; }

  .anim { animation: fadeUp 0.65s ease both; }
  .d1   { animation-delay: 0.08s; }
  .d2   { animation-delay: 0.18s; }
  .d3   { animation-delay: 0.28s; }
  .d4   { animation-delay: 0.38s; }
  .d5   { animation-delay: 0.48s; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .nav-link {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
    color: ${C.primary};
    cursor: pointer;
    padding: 6px 0;
    border-bottom: 1.5px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }
  .nav-link:hover, .nav-link.active {
    color: ${C.secondary};
    border-bottom-color: ${C.secondary};
  }

  .card-hover {
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .card-hover:hover {
    box-shadow: 0 12px 40px rgba(26,44,78,0.1);
    transform: translateY(-2px);
  }

  .tag {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  @media (max-width: 768px) {
    .mob-hide  { display: none !important; }
    .mob-full  { width: 100% !important; }
    .mob-col   { flex-direction: column !important; }
    .mob-1col  { grid-template-columns: 1fr !important; }
    .mob-pad   { padding: 32px 20px !important; }
    .mob-gap   { gap: 32px !important; }
  }
`;

// ── Atoms ──────────────────────────────────────────────────────────────

function Btn({ children, variant = "primary", onClick, href, style }) {
  const base = {
    display:        "inline-flex",
    alignItems:     "center",
    gap:            8,
    padding:        "12px 28px",
    borderRadius:   2,
    border:         "none",
    cursor:         "pointer",
    fontFamily:     "'DM Sans', sans-serif",
    fontSize:       12,
    fontWeight:     500,
    letterSpacing:  "0.1em",
    textTransform:  "uppercase",
    transition:     "all 0.2s ease",
    textDecoration: "none",
    whiteSpace:     "nowrap",
    ...style,
  };
  const variants = {
    primary:    { background: C.primary,   color: C.white },
    ghost:      { background: "transparent", color: C.primary,    border: `1.5px solid ${C.primary}` },
    ghostWhite: { background: "transparent", color: C.white,      border: `1.5px solid rgba(255,255,255,0.55)` },
    soft:       { background: C.primaryPale, color: C.primary },
    secondary:  { background: C.secondary,  color: C.white },
  };
  const s = { ...base, ...variants[variant] };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={s}>{children}</a>;
  return <button onClick={onClick} style={s}>{children}</button>;
}

function Card({ children, style, className }) {
  return (
    <div className={className} style={{
      background:   C.white,
      border:       `1px solid ${C.border}`,
      borderRadius: 4,
      padding:      32,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, light }) {
  return (
    <div style={{
      fontSize:      11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontWeight:    500,
      color:         light ? "rgba(255,255,255,0.5)" : C.secondary,
      marginBottom:  14,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ label, title, subtitle, light, center = true }) {
  return (
    <div style={{ marginBottom: 56, textAlign: center ? "center" : "left" }}>
      {label && <SectionLabel light={light}>{label}</SectionLabel>}
      <h2 style={{
        fontFamily:  "'Cormorant Garamond', serif",
        fontSize:    "clamp(34px, 4.5vw, 52px)",
        fontWeight:  300,
        color:       light ? C.white : C.primary,
        lineHeight:  1.1,
        marginBottom: subtitle ? 18 : 0,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize:   17,
          color:      light ? "rgba(255,255,255,0.65)" : C.muted,
          maxWidth:   580,
          margin:     center ? "0 auto" : "0",
          lineHeight: 1.75,
          marginTop:  8,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Tag({ children, variant = "primary" }) {
  const styles = {
    primary:   { background: C.primaryPale,   color: C.primary },
    secondary: { background: C.secondaryPale, color: C.secondaryDark },
    white:     { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" },
  };
  return (
    <span className="tag" style={styles[variant]}>{children}</span>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────

function Nav({ view, setView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTo = (id) => {
    setView(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position:       "fixed",
        top:            0, left: 0, right: 0,
        zIndex:         100,
        background:     scrolled ? "rgba(247,245,240,0.96)" : "transparent",
        borderBottom:   scrolled ? `1px solid ${C.border}` : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition:     "all 0.3s ease",
      }}>
        <div style={{
          maxWidth:       1200,
          margin:         "0 auto",
          padding:        "0 40px",
          height:         72,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div onClick={() => navTo("accueil")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width:          38, height: 38,
              background:     C.primary,
              borderRadius:   2,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
            }}>
              <span style={{ color: C.white, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, lineHeight: 1 }}>Y</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: C.primary, lineHeight: 1.1 }}>
                Yannick Dequant
              </div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Résilience organisationnelle
              </div>
            </div>
          </div>

          {/* Desktop links */}
          <div className="mob-hide" style={{ display: "flex", gap: 36 }}>
            {NAVS.map(n => (
              <span
                key={n.id}
                className={`nav-link${view === n.id ? " active" : ""}`}
                onClick={() => navTo(n.id)}
              >
                {n.label}
              </span>
            ))}
          </div>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display:        "none",
              flexDirection:  "column",
              gap:            5,
              padding:        6,
              background:     "none",
              border:         "none",
              cursor:         "pointer",
            }}
            className="mob-burger"
          >
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:      22, height: 1.5,
                background: C.primary,
                transition: "all 0.22s",
                transformOrigin: "center",
                transform:  menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(4.5px, -4.5px)"
                  : "none",
                opacity:    menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:   "fixed",
        top:        72, left: 0, right: 0, bottom: 0,
        background: C.white,
        zIndex:     99,
        padding:    "40px",
        display:    "flex",
        flexDirection: "column",
        gap:        4,
        transform:  menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.28s ease",
      }}>
        {NAVS.map(n => (
          <div
            key={n.id}
            onClick={() => navTo(n.id)}
            style={{
              padding:    "20px 0",
              borderBottom: `1px solid ${C.border}`,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize:   32,
              fontWeight: 300,
              color:      view === n.id ? C.secondary : C.primary,
              cursor:     "pointer",
            }}
          >
            {n.label}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mob-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ── Page : Accueil ─────────────────────────────────────────────────────

function Accueil({ setView }) {
  const domaines = [
    { icon: "◉", title: "Continuité d'activité", desc: "Analyse BIA, plans de continuité (PCA/BCP), tests et exercices de crise." },
    { icon: "◈", title: "Gestion des risques",   desc: "Cartographie des dépendances critiques, exposition géopolitique et opérationnelle." },
    { icon: "◆", title: "ServiceNow BCM",         desc: "Paramétrage et déploiement de l'outil pour structurer la résilience." },
    { icon: "◇", title: "IA & Résilience",        desc: "Intégration de l'IA : veille informationnelle, détection d'anomalies, simulation." },
    { icon: "○", title: "Transformation",          desc: "Structuration des processus, conduite du changement, gouvernance de la résilience." },
    { icon: "△", title: "Formation",               desc: "Sensibilisation des équipes, marketing interne, culture organisationnelle." },
  ];

  const stats = [
    { val: "7+",        label: "Années d'expérience" },
    { val: "CBCI",      label: "Certifié BCI" },
    { val: "ISO 22301", label: "Référentiel maîtrisé" },
    { val: "2023–",     label: "Mission CDPQ en cours" },
  ];

  return (
    <div>
      {/* ─ Hero ─ */}
      <section style={{
        minHeight:  "100vh",
        background: C.primary,
        display:    "flex",
        alignItems: "center",
        position:   "relative",
        overflow:   "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 15% 85%, ${C.primaryLight}55 0%, transparent 55%),
            radial-gradient(ellipse at 85% 15%, ${C.secondary}22 0%, transparent 50%)
          `,
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 40px 80px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: 780 }}>
            <div className="anim" style={{
              fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
              color: C.secondary, marginBottom: 28, fontWeight: 500,
            }}>
              Senior Business Analyst — Résilience & Continuité d'activité
            </div>

            <h1 className="anim d1" style={{
              fontFamily:  "'Cormorant Garamond', serif",
              fontSize:    "clamp(46px, 7.5vw, 92px)",
              fontWeight:  300,
              color:       C.white,
              lineHeight:  1.04,
              marginBottom: 36,
            }}>
              Construire la résilience.<br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>
                Avant que la crise<br />ne l'impose.
              </em>
            </h1>

            <p className="anim d2" style={{
              fontSize:    18,
              color:       "rgba(255,255,255,0.65)",
              lineHeight:  1.85,
              marginBottom: 52,
              maxWidth:    560,
            }}>
              J'accompagne les grandes organisations dans la structuration de leur résilience opérationnelle — de l'analyse des dépendances critiques à la mise en place de plans de continuité robustes et testés.
            </p>

            <div className="anim d3" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Btn onClick={() => setView("expertise")} variant="secondary">Voir mon expertise</Btn>
              <Btn onClick={() => setView("contact")} variant="ghostWhite">Me contacter</Btn>
            </div>
          </div>

          {/* Stats */}
          <div className="anim d4" style={{
            display:     "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            marginTop:   96,
            border:      "1px solid rgba(255,255,255,0.1)",
            borderRadius: 4,
            overflow:    "hidden",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding:     "32px 24px",
                textAlign:   "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                background:  "rgba(255,255,255,0.04)",
              }}>
                <div style={{
                  fontFamily:   "'Cormorant Garamond', serif",
                  fontSize:     38,
                  fontWeight:   300,
                  color:        C.white,
                  lineHeight:   1,
                  marginBottom: 10,
                }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.07em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ Domaines ─ */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle
            label="Domaines d'intervention"
            title="Une approche globale de la résilience"
            subtitle="La résilience ne se limite pas à un plan de reprise. Elle intègre les dimensions humaines, technologiques, géopolitiques et juridiques."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {domaines.map((d, i) => (
              <Card key={i} className="card-hover">
                <div style={{ fontSize: 22, color: C.secondary, marginBottom: 20, lineHeight: 1 }}>{d.icon}</div>
                <h3 style={{
                  fontFamily:  "'Cormorant Garamond', serif",
                  fontSize:    22,
                  fontWeight:  400,
                  color:       C.primary,
                  marginBottom: 12,
                }}>{d.title}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{d.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─ Conviction ─ */}
      <section style={{ background: C.primary, padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            fontFamily:  "'Cormorant Garamond', serif",
            fontSize:    "clamp(28px, 4vw, 48px)",
            fontWeight:  300,
            color:       C.white,
            lineHeight:  1.4,
            textAlign:   "center",
            marginBottom: 48,
          }}>
            "La résilience ne se décrète pas.<br />
            <span style={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>
              Elle se construit dans la durée, par l'analyse,<br />
              l'anticipation et la capacité collective à s'adapter."
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Btn onClick={() => setView("apropos")} variant="ghostWhite">Mon parcours</Btn>
            <Btn onClick={() => setView("articles")} variant="secondary">Lire mes analyses</Btn>
          </div>
        </div>
      </section>

      {/* ─ CTA ─ */}
      <section style={{ padding: "100px 40px", background: C.sand, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily:  "'Cormorant Garamond', serif",
            fontSize:    "clamp(30px, 4vw, 46px)",
            fontWeight:  300,
            color:       C.primary,
            marginBottom: 18,
          }}>
            Votre organisation est-elle préparée ?
          </h2>
          <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
            Échangeons sur vos enjeux de résilience et les leviers concrets pour renforcer votre organisation face aux perturbations.
          </p>
          <Btn onClick={() => setView("contact")} variant="primary">Démarrer une conversation</Btn>
        </div>
      </section>
    </div>
  );
}

// ── Page : À propos ────────────────────────────────────────────────────

function APropos() {
  const parcours = [
    {
      period: "2025 → Présent", flag: "🇫🇷",
      org: "Indépendant — Portage salarial",
      role: "Business Analyst Senior — Résilience opérationnelle",
      desc: "Retour en France à l'été 2025. Poursuite de la mission CDPQ en remote. Structuration d'une approche globale de résilience : cadre de résilience, cartographie des processus critiques, analyse des dépendances (activités, technologies, tiers, compétences), déploiement ServiceNow BCM, IA de veille informationnelle, KPIs.",
      current: true,
    },
    {
      period: "2022 – 2025", flag: "🇨🇦",
      org: "CGI Montréal",
      role: "Business Analyst Senior",
      desc: "Projets stratégiques : mise en place d'une politique de résilience à la CDPQ (investisseur institutionnel mondial), harmonisation des processus lors d'une fusion de deux compagnies d'assurance. Initiatives internes : création d'un Laboratoire d'idées orienté client, communauté Web3/Blockchain.",
    },
    {
      period: "2019 – 2022", flag: "🇫🇷",
      org: "CGI Paris",
      role: "Consultant SIRH",
      desc: "Intégration de modules SIRH (gestion de la formation), développement d'une offre RPA RH, aide au choix d'un ERP et pilotage de l'implémentation. Acquisition de la rigueur en gestion de projet et conduite du changement.",
    },
    {
      period: "2016 – 2018", flag: "🇫🇷",
      org: "Ascencia Business School — en alternance chez BUT",
      role: "Master Management des Ressources Humaines",
      desc: "Alternance chez BUT : projet de mise en place d'un intranet (de l'expression de besoin à la formation des collaborateurs), gestion du LinkedIn (6 800 abonnés), communication interne. Mémoire : « Malléabilité structurelle et performance organisationnelle ».",
    },
    {
      period: "2016", flag: "🇨🇦",
      org: "UQÀM — Montréal",
      role: "Propédeutique à la maîtrise RH",
      desc: "Première expérience au Québec. Cours en organisation du travail, droit du travail, conventions collectives. Confirmation d'un intérêt profond pour la prospective et la vision systémique des organisations.",
    },
    {
      period: "2014 – 2015", flag: "🇫🇷",
      org: "Université Paris-Est — en alternance chez Septodont",
      role: "Licence Gestion des Ressources Humaines",
      desc: "Participation à la mise en place d'un SIRH chez Septodont. Gestion de projet RH, administration du personnel, première confrontation aux enjeux de transformation et d'adaptation des organisations.",
    },
  ];

  const certifications = [
    { name: "Certificate of the Business Continuity Institute (CBCI)",  org: "The BCI",            year: "2024" },
    { name: "Professional Scrum Product Owner (PSPO 1)",                 org: "Scrum.org",          year: "2020" },
    { name: "Certified Requirements Engineer (IREB)",                    org: "GASC",               year: "2020" },
    { name: "Appian Analyst Certification",                              org: "Appian Corporation", year: "2022" },
    { name: "Master en ligne Blockchain & Web3",                         org: "Founderz",           year: "2023" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ background: C.primary, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel light>À propos</SectionLabel>
          <h1 style={{
            fontFamily:  "'Cormorant Garamond', serif",
            fontSize:    "clamp(42px, 6.5vw, 78px)",
            fontWeight:  300,
            color:       C.white,
            lineHeight:  1.08,
            marginBottom: 28,
          }}>
            Yannick Dequant
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.85, maxWidth: 620 }}>
            Consultant senior en résilience organisationnelle, passionné de systémique et de prospective. Je construis des organisations capables d'absorber les chocs et de se transformer face à l'incertitude.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section style={{ background: C.sand, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 64, alignItems: "start" }}>
            <div>
              <SectionLabel>Vision</SectionLabel>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 38, fontWeight: 300, color: C.primary, lineHeight: 1.15,
              }}>
                Adaptabilité<br />& systémique
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 16, color: C.text, lineHeight: 1.95, marginBottom: 24 }}>
                Dans ma vision, chaque projet est unique et nécessite une écoute attentive pour comprendre en profondeur les enjeux, les objectifs et les contraintes. C'est en comprenant ces éléments que l'on peut concevoir une solution sur mesure qui répond au mieux aux attentes.
              </p>
              <p style={{ fontSize: 16, color: C.text, lineHeight: 1.95 }}>
                La résilience ne se décrète pas — elle se construit dans la durée, par l'analyse, l'anticipation, l'apprentissage et la capacité collective à s'adapter face à l'incertitude. Ma conviction : une organisation résiliente est une organisation qui se connaît profondément elle-même.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32 }}>
                {["Adaptabilité", "Organisation", "Transparence", "Innovation", "Prospective", "Systémique"].map(q => (
                  <span key={q} style={{
                    padding: "6px 16px", borderRadius: 2, fontSize: 12, fontWeight: 500,
                    background: C.primaryPale, color: C.primary,
                  }}>{q}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionTitle label="Expérience" title="Parcours" center={false} />

          <div style={{ position: "relative", paddingLeft: 2 }}>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
              background: `linear-gradient(to bottom, ${C.secondary}, ${C.border})`,
            }} />

            {parcours.map((p, i) => (
              <div key={i} className="anim" style={{
                paddingLeft:  40,
                paddingBottom: i < parcours.length - 1 ? 52 : 0,
                position:     "relative",
                animationDelay: `${i * 0.08}s`,
              }}>
                <div style={{
                  position:  "absolute", left: -7, top: 4,
                  width:     16, height: 16,
                  borderRadius: "50%",
                  background: p.current ? C.secondary : C.white,
                  border:    `2px solid ${p.current ? C.secondary : C.sandDark}`,
                  boxShadow: p.current ? `0 0 0 4px ${C.secondaryPale}` : "none",
                }} />

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>{p.flag}</span>
                  <span style={{ fontSize: 12, color: C.muted, letterSpacing: "0.05em" }}>{p.period}</span>
                  {p.current && (
                    <span style={{
                      padding: "2px 8px", borderRadius: 2, fontSize: 10, fontWeight: 600,
                      background: C.secondaryPale, color: C.secondaryDark, letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>En cours</span>
                  )}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 4 }}>{p.org}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22, fontWeight: 400, color: C.primary, marginBottom: 12, lineHeight: 1.2,
                }}>{p.role}</div>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, maxWidth: 680 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ background: C.sand, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionTitle label="Qualifications" title="Certifications" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {certifications.map((c, i) => (
              <Card key={i} style={{ padding: "24px 28px" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16, fontWeight: 400, color: C.primary, marginBottom: 8, lineHeight: 1.3,
                }}>{c.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{c.org}</div>
                <div style={{ fontSize: 12, color: C.secondary, fontWeight: 500, marginTop: 4 }}>{c.year}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Page : Expertise ───────────────────────────────────────────────────

function Expertise() {
  const expertises = [
    {
      num: "01",
      title: "Continuité d'activité (PCA/BCP)",
      desc: "Analyse d'impact sur les activités (BIA), définition des processus critiques et des délais maximums d'interruption acceptables (RTO/RPO). Rédaction et mise en place de plans de continuité d'activité conformes à l'ISO 22301. Exercices de validation et post-mortems structurés.",
      tags: ["BIA", "ISO 22301", "RTO/RPO", "PCA/BCP"],
    },
    {
      num: "02",
      title: "Gestion de crise",
      desc: "Conception de dispositifs de gestion de crise, mise en place de cellules de crise, rédaction de procédures et playbooks. Organisation et animation d'exercices de simulation pour tester la réactivité des équipes. Culture d'apprentissage post-crise.",
      tags: ["Cellule de crise", "Exercices", "Playbooks", "Post-mortem"],
    },
    {
      num: "03",
      title: "Analyse des risques & dépendances",
      desc: "Cartographie des dépendances critiques : activités, technologies, tiers, compétences. Évaluation de l'exposition géopolitique, réglementaire et opérationnelle. Identification et priorisation des risques systémiques pour orienter les choix structurels.",
      tags: ["Cartographie", "Géopolitique", "Tiers", "Risques systémiques"],
    },
    {
      num: "04",
      title: "ServiceNow BCM",
      desc: "Expert paramétrage ServiceNow Business Continuity Management. Déploiement et configuration de l'outil pour automatiser et structurer les processus de résilience. Intégration dans l'écosystème ITSM existant, formation des équipes métiers.",
      tags: ["ServiceNow", "BCM", "Paramétrage", "ITSM"],
    },
    {
      num: "05",
      title: "IA & Résilience",
      desc: "Intégration de l'intelligence artificielle dans les démarches de résilience : veille informationnelle automatisée, détection d'anomalies, simulation de scénarios de crise. Gouvernance et implémentation éthique de l'IA au service de l'anticipation des risques.",
      tags: ["IA", "Veille", "Simulation", "Gouvernance IA"],
    },
    {
      num: "06",
      title: "Transformation & gouvernance",
      desc: "Structuration d'approches globales de résilience dépassant les silos organisationnels. Sensibilisation et formation des équipes, marketing interne de la résilience. Mise en place d'indicateurs (KPIs) de maturité et coordination inter-équipes.",
      tags: ["Gouvernance", "Formation", "KPIs", "Change management"],
    },
  ];

  const referentiels = [
    "ISO 22301", "BCI Good Practice Guidelines", "DORA", "NIS2",
    "Cyber Resilience Act", "ISO 31000", "ITIL", "ServiceNow BCM",
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ background: C.primary, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel light>Expertise</SectionLabel>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(42px, 6.5vw, 78px)", fontWeight: 300, color: C.white, lineHeight: 1.08, marginBottom: 28,
          }}>
            Domaines<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>d'intervention</em>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.85 }}>
            Une approche globale de la résilience, dépassant les silos organisationnels pour couvrir l'ensemble des dimensions critiques.
          </p>
        </div>
      </section>

      {/* Cards expertise */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
            {expertises.map((e, i) => (
              <Card key={i} className="card-hover" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 52, fontWeight: 300, color: C.sandDark, lineHeight: 1, marginBottom: 28,
                }}>{e.num}</div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24, fontWeight: 400, color: C.primary, marginBottom: 16, lineHeight: 1.25,
                }}>{e.title}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, flex: 1, marginBottom: 24 }}>{e.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {e.tags.map(t => <Tag key={t} variant="secondary">{t}</Tag>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Référentiels */}
      <section style={{ background: C.sand, padding: "64px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Référentiels maîtrisés</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 24 }}>
            {referentiels.map(r => (
              <div key={r} style={{
                padding: "12px 24px",
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 500,
                color: C.primary,
              }}>{r}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs cibles */}
      <section style={{ background: C.primary, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle label="Secteurs" title="Organisations cibles" light
            subtitle="Investisseurs institutionnels, secteur financier, grandes organisations avec des enjeux de résilience opérationnelle complexes." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1 }}>
            {[
              { label: "Finance & Investissement", ex: "Fonds, banques, assurances" },
              { label: "Infrastructure critique",  ex: "Énergie, transport, télécoms" },
              { label: "Santé & secteur public",   ex: "Hôpitaux, administrations" },
              { label: "Grandes entreprises",      ex: "CAC 40, ETI à dimension mondiale" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "36px 28px",
                background: "rgba(255,255,255,0.05)",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.white, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{s.ex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Page : Projets ─────────────────────────────────────────────────────

function Projets({ setView }) {
  const featured = {
    title:  "Résilience organisationnelle — CDPQ",
    org:    "Caisse de dépôt et placement du Québec",
    period: "2023 – Présent",
    desc:   "Mission longue durée pour structurer une approche globale de la résilience au sein d'un investisseur institutionnel à portée mondiale. Périmètre complet : cadre de résilience, cartographie des processus critiques, analyse des dépendances (activités, technologies, tiers, compétences), plans de continuité d'activité, préparation à la gestion de crise, déploiement ServiceNow BCM et IA de veille informationnelle.",
    tags:   ["PCA/BCP", "ServiceNow BCM", "IA", "ISO 22301", "Gouvernance", "Gestion de crise"],
    points: [
      "Structuration d'un cadre de résilience global pour l'organisation",
      "Cartographie des processus critiques et analyse BIA",
      "Analyse des dépendances : technologiques, tiers, compétences clés",
      "Déploiement et paramétrage de ServiceNow BCM",
      "Mise en place d'une IA de veille informationnelle",
      "Définition et suivi de KPIs de maturité résilience",
    ],
  };

  const autres = [
    {
      title:  "Harmonisation de processus — Fusion d'assurances",
      org:    "CGI Montréal",
      period: "2022 – 2023",
      desc:   "Analyse et harmonisation des processus métiers lors de la fusion de deux compagnies d'assurance. Cartographie AS-IS/TO-BE, gestion des interdépendances, accompagnement au changement.",
      tags:   ["Process management", "Fusion", "Change management"],
    },
    {
      title:  "Laboratoire d'idées orienté client",
      org:    "CGI Montréal",
      period: "2022 – 2024",
      desc:   "Création et animation d'un laboratoire d'idées pour favoriser l'innovation interne et la co-création avec les parties prenantes clients.",
      tags:   ["Innovation", "Co-création", "Animation"],
    },
    {
      title:  "Aide au choix d'un ERP",
      org:    "CGI Paris",
      period: "2020 – 2021",
      desc:   "Accompagnement dans la sélection d'un ERP : définition des besoins, consultation des éditeurs, analyse comparative, recommandation et pilotage de l'implémentation.",
      tags:   ["ERP", "Analyse", "Recommandation"],
    },
    {
      title:  "SIRH Formation",
      org:    "CGI Paris",
      period: "2019 – 2021",
      desc:   "Intégration d'un module de gestion de la formation dans un SIRH. Recueil des besoins, paramétrage, formation des utilisateurs, conduite du changement.",
      tags:   ["SIRH", "Formation", "Conduite du changement"],
    },
    {
      title:  "Communauté Web3 / Blockchain",
      org:    "CGI Montréal",
      period: "2022 – 2023",
      desc:   "Création et animation d'une communauté interne pour sensibiliser les équipes aux technologies émergentes et identifier des cas d'usage clients.",
      tags:   ["Web3", "Blockchain", "Innovation"],
    },
    {
      title:  "Automatisation des process RH",
      org:    "CGI Paris",
      period: "2020 – 2022",
      desc:   "Développement d'une offre RPA appliquée aux processus RH : identification des cas d'usage, conception de la solution, pilote et généralisation.",
      tags:   ["RPA", "Automatisation", "RH"],
    },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ background: C.primary, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel light>Projets</SectionLabel>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(42px, 6.5vw, 78px)", fontWeight: 300, color: C.white, lineHeight: 1.08,
          }}>
            Réalisations
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Featured */}
          <div style={{ marginBottom: 72 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: 20 }}>
              Projet principal en cours
            </div>
            <div style={{
              background: C.primary,
              borderRadius: 4,
              padding: "52px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 52,
              alignItems: "start",
            }} className="mob-1col mob-pad mob-gap">
              <div>
                <div style={{ fontSize: 11, color: C.secondary, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>
                  {featured.period} — {featured.org}
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, color: C.white, lineHeight: 1.25, marginBottom: 28,
                }}>{featured.title}</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {featured.tags.map(t => <Tag key={t} variant="white">{t}</Tag>)}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 28 }}>
                  {featured.desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {featured.points.map((pt, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.secondary, marginTop: 8, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Autres projets */}
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: 24 }}>
            Autres projets
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {autres.map((p, i) => (
              <Card key={i} className="card-hover" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>{p.period} — {p.org}</div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 21, fontWeight: 400, color: C.primary, marginBottom: 14, lineHeight: 1.3, flex: 1,
                }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Page : Articles ────────────────────────────────────────────────────

function Articles() {
  const articles = [
    {
      num:     "01",
      date:    "2 février 2026",
      title:   "Géopolitique et résilience – Intégrer l'instabilité dans les choix structurels",
      excerpt: "En 2026, les tensions géopolitiques grandissantes continuent de mettre sous pression les équilibres sur lesquels reposent de nombreuses organisations. Sanctions économiques, extraterritorialité du droit, dépendances technologiques visibles du jour au lendemain : la géopolitique s'impose comme un facteur opérationnel de résilience.",
      tags:    ["Géopolitique", "Résilience", "Souveraineté", "Continuité"],
      url:     "https://yannickdequant.wordpress.com/2026/02/02/geopolitique-et-resilience-integrer-linstabilite-dans-les-choix-structurels/",
    },
    {
      num:     "02",
      date:    "6 janvier 2026",
      title:   "Résilience organisationnelle – Les enseignements clés de 2025 pour préparer 2026",
      excerpt: "Panne électrique en Espagne, crashs d'infrastructure Cloudflare, explosion des cyberattaques, durcissement réglementaire (DORA, NIS2, CRA). Rétrospective sur les perturbations qui ont rythmé 2025 et les apprentissages concrets à en tirer pour renforcer la résilience en 2026.",
      tags:    ["Résilience", "DORA", "NIS2", "Cybersécurité", "IA"],
      url:     "https://yannickdequant.wordpress.com/2026/01/06/resilience-organisationnelle-les-enseignements-cles-de-2025-pour-preparer-2026/",
    },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ background: C.primary, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel light>Articles</SectionLabel>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(42px, 6.5vw, 78px)", fontWeight: 300, color: C.white, lineHeight: 1.08, marginBottom: 24,
          }}>
            Analyses &<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>Réflexions</em>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 520, lineHeight: 1.85 }}>
            Analyses concrètes sur la résilience organisationnelle, la continuité d'activité et les enjeux opérationnels des grandes organisations.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {articles.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover"
                style={{
                  display:      "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap:          48,
                  background:   C.white,
                  border:       `1px solid ${C.border}`,
                  borderRadius: 4,
                  padding:      "40px 40px",
                  textDecoration: "none",
                  cursor:       "pointer",
                }}
              >
                <div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 64, fontWeight: 300, color: C.sandDark, lineHeight: 1, marginBottom: 16,
                  }}>{a.num}</div>
                  <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{a.date}</div>
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 400, color: C.primary,
                    lineHeight: 1.3, marginBottom: 18,
                  }}>{a.title}</h2>
                  <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, marginBottom: 24 }}>{a.excerpt}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {a.tags.map(t => <Tag key={t} variant="secondary">{t}</Tag>)}
                  </div>
                  <div style={{
                    fontSize: 12, color: C.secondary, fontWeight: 600,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    Lire l'article →
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{
            marginTop: 60,
            padding: "48px",
            background: C.sand,
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}>
            <div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26, fontWeight: 300, color: C.primary, marginBottom: 8,
              }}>Nouveaux articles chaque mois</h3>
              <p style={{ fontSize: 14, color: C.muted }}>
                Analyses sur la résilience organisationnelle, la continuité d'activité et les enjeux réglementaires.
              </p>
            </div>
            <Btn href="https://www.linkedin.com/in/yannick-dequant/" variant="primary">
              Suivre sur LinkedIn
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Page : Contact ─────────────────────────────────────────────────────

function Contact() {
  const infos = [
    { label: "Email",       val: "yannick.dequant@gmail.com",          href: "mailto:yannick.dequant@gmail.com" },
    { label: "LinkedIn",    val: "linkedin.com/in/yannick-dequant",    href: "https://www.linkedin.com/in/yannick-dequant/" },
    { label: "Blog",        val: "yannickdequant.wordpress.com",       href: "https://yannickdequant.wordpress.com" },
    { label: "Localisation",val: "Aix-en-Provence, France",            href: null },
  ];

  const dispos = [
    { label: "Statut",         val: "Indépendant — Portage salarial" },
    { label: "Mode de travail",val: "Remote / Présentiel (Aix-en-Provence, Montréal)" },
    { label: "Missions",       val: "Longue durée privilégiée" },
    { label: "Secteurs cibles",val: "Finance, investissement institutionnel, grandes organisations" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ background: C.primary, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel light>Contact</SectionLabel>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(42px, 6.5vw, 78px)", fontWeight: 300, color: C.white, lineHeight: 1.08,
          }}>
            Construisons<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>quelque chose ensemble</em>
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 40px" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "start",
        }} className="mob-1col mob-gap">
          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 34, fontWeight: 300, color: C.primary, marginBottom: 20, lineHeight: 1.2,
            }}>
              Échangeons sur vos enjeux de résilience
            </h2>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.9, marginBottom: 48 }}>
              Que vous souhaitiez structurer votre démarche de résilience, mettre en place un plan de continuité d'activité, évaluer vos dépendances critiques ou déployer ServiceNow BCM — je suis disponible pour en discuter.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {infos.map(c => (
                <div key={c.label}>
                  <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 5 }}>
                    {c.label}
                  </div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: 16, color: C.primary, fontWeight: 500,
                      textDecoration: "underline", textUnderlineOffset: 4,
                    }}>
                      {c.val}
                    </a>
                  ) : (
                    <div style={{ fontSize: 16, color: C.text }}>{c.val}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <Card style={{ background: C.sand, borderColor: C.sand }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26, fontWeight: 300, color: C.primary, marginBottom: 28,
              }}>Disponibilités</h3>

              {dispos.map((d, i) => (
                <div key={d.label} style={{
                  padding: "16px 0",
                  borderBottom: i < dispos.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: 14, color: C.primary, fontWeight: 500 }}>{d.val}</div>
                </div>
              ))}

              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 12 }}>
                <Btn href="https://www.linkedin.com/in/yannick-dequant/" variant="primary">
                  Me contacter sur LinkedIn
                </Btn>
                <Btn href="mailto:yannick.dequant@gmail.com" variant="ghost">
                  Envoyer un email
                </Btn>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────

function Footer({ setView }) {
  const navTo = (id) => { setView(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer style={{ background: C.primaryDeep, padding: "56px 40px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center", gap: 32,
      }}>
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, fontWeight: 300, color: C.white, marginBottom: 6,
          }}>
            Yannick Dequant
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            Senior Business Analyst<br />Résilience & Continuité d'activité
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {NAVS.map(n => (
            <span
              key={n.id}
              onClick={() => navTo(n.id)}
              style={{
                fontSize: 11, cursor: "pointer",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = C.white}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
            >
              {n.label}
            </span>
          ))}
        </div>

        <div style={{ textAlign: "right", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          © 2026 Yannick Dequant
        </div>
      </div>
    </footer>
  );
}

// ── App root ───────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("accueil");

  return (
    <>
      <style>{G}</style>
      <Nav view={view} setView={setView} />
      <main>
        {view === "accueil"   && <Accueil   setView={setView} />}
        {view === "apropos"   && <APropos />}
        {view === "expertise" && <Expertise />}
        {view === "projets"   && <Projets   setView={setView} />}
        {view === "articles"  && <Articles />}
        {view === "contact"   && <Contact />}
      </main>
      <Footer setView={setView} />
    </>
  );
}
