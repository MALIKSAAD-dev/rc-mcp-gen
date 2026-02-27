import { Link, useLocation } from 'react-router-dom';

/* ── Rocket.Chat Logo SVG ──────────────────────────── */
function RcLogo() {
    return (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="10" fill="#F5455C" />
            <path d="M24 12C17.4 12 12 16.2 12 21.5c0 2.9 1.7 5.5 4.4 7.2l-1.2 4.3 4.8-2.5c1.3.3 2.6.5 4 .5 6.6 0 12-4.2 12-9.5S30.6 12 24 12z" fill="#fff" />
            <circle cx="19" cy="21.5" r="1.8" fill="#F5455C" />
            <circle cx="24" cy="21.5" r="1.8" fill="#F5455C" />
            <circle cx="29" cy="21.5" r="1.8" fill="#F5455C" />
        </svg>
    );
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const loc = useLocation();
    const active = (path: string) => loc.pathname === path;

    return (
        <div className="app">
            {/* ── Navbar ──────────────────────────────── */}
            <nav className="nav">
                <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
                    <div className="brand__icon"><RcLogo /></div>
                    <div className="brand__text">
                        <div className="brand__name">Rocket.Chat MCP</div>
                    </div>
                </Link>
                <div className="nav__links">
                    <Link to="/" className={`nav__link ${active('/') ? 'nav__link--active' : ''}`}>Home</Link>
                    <Link to="/generator" className={`nav__link ${active('/generator') ? 'nav__link--active' : ''}`}>Generator</Link>
                    <Link to="/setup" className={`nav__link ${active('/setup') ? 'nav__link--active' : ''}`}>Setup</Link>
                    <Link to="/contributor" className={`nav__link ${active('/contributor') ? 'nav__link--active' : ''}`}>Contributor</Link>
                </div>
            </nav>

            {/* ── Page Content ────────────────────────── */}
            <main className="page-content">
                {children}
            </main>

            {/* ── Footer ─────────────────────────────── */}
            <footer className="site-footer">
                <div className="site-footer__inner">
                    <span className="site-footer__text">
                        Saad Khan
                    </span>
                </div>
            </footer>
        </div>
    );
}
