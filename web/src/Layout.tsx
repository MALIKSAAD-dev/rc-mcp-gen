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

/* ── GitHub Icon SVG ──────────────────────────── */
function GitHubIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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
                    <a
                        href="https://github.com/MALIKSAAD-dev/rc-mcp-gen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav__link nav__github"
                        title="View on GitHub"
                    >
                        <GitHubIcon /> GitHub
                    </a>
                </div>
            </nav>

            {/* ── Page Content ────────────────────────── */}
            <main className="page-content">
                {children}
            </main>

            {/* ── Footer ─────────────────────────────── */}
            <footer className="site-footer">
                <div className="site-footer__inner">
                    <a
                        href="https://maliksaad.bio.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-footer__link"
                        title="Portfolio"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Saad Khan
                    </a>
                </div>
            </footer>
        </div>
    );
}
