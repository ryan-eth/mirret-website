function CodeEditorMockup() {
  return (
    <div className="mt-6 rounded-t-xl overflow-hidden" style={{ background: "#191a1a" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-white/80">Brand Protection Scanner</span>
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-white/45">
            All Sources
          </span>
          <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] text-green-400">
            Active
          </span>
          <span className="text-[11px] text-white/30">Last scan 3 min ago</span>
        </div>
        <button className="rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-[#191a1a]">
          Run scan
        </button>
      </div>

      {/* Function header */}
      <div className="px-5 pt-4 pb-2">
        <h4 className="text-[15px] font-medium text-white mb-0.5">Check Domain Similarity</h4>
        <p className="text-[12px] text-white/40 mb-3">
          Scores a candidate domain against protected brands using Levenshtein distance + visual similarity.
        </p>

        {/* Tab row */}
        <div className="flex gap-0 mb-2">
          <span className="text-[12px] text-white/80 border-b border-white/40 pb-1 mr-4">
            Rule
          </span>
          <span className="text-[12px] text-white/30 pb-1 mr-4">Input Schema</span>
        </div>

        {/* Sub-row */}
        <div className="flex items-center gap-1 mb-3 text-[11px] text-white/30">
          <span className="text-white/50">Available checks:</span>
          <span className="rounded border border-white/10 px-2 py-0.5 text-white/40">DNS Lookup</span>
          <span className="rounded border border-white/10 px-2 py-0.5 text-white/40">
            WHOIS Query
          </span>
        </div>
      </div>

      {/* Code area */}
      <div className="px-2 pb-1 overflow-hidden">
        <div className="flex text-[12px] leading-[1.7] font-mono">
          {/* Line numbers */}
          <div className="select-none pr-3 pl-3 text-right text-white/20 shrink-0">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code content */}
          <div className="overflow-hidden">
            {/* Line 1: comment */}
            <div>
              <span style={{ color: "#6b7280" }}>
                # Scores domain similarity against protected brand names
              </span>
            </div>
            {/* Line 2 */}
            <div>
              <span className="text-white">threat_signals</span>
              <span className="text-white/60"> = </span>
              <span className="text-white">{"{}"}</span>
            </div>
            {/* Line 3 */}
            <div>
              <span className="text-white">risk_score</span>
              <span className="text-white/60"> = </span>
              <span style={{ color: "#f59e0b" }}>0.0</span>
            </div>
            {/* Line 4: blank */}
            <div>&nbsp;</div>
            {/* Line 5 */}
            <div>
              <span style={{ color: "#a78bfa" }}>try</span>
              <span className="text-white">:</span>
            </div>
            {/* Line 6: comment */}
            <div>
              <span className="text-white/20">{"    "}</span>
              <span style={{ color: "#6b7280" }}># Check domain registration</span>
            </div>
            {/* Line 7 */}
            <div>
              <span className="text-white/20">{"    "}</span>
              <span className="text-white">result</span>
              <span className="text-white/60"> = </span>
              <span style={{ color: "#a78bfa" }}>await </span>
              <span style={{ color: "#60a5fa" }}>check_domain</span>
              <span className="text-white">(candidate_domain)</span>
            </div>
            {/* Line 8: blank */}
            <div>&nbsp;</div>
            {/* Line 9 */}
            <div>
              <span className="text-white/20">{"    "}</span>
              <span style={{ color: "#a78bfa" }}>if not </span>
              <span className="text-white">result.</span>
              <span style={{ color: "#60a5fa" }}>get</span>
              <span className="text-white">(</span>
              <span style={{ color: "#f59e0b" }}>&quot;registered&quot;</span>
              <span className="text-white">):</span>
            </div>
            {/* Line 10 */}
            <div>
              <span className="text-white/20">{"        "}</span>
              <span className="text-white">threat_signals[</span>
              <span style={{ color: "#f59e0b" }}>&quot;status&quot;</span>
              <span className="text-white">]</span>
              <span className="text-white/60"> = </span>
              <span style={{ color: "#f59e0b" }}>
                &quot;Domain not yet active&quot;
              </span>
            </div>
            {/* Line 11 */}
            <div>
              <span className="text-white/20">{"        "}</span>
              <span style={{ color: "#a78bfa" }}>return </span>
              <span className="text-white">{"{"}</span>
              <span style={{ color: "#f59e0b" }}>&quot;threat_signals&quot;</span>
              <span className="text-white">: threat_signals, </span>
              <span style={{ color: "#f59e0b" }}>&quot;risk_score&quot;</span>
              <span className="text-white">: risk_score{"}"}</span>
            </div>
            {/* Line 12: blank */}
            <div>&nbsp;</div>
            {/* Line 13 */}
            <div>
              <span className="text-white/20">{"    "}</span>
              <span className="text-white">threat_signals[</span>
              <span style={{ color: "#f59e0b" }}>&quot;registrar&quot;</span>
              <span className="text-white">]</span>
              <span className="text-white/60"> = </span>
              <span className="text-white">result[</span>
              <span style={{ color: "#f59e0b" }}>&quot;registrar&quot;</span>
              <span className="text-white">]</span>
            </div>
            {/* Line 14 */}
            <div>
              <span className="text-white/20">{"    "}</span>
              <span className="text-white">threat_signals[</span>
              <span style={{ color: "#f59e0b" }}>&quot;created_date&quot;</span>
              <span className="text-white">]</span>
              <span className="text-white/60"> = </span>
              <span className="text-white">result[</span>
              <span style={{ color: "#f59e0b" }}>&quot;created&quot;</span>
              <span className="text-white">]</span>
            </div>
            {/* Line 15 */}
            <div>
              <span className="text-white/20">{"    "}</span>
              <span className="text-white">risk_score</span>
              <span className="text-white/60"> = </span>
              <span style={{ color: "#60a5fa" }}>calculate_similarity</span>
              <span className="text-white">(candidate_domain, brand_domain)</span>
            </div>
            {/* Line 16: blank */}
            <div>&nbsp;</div>
            {/* Line 17 */}
            <div>
              <span style={{ color: "#a78bfa" }}>except </span>
              <span style={{ color: "#60a5fa" }}>Exception</span>
              <span style={{ color: "#a78bfa" }}> as </span>
              <span className="text-white">e:</span>
            </div>
            {/* Line 18 */}
            <div>
              <span className="text-white/20">{"    "}</span>
              <span className="text-white">threat_signals[</span>
              <span style={{ color: "#f59e0b" }}>&quot;error&quot;</span>
              <span className="text-white">]</span>
              <span className="text-white/60"> = </span>
              <span style={{ color: "#f59e0b" }}>
                f&quot;Scan failed. {"{"}</span>
              <span className="text-white">e</span>
              <span style={{ color: "#f59e0b" }}>{"}"}&quot;</span>
            </div>
            {/* Line 19: blank */}
            <div>&nbsp;</div>
            {/* Line 20 */}
            <div>
              <span style={{ color: "#a78bfa" }}>return </span>
              <span className="text-white">{"{"}</span>
              <span style={{ color: "#f59e0b" }}>&quot;threat_signals&quot;</span>
              <span className="text-white">: threat_signals, </span>
              <span style={{ color: "#f59e0b" }}>&quot;risk_score&quot;</span>
              <span className="text-white">: risk_score{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestResultsMockup() {
  return (
    <div className="mt-6 rounded-t-xl overflow-hidden" style={{ background: "#191a1a" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-white/80">Brand Protection Scanner</span>
          <span className="text-[11px] text-white/30">3 min ago</span>
        </div>
      </div>

      <div className="px-5 pt-4 pb-4">
        <h4 className="text-[15px] font-medium text-white mb-4">Scan results</h4>

        {/* Three stat boxes */}
        <div className="flex gap-3 mb-5">
          {/* Pass Rate */}
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] text-white/40 mb-1">Detection Rate</p>
            <p className="text-[32px] font-medium text-white leading-none mb-1">97%</p>
            <p className="text-[10px] text-white/30">Based on 8,420 domains scanned</p>
          </div>

          {/* Simulations passed */}
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] text-white/40 mb-1">Threats detected</p>
            <p className="text-[32px] font-medium text-white leading-none mb-1">142</p>
            <p className="text-[10px] text-white/30">Across all monitored sources</p>
          </div>

          {/* Simulations failed */}
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] text-white/40 mb-1">Takedowns filed</p>
            <p className="text-[32px] font-medium text-white leading-none mb-1">38</p>
            <p className="text-[10px] text-white/30">Enforcement actions initiated</p>
          </div>
        </div>

        {/* Table header */}
        <div className="flex items-center border-b border-white/[0.06] pb-2 mb-2">
          <span className="flex-1 text-[11px] text-white/40">Threat category</span>
          <span className="w-24 text-[11px] text-white/40 text-center">Status</span>
          <span className="w-24 text-[11px] text-white/40 text-right">Detection rate</span>
        </div>

        {/* Sample rows */}
        <div className="flex items-center border-b border-white/[0.06] py-2">
          <span className="flex-1 text-[12px] text-white/60">Lookalike Domains</span>
          <span className="w-24 text-center">
            <span className="inline-block rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] text-green-400">
              Detected
            </span>
          </span>
          <span className="w-24 text-[12px] text-white/60 text-right">99%</span>
        </div>
        <div className="flex items-center border-b border-white/[0.06] py-2">
          <span className="flex-1 text-[12px] text-white/60">Phishing Pages</span>
          <span className="w-24 text-center">
            <span className="inline-block rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] text-green-400">
              Detected
            </span>
          </span>
          <span className="w-24 text-[12px] text-white/60 text-right">97%</span>
        </div>
        <div className="flex items-center py-2">
          <span className="flex-1 text-[12px] text-white/60">Counterfeit Stores</span>
          <span className="w-24 text-center">
            <span className="inline-block rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] text-green-400">
              Detected
            </span>
          </span>
          <span className="w-24 text-[12px] text-white/60 text-right">94%</span>
        </div>
      </div>

      {/* Green progress bar at bottom */}
      <div className="h-1 w-full bg-white/[0.04]">
        <div className="h-full rounded-r-full bg-green-500" style={{ width: "97%" }} />
      </div>
    </div>
  );
}

export default function ControlSection() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Section heading */}
        <h2
          className="text-white font-light text-[44px] leading-[1.15] mb-10 max-w-[550px]"
          style={{ fontFamily: "var(--font-emilio)" }}
        >
          See exactly what threats are targeting your brand
        </h2>

        {/* Two cards side by side */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Card 1: Precise Customization */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{
              background:
                "linear-gradient(rgba(38, 40, 40, 0.8) 0%, rgba(22, 23, 23, 0.8) 100%)",
            }}
          >
            {/* Warm amber glow at bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 px-6 pt-8 pb-0">
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/45 mb-3">
                Detection Rules
              </p>
              <h3
                className="text-[24px] font-normal text-white mb-3"
              >
                Precise detection
              </h3>
              <p className="text-[14px] leading-relaxed text-white/[0.61] max-w-[400px] mb-0">
                Define detection rules and threat thresholds with precision so Mirret catches exactly what matters to your brand.
              </p>
              <CodeEditorMockup />
            </div>
          </div>

          {/* Card 2: Refine As You Go */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{
              background:
                "linear-gradient(rgba(38, 40, 40, 0.8) 0%, rgba(22, 23, 23, 0.8) 100%)",
            }}
          >
            {/* Warm amber glow at bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 px-6 pt-8 pb-0">
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/45 mb-3">
                Scan Results
              </p>
              <h3
                className="text-[24px] font-normal text-white mb-3"
              >
                Real-time results
              </h3>
              <p className="text-[14px] leading-relaxed text-white/[0.61] max-w-[400px] mb-0">
                Every scan produces actionable results. Track detection rates, threat severity, and enforcement outcomes in real time.
              </p>
              <TestResultsMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
