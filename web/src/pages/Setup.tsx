import { Link } from 'react-router-dom';

export default function Setup() {
    return (
        <div className="setup-page">
            <div className="hero">
                <h1 className="hero__title">
                    Setup <span>Guide</span>
                </h1>
                <p className="hero__desc">
                    Get your minimal MCP server running and connected to gemini-cli in under a minute.
                </p>
            </div>

            {/* ── Prerequisites ──────────────────────── */}
            <section className="setup-section">
                <h2 className="setup-section__title">Prerequisites</h2>
                <div className="setup-prereqs">
                    <div className="setup-prereq">
                        <div className="setup-prereq__icon">⬢</div>
                        <div>
                            <h3>Node.js 18+</h3>
                            <p>Required to run the MCP server. <a href="https://nodejs.org" target="_blank" rel="noopener">Download →</a></p>
                        </div>
                    </div>
                    <div className="setup-prereq">
                        <div className="setup-prereq__icon">💎</div>
                        <div>
                            <h3>gemini-cli</h3>
                            <p>Google's CLI for Gemini. <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener">Install →</a></p>
                        </div>
                    </div>
                    <div className="setup-prereq">
                        <div className="setup-prereq__icon">🚀</div>
                        <div>
                            <h3>Rocket.Chat instance</h3>
                            <p>Any self-hosted or cloud instance with REST API enabled.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Option A: Download ─────────────────── */}
            <section className="setup-section">
                <h2 className="setup-section__title">Option A — Download from Generator</h2>
                <div className="setup-steps">
                    <div className="setup-step">
                        <div className="step__n">1</div>
                        <div>
                            <h3>Generate your server</h3>
                            <p>Go to the <Link to="/generator">Generator</Link>, select your APIs, and click <strong>Download .zip</strong>.</p>
                        </div>
                    </div>
                    <div className="setup-step">
                        <div className="step__n">2</div>
                        <div>
                            <h3>Unzip &amp; install</h3>
                            <div className="code">
                                <span className="d">$</span> <span className="g">unzip</span> rocketchat-mcp-server.zip<br />
                                <span className="d">$</span> <span className="g">cd</span> rocketchat-mcp-server<br />
                                <span className="d">$</span> <span className="g">npm</span> install
                            </div>
                        </div>
                    </div>
                    <div className="setup-step">
                        <div className="step__n">3</div>
                        <div>
                            <h3>Set environment variables</h3>
                            <div className="code">
                                <span className="d">$</span> <span className="g">export</span> <span className="y">ROCKETCHAT_URL</span>=https://your-instance.rocket.chat<br />
                                <span className="d">$</span> <span className="g">export</span> <span className="y">ROCKETCHAT_TOKEN</span>=your-auth-token<br />
                                <span className="d">$</span> <span className="g">export</span> <span className="y">ROCKETCHAT_USER_ID</span>=your-user-id
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Option B: CLI ──────────────────────── */}
            <section className="setup-section">
                <h2 className="setup-section__title">Option B — Use the CLI</h2>
                <div className="setup-steps">
                    <div className="setup-step">
                        <div className="step__n">1</div>
                        <div>
                            <h3>Clone &amp; install</h3>
                            <div className="code">
                                <span className="d">$</span> <span className="g">git clone</span> https://github.com/your-repo/rc-mcp-gen<br />
                                <span className="d">$</span> <span className="g">cd</span> rc-mcp-gen && <span className="g">npm</span> install
                            </div>
                        </div>
                    </div>
                    <div className="setup-step">
                        <div className="step__n">2</div>
                        <div>
                            <h3>Generate a server</h3>
                            <div className="code">
                                <span className="d">$</span> <span className="g">npx</span> ts-node src/index.ts generate \<br />
                                {'  '}<span className="g">--apis</span> <span className="y">login channels.list chat.sendMessage</span>
                            </div>
                        </div>
                    </div>
                    <div className="setup-step">
                        <div className="step__n">3</div>
                        <div>
                            <h3>Run benchmarks (optional)</h3>
                            <div className="code">
                                <span className="d">$</span> <span className="g">npx</span> ts-node src/index.ts benchmark <span className="g">--profile</span> <span className="y">messaging</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Connect ────────────────────────────── */}
            <section className="setup-section">
                <h2 className="setup-section__title">Connect to gemini-cli</h2>
                <div className="setup-steps">
                    <div className="setup-step">
                        <div className="step__n">1</div>
                        <div>
                            <h3>Add to ~/.gemini/settings.json</h3>
                            <div className="code" style={{ whiteSpace: 'pre' }}>{`{
  "mcpServers": {
    "rocketchat": {
      "command": "npx",
      "args": ["ts-node", "src/server.ts"],
      "env": {
        "ROCKETCHAT_URL": "https://your-instance.rocket.chat"
      }
    }
  }
}`}</div>
                        </div>
                    </div>
                    <div className="setup-step">
                        <div className="step__n">2</div>
                        <div>
                            <h3>Test it</h3>
                            <div className="code">
                                <span className="d">gemini &gt;</span> <span className="y">"Send 'Hello' to #general on Rocket.Chat"</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
