import { useEffect, useMemo, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

type SectionId =
  | "accueil"
  | "concept"
  | "trilogie"
  | "experience"
  | "objets"
  | "vision"
  | "contact";

function scrollTo(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const NAV: Array<{ id: SectionId; label: string }> = [
  { id: "concept", label: "Le Concept" },
  { id: "trilogie", label: "La Trilogie" },
  { id: "experience", label: "Expérience" },
  { id: "objets", label: "Objets" },
  { id: "vision", label: "Vision" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  const navigate = (id: SectionId) => {
    setMenuOpen(false);
    requestAnimationFrame(() => scrollTo(id));
  };

  // Close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 960) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close menu on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="page">
      <a className="skip" href="#accueil">
        Aller au contenu
      </a>

      <header className="header">
        <div className="container header__inner">
          <button type="button" className="brand" onClick={() => navigate("accueil")} aria-label="Accueil">
            <img className="brand__logo" src={logo} alt="Logo HistoryConnexion" />
            <span className="brand__name">HistoryConnexion</span>
          </button>

          {/* Desktop nav */}
          <nav className="navDesktop" aria-label="Navigation principale">
            {NAV.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`navLink ${item.id === "contact" ? "navLink--primary" : ""}`}
                onClick={() => navigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="menuBtn"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="menuIcon" aria-hidden="true">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {/* ✅ New: push-down mobile menu (in normal flow, no overlay, no transparency issues) */}
        <div
          id="mobileMenu"
          className={`mobilePanel ${menuOpen ? "mobilePanel--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="container mobilePanel__inner">
            {NAV.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`mobilePanel__item ${item.id === "contact" ? "mobilePanel__item--primary" : ""}`}
                onClick={() => navigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="main">
        <section id="accueil" className="section">
          <div className="container">
            <div className="screen screen--hero">
              <div className="heroHead">
                <img className="heroLogo" src={logo} alt="" aria-hidden="true" />
                <div className="heroTitles">
                  <h1 className="h1">HistoryConnexion</h1>
                  <p className="subtitle">
                    Relier les sites historiques du monde à travers une aventure immersive
                  </p>
                </div>
              </div>

              <p className="impact">
                Le visiteur ne découvre pas un site. Il devient un personnage dans une histoire qui traverse les
                civilisations.
              </p>

              <div className="ctaRow">
                <button type="button" className="btn btn--gold" onClick={() => navigate("concept")}>
                  Découvrir l’univers
                </button>
                <button type="button" className="btn btn--outline" onClick={() => navigate("trilogie")}>
                  La trilogie
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => navigate("contact")}>
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="concept" className="section">
          <div className="container">
            <div className="screen">
              <h2 className="h2">Le Concept</h2>
              <p className="p">
                HistoryConnexion est une expérience culturelle immersive qui connecte plusieurs sites historiques à
                travers une aventure narrative en réalité virtuelle et mobile. Chaque site devient un épisode d’une
                grande histoire interactive.
              </p>
              <ul className="list">
                <li>Une histoire qui se poursuit d’un site à l’autre</li>
                <li>Une progression personnelle du visiteur</li>
                <li>Fusion entre visite réelle et univers virtuel</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="trilogie" className="section">
          <div className="container">
            <div className="screen">
              <h2 className="h2">La Trilogie Fondatrice — Le point de départ de l’univers HistoryConnexion</h2>

              <div className="cards">
                <article className="card">
                  <h3 className="h3">Dougga — Les Origines</h3>
                  <ul className="list">
                    <li>Découverte de la cité antique</li>
                    <li>Reconstitution d’une table historique</li>
                    <li>Recherche d’un objet clé (épée)</li>
                    <li>Premiers liens politiques et commerciaux</li>
                  </ul>
                </article>

                <article className="card">
                  <h3 className="h3">El Djem — La Continuité</h3>
                  <ul className="list">
                    <li>Lien direct avec Dougga</li>
                    <li>Histoire d’un habitant devenu gladiateur</li>
                    <li>Utilisation de l’objet trouvé à Dougga</li>
                    <li>Décisions, combats et héritage</li>
                  </ul>
                </article>

                <article className="card">
                  <h3 className="h3">Carthage — Le Pouvoir &amp; la Mémoire</h3>
                  <ul className="list">
                    <li>Découverte de la puissance politique et maritime</li>
                    <li>Réseaux commerciaux</li>
                    <li>Héritage culturel</li>
                    <li>Mémoire historique</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <div className="screen">
              <h2 className="h2">L’Expérience Immersive</h2>
              <p className="p">
                Plongez dans des scènes historiques interactives directement sur site, suivez votre progression grâce
                à l’application mobile et débloquez des éléments grâce aux QR codes placés sur les monuments.
              </p>

              <ul className="list list--badged">
                <li>
                  <span className="badge">VR</span> VR immersive
                </li>
                <li>
                  <span className="badge">App</span> Application mobile pour suivi de progression et récompenses
                </li>
                <li>
                  <span className="badge">QR</span> QR Codes pour débloquer scènes, indices et objets
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="objets" className="section">
          <div className="container">
            <div className="screen">
              <h2 className="h2">Objets Souvenirs</h2>
              <p className="p">Ce que vous découvrez dans le monde virtuel, vous pouvez l’emporter dans le monde réel.</p>
              <ul className="list">
                <li>Porte-clés d’objets historiques</li>
                <li>Artefacts en impression 3D</li>
                <li>Fragments de puzzle</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="vision" className="section">
          <div className="container">
            <div className="screen">
              <h2 className="h2">Vision Internationale</h2>
              <p className="p">
                HistoryConnexion a pour ambition de relier les civilisations du monde à travers un réseau mondial
                d’expériences historiques connectées.
              </p>
              <ul className="list">
                <li>Extension vers d’autres sites méditerranéens et européens</li>
                <li>Connexion internationale des histoires et des objets</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section section--last">
          <div className="container">
            <div className="screen">
              <h2 className="h2">Partenaires &amp; Contact</h2>
              <p className="p">Rejoignez HistoryConnexion pour collaborer sur des expériences immersives uniques.</p>

              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Merci ! Le formulaire n’est pas encore connecté.");
                }}
              >
                <div className="formRow">
                  <label className="field">
                    <span className="field__label">Nom</span>
                    <input className="input" name="name" required autoComplete="name" />
                  </label>
                  <label className="field">
                    <span className="field__label">Email</span>
                    <input className="input" type="email" name="email" required autoComplete="email" />
                  </label>
                </div>

                <label className="field">
                  <span className="field__label">Organisation (optionnel)</span>
                  <input className="input" name="organization" />
                </label>

                <label className="field">
                  <span className="field__label">Message</span>
                  <textarea className="textarea" name="message" rows={5} required />
                </label>

                <div className="ctaRow">
                  <button type="submit" className="btn btn--gold">
                    Devenir partenaire
                  </button>
                  <button type="button" className="btn btn--outline" onClick={() => navigate("accueil")}>
                    Nous contacter
                  </button>
                </div>
              </form>

              <footer className="footer">
                <small>© {year} HistoryConnexion</small>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}