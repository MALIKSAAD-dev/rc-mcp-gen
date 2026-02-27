import { useState, useMemo, useCallback } from 'react';
import {
    ENDPOINTS, CATEGORY_META, PROFILES,
    getCategories, estimateTokens, getTotalTokens, FULL_TOKENS,
} from '../data';
import { downloadServer } from '../generate';

export default function Generator() {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [activeProfile, setActiveProfile] = useState<string | null>(null);
    const categories = useMemo(() => getCategories(), []);

    const toggle = useCallback((id: string) => {
        setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
        setActiveProfile(null);
    }, []);

    const toggleCategory = useCallback((cat: string) => {
        const eps = ENDPOINTS.filter(e => e.category === cat);
        const allOn = eps.every(e => selected.has(e.id));
        setSelected(prev => { const n = new Set(prev); eps.forEach(e => allOn ? n.delete(e.id) : n.add(e.id)); return n; });
        setActiveProfile(null);
    }, [selected]);

    const applyProfile = useCallback((pid: string) => {
        const p = PROFILES.find(x => x.id === pid);
        if (!p) return;
        setSelected(new Set(p.endpoints));
        setActiveProfile(pid);
    }, []);

    const sel = useMemo(() => ENDPOINTS.filter(e => selected.has(e.id)), [selected]);
    const minT = useMemo(() => getTotalTokens(sel), [sel]);
    const savings = selected.size > 0 ? Math.round(((FULL_TOKENS - minT) / FULL_TOKENS) * 100) : 0;
    const fullBar = 100;
    const minBar = selected.size > 0 ? Math.round((minT / FULL_TOKENS) * 100) : 0;
    const fullCost = (FULL_TOKENS * 2.5 / 1_000_000).toFixed(5);
    const minCost = (minT * 2.5 / 1_000_000).toFixed(5);
    const hasSel = selected.size > 0;

    return (
        <div className="generator">
            {/* ── Hero ────────────────────────────────── */}
            <div className="hero">
                <h1 className="hero__title">
                    Build <span>minimal</span> MCP servers
                </h1>
                <p className="hero__desc">
                    Select only the Rocket.Chat APIs your agent needs. Watch the token savings update in real time.
                </p>
            </div>

            {/* ── Live Comparison ─────────────────────── */}
            <section className="panel">
                {/* Full side */}
                <div className="panel__side">
                    <div className="panel__label panel__label--full">
                        <span className="panel__dot panel__dot--full" />
                        Full MCP Server
                    </div>
                    <div className="metric">
                        <span className="metric__key">Tools loaded</span>
                        <span className={`metric__val ${hasSel ? 'metric__val--strike' : 'metric__val--dim'}`}>{ENDPOINTS.length}</span>
                    </div>
                    <div className="metric">
                        <span className="metric__key">Context tokens</span>
                        <span className={`metric__val ${hasSel ? 'metric__val--strike' : 'metric__val--dim'}`}>{FULL_TOKENS.toLocaleString()}</span>
                    </div>
                    <div className="metric">
                        <span className="metric__key">Cost / request</span>
                        <span className={`metric__val ${hasSel ? 'metric__val--strike' : 'metric__val--dim'}`}>${fullCost}</span>
                    </div>
                    <div className="bar">
                        <div className="bar__fill bar__fill--full" style={{ width: `${fullBar}%` }} />
                    </div>
                    {hasSel && (
                        <span style={{ fontSize: 11, color: 'var(--text-4)', fontFamily: 'var(--mono)' }}>
                            {FULL_TOKENS - minT} tokens wasted
                        </span>
                    )}
                </div>

                <div className="panel__divider" />

                {/* Minimal side */}
                <div className="panel__side">
                    <div className="panel__label panel__label--you">
                        <span className="panel__dot panel__dot--you" />
                        Your Minimal Server
                    </div>
                    <div className="metric">
                        <span className="metric__key">Tools loaded</span>
                        <span className="metric__val metric__val--bright">{hasSel ? selected.size : '—'}</span>
                    </div>
                    <div className="metric">
                        <span className="metric__key">Context tokens</span>
                        <span className="metric__val metric__val--red">{hasSel ? minT.toLocaleString() : '—'}</span>
                    </div>
                    <div className="metric">
                        <span className="metric__key">Cost / request</span>
                        <span className="metric__val metric__val--red">{hasSel ? `$${minCost}` : '—'}</span>
                    </div>
                    <div className="bar">
                        <div className="bar__fill bar__fill--you" style={{ width: `${minBar}%` }} />
                    </div>
                    {hasSel && <div className="savings-tag">↓ {savings}% lighter</div>}
                </div>
            </section>

            {/* ── Profiles ────────────────────────────── */}
            <div className="sec-label">Quick Profiles</div>
            <div className="profiles">
                {PROFILES.map(p => (
                    <button key={p.id} className={`pbtn ${activeProfile === p.id ? 'pbtn--on' : ''}`} onClick={() => applyProfile(p.id)}>
                        {p.label} · {p.endpoints.length}
                    </button>
                ))}
                <button className="pbtn" onClick={() => { setSelected(new Set()); setActiveProfile(null); }}>Clear</button>
            </div>

            {/* ── API Grid ────────────────────────────── */}
            <div className="sec-label">Select APIs</div>
            <div className="grid">
                {categories.map(cat => {
                    const meta = CATEGORY_META[cat];
                    const eps = ENDPOINTS.filter(e => e.category === cat);
                    const cnt = eps.filter(e => selected.has(e.id)).length;
                    return (
                        <div className="cat" key={cat}>
                            <div className="cat__head" onClick={() => toggleCategory(cat)}>
                                <span className="cat__name">{meta.icon} {meta.label}</span>
                                <span className="cat__badge">{cnt}/{eps.length}</span>
                            </div>
                            <div className="cat__items">
                                {eps.map(ep => (
                                    <div className="ep" key={ep.id} onClick={() => toggle(ep.id)}>
                                        <div className={`ep__ck ${selected.has(ep.id) ? 'ep__ck--on' : ''}`}>{selected.has(ep.id) && '✓'}</div>
                                        <span className={`ep__m ep__m--${ep.method}`}>{ep.method}</span>
                                        <span className="ep__id">{ep.id}</span>
                                        <span className="ep__desc">{ep.description}</span>
                                        <span className="ep__t">{estimateTokens(ep)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Actions ─────────────────────────────── */}
            <div className="sec-label">Get Your Server</div>
            <div className="acts">
                <div className="act">
                    <div className="act__title">📦 Download .zip</div>
                    <div className="act__desc">Ready-to-run MCP server. Unzip → npm install → connect to gemini-cli.</div>
                    <button className="btn btn--red" disabled={!hasSel} onClick={() => downloadServer(sel)}>
                        Download Server
                    </button>
                </div>
                <div className="act">
                    <div className="act__title">⌨️ Run via CLI</div>
                    <div className="act__desc">Generate locally using the rc-mcp-gen command-line tool.</div>
                    <div className="code">
                        <span className="d">$</span> <span className="g">npx</span> ts-node src/index.ts generate \<br />
                        {'  '}<span className="g">--apis</span>{' '}
                        <span className="y">{hasSel ? [...selected].slice(0, 3).join(' ') + (selected.size > 3 ? ' ...' : '') : 'login channels.list'}</span>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ──────────────────────────── */}
            <div className="bottombar">
                <div className="bottombar__inner">
                    <div className="bottombar__left">
                        <span className="bottombar__count">{selected.size}/{ENDPOINTS.length} tools</span>
                        {hasSel && (
                            <>
                                <span className="bottombar__sep" />
                                <span className="bottombar__save">↓ {savings}% · {minT} tokens</span>
                            </>
                        )}
                    </div>
                    <button className="btn btn--red" disabled={!hasSel} onClick={() => downloadServer(sel)}>
                        ↓ Download .zip
                    </button>
                </div>
            </div>
        </div>
    );
}
