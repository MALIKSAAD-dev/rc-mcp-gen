import { Link } from 'react-router-dom';
import { ENDPOINTS, FULL_TOKENS } from '../data';

export default function Landing() {
    const cost = (FULL_TOKENS * 2.5 / 1_000_000).toFixed(4);

    return (
        <div className="landing">
            {/* ── Hero ────────────────────────────────── */}
            <section className="landing__hero">
                <div className="landing__badge">MCP Community Project for Rocket.Chat</div>
                <h1 className="landing__title">
                    Your AI agent doesn't need<br />
                    <span className="landing__accent">{ENDPOINTS.length} tools</span> to send a message
                </h1>
                <p className="landing__subtitle">
                    rc-mcp-gen creates hyper-lean MCP servers — only the endpoints your agent actually uses.
                    Fewer tokens. Lower cost. Zero waste.
                </p>
                <div className="landing__ctas">
                    <Link to="/generator" className="btn btn--red btn--lg">Open Generator →</Link>
                    <Link to="/setup" className="btn btn--outline btn--lg">Setup Guide</Link>
                </div>
            </section>

            {/* ── Problem ────────────────────────────── */}
            <section className="landing__section">
                <div className="landing__section-tag">The Problem</div>
                <h2 className="landing__h2">Full MCP servers are bloated</h2>
                <div className="problem-cards">
                    <div className="problem-card">
                        <div className="problem-card__icon">📦</div>
                        <h3>{ENDPOINTS.length} tools loaded</h3>
                        <p>Every tool definition is injected into the LLM context — even the ones your agent never calls.</p>
                    </div>
                    <div className="problem-card">
                        <div className="problem-card__icon">🔥</div>
                        <h3>{FULL_TOKENS.toLocaleString()} tokens burned</h3>
                        <p>That's ${cost} wasted per request, just on tool descriptions the model has to read and ignore.</p>
                    </div>
                    <div className="problem-card">
                        <div className="problem-card__icon">🐌</div>
                        <h3>Slower &amp; less reliable</h3>
                        <p>More context = more latency, higher hallucination risk, and higher cost at scale.</p>
                    </div>
                </div>
            </section>

            {/* ── Solution ───────────────────────────── */}
            <section className="landing__section">
                <div className="landing__section-tag">The Solution</div>
                <h2 className="landing__h2">Generate a minimal server in seconds</h2>
                <div className="solution-grid">
                    <div className="solution-step">
                        <div className="solution-step__num">1</div>
                        <h3>Select APIs</h3>
                        <p>Pick only the Rocket.Chat endpoints your agent needs — messaging, channels, admin, or mix &amp; match.</p>
                    </div>
                    <div className="solution-step">
                        <div className="solution-step__num">2</div>
                        <h3>See savings live</h3>
                        <p>Watch the token counter drop in real time. Typical savings: <strong>70-73%</strong> fewer tokens.</p>
                    </div>
                    <div className="solution-step">
                        <div className="solution-step__num">3</div>
                        <h3>Download &amp; connect</h3>
                        <p>Get a ready-to-run .zip or use the CLI. Connect to gemini-cli in under a minute.</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <Link to="/generator" className="btn btn--red btn--lg">Try the Generator →</Link>
                </div>
            </section>

            {/* ── Stats bar ──────────────────────────── */}
            <section className="stats-bar">
                <div className="stat">
                    <div className="stat__val">{ENDPOINTS.length}</div>
                    <div className="stat__label">API Endpoints</div>
                </div>
                <div className="stat">
                    <div className="stat__val">71%</div>
                    <div className="stat__label">Avg. Token Savings</div>
                </div>
                <div className="stat">
                    <div className="stat__val">4</div>
                    <div className="stat__label">Quick Profiles</div>
                </div>
                <div className="stat">
                    <div className="stat__val">&lt;60s</div>
                    <div className="stat__label">Setup Time</div>
                </div>
            </section>
        </div>
    );
}
