export default function Contributor() {
    return (
        <div className="contributor-page">
            <div className="hero">
                <h1 className="hero__title">
                    <span>Contributor</span>
                </h1>
            </div>

            {/* ── Profile Card ───────────────────────── */}
            <section className="contrib-card">
                <div className="contrib-card__avatar">
                    <div className="contrib-card__avatar-inner">SK</div>
                </div>
                <div className="contrib-card__info">
                    <h2 className="contrib-card__name">M. Saad Khan</h2>
                    <div className="contrib-card__role">Project Author &amp; Developer</div>
                    <p className="contrib-card__bio">
                        Full-stack developer passionate about building developer tools that make AI integrations
                        leaner and more efficient. Built rc-mcp-gen to solve the token bloat problem
                        in MCP servers — proving that minimal tooling leads to better, cheaper, and
                        faster agentic workflows.
                    </p>
                    <div className="contrib-card__tags">
                        <span className="contrib-tag">TypeScript</span>
                        <span className="contrib-tag">MCP</span>
                        <span className="contrib-tag">React</span>
                        <span className="contrib-tag">Rocket.Chat</span>
                        <span className="contrib-tag">Node.js</span>
                        <span className="contrib-tag">AI/LLM Tooling</span>
                    </div>
                </div>
            </section>

            {/* ── Contributions ──────────────────────── */}
            <section className="contrib-section">
                <h2 className="contrib-section__title">What I Built</h2>
                <div className="contrib-grid">
                    <div className="contrib-item">
                        <div className="contrib-item__icon">⚡</div>
                        <h3>CLI Tool (rc-mcp-gen)</h3>
                        <p>Command-line tool with list, generate, and benchmark commands. Supports preset profiles and custom API selection.</p>
                    </div>
                    <div className="contrib-item">
                        <div className="contrib-item__icon">🎨</div>
                        <h3>Web Generator</h3>
                        <p>Interactive UI with live token counter, side-by-side comparison, and one-click .zip download.</p>
                    </div>
                    <div className="contrib-item">
                        <div className="contrib-item__icon">📊</div>
                        <h3>Token Benchmark Engine</h3>
                        <p>Accurate token measurement using gpt-tokenizer. Proves 71% savings with real data, not estimates.</p>
                    </div>
                    <div className="contrib-item">
                        <div className="contrib-item__icon">📦</div>
                        <h3>Code Generator</h3>
                        <p>Handlebars-based server code generation producing ready-to-run MCP servers with proper types, validation, and MCP SDK integration.</p>
                    </div>
                    <div className="contrib-item">
                        <div className="contrib-item__icon">🗂️</div>
                        <h3>API Registry</h3>
                        <p>Curated registry of 31 Rocket.Chat REST API endpoints across 6 categories with full parameter schemas.</p>
                    </div>
                    <div className="contrib-item">
                        <div className="contrib-item__icon">🔌</div>
                        <h3>gemini-cli Integration</h3>
                        <p>Seamless connection flow — generated servers work out of the box with Google's gemini-cli.</p>
                    </div>
                </div>
            </section>

            {/* ── Tech Stack ─────────────────────────── */}
            <section className="contrib-section">
                <h2 className="contrib-section__title">Tech Stack</h2>
                <div className="tech-stack">
                    <div className="tech-item">
                        <span className="tech-item__name">TypeScript</span>
                        <span className="tech-item__desc">Core language</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-item__name">MCP SDK</span>
                        <span className="tech-item__desc">Protocol implementation</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-item__name">React + Vite</span>
                        <span className="tech-item__desc">Web UI</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-item__name">gpt-tokenizer</span>
                        <span className="tech-item__desc">Token counting</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-item__name">Handlebars</span>
                        <span className="tech-item__desc">Code generation</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-item__name">Commander</span>
                        <span className="tech-item__desc">CLI framework</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-item__name">Zod</span>
                        <span className="tech-item__desc">Schema validation</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-item__name">JSZip</span>
                        <span className="tech-item__desc">Download packaging</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
