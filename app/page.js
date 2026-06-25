"use client";

import { motion } from "framer-motion";

// ── animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Agents",     value: "48",   change: "↑ 8 this week",      up: true,  icon: "ti-robot",        color: "from-violet-500 to-violet-700",  glow: "rgba(124,58,237,0.25)" },
  { label: "Tasks Completed",  value: "3.2K", change: "↑ 24% vs last week", up: true,  icon: "ti-circle-check", color: "from-blue-500 to-blue-700",      glow: "rgba(37,99,235,0.25)"  },
  { label: "Avg Response",     value: "1.4s", change: "↓ 0.3s faster",      up: true,  icon: "ti-clock",        color: "from-emerald-500 to-emerald-700", glow: "rgba(5,150,105,0.25)" },
  { label: "API Credits",      value: "82%",  change: "↓ 18% used",         up: false, icon: "ti-bolt",         color: "from-amber-400 to-amber-600",    glow: "rgba(217,119,6,0.25)"  },
];

const CHART_BARS = [
  { day: "Mon", pct: 45 }, { day: "Tue", pct: 60 },
  { day: "Wed", pct: 40 }, { day: "Thu", pct: 75 },
  { day: "Fri", pct: 55 }, { day: "Sat", pct: 90, peak: true },
  { day: "Sun", pct: 80 },
];

const AGENTS = [
  { name: "Email Sorter",    task: "Processing inbox queue",  icon: "ti-mail",      iconBg: "rgba(124,58,237,0.2)",  iconColor: "#A78BFA", status: "Running", statusClass: "running" },
  { name: "Doc Summarizer",  task: "Finished 24 docs",        icon: "ti-file-text", iconBg: "rgba(5,150,105,0.2)",   iconColor: "#34D399", status: "Done",    statusClass: "done"    },
  { name: "Web Researcher",  task: "Scraping 3 sources",      icon: "ti-search",    iconBg: "rgba(37,99,235,0.2)",   iconColor: "#60A5FA", status: "Running", statusClass: "running" },
  { name: "Code Reviewer",   task: "Auth error on repo",      icon: "ti-code",      iconBg: "rgba(239,68,68,0.15)",  iconColor: "#F87171", status: "Error",   statusClass: "error"   },
  { name: "Report Builder",  task: "Awaiting trigger",        icon: "ti-chart-bar", iconBg: "rgba(255,255,255,0.06)",iconColor: "rgba(255,255,255,0.3)", status: "Idle", statusClass: "idle" },
];

const FEED = [
  { msg: "Email Sorter moved 142 emails to Urgent folder",    time: "2 min ago",  color: "#A78BFA" },
  { msg: "Doc Summarizer completed Q2 board report",            time: "11 min ago", color: "#34D399" },
  { msg: "Code Reviewer failed — GitHub token expired",         time: "18 min ago", color: "#F87171" },
  { msg: "Web Researcher pulled 38 articles on AI trends",      time: "34 min ago", color: "#60A5FA" },
  { msg: "New agent Lead Qualifier deployed to prod",         time: "1 hr ago",   color: "#A78BFA" },
  { msg: "API usage hit 80% — auto-scaling triggered",          time: "2 hr ago",   color: "#FCD34D" },
];

const DONUT_LEGEND = [
  { label: "Research",    pct: "40%", color: "#7C3AED" },
  { label: "Automation",  pct: "24%", color: "#2563EB" },
  { label: "Summarize",   pct: "16%", color: "#059669" },
  { label: "Other",       pct: "20%", color: "#D97706" },
];

const NAV_ITEMS = [
  { icon: "ti-layout-dashboard", label: "Dashboard",    active: true  },
  { icon: "ti-robot",            label: "Agents"                       },
  { icon: "ti-chart-line",       label: "Analytics"                    },
];

const NAV_WORKSPACE = [
  { icon: "ti-workflow",  label: "Workflows"    },
  { icon: "ti-database",  label: "Data Sources" },
  { icon: "ti-puzzle",    label: "Integrations" },
];

// ── status styles map ─────────────────────────────────────────────────────────
const STATUS_STYLES = {
  running: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  done:    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  idle:    "bg-white/5 text-white/30 border border-white/10",
  error:   "bg-red-500/12 text-red-400 border border-red-500/20",
};

// ── sub-components ────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <aside className="w-[220px] min-w-[220px] flex flex-col px-3.5 py-5 bg-white/[0.04] border-r border-white/[0.08] backdrop-blur-xl relative z-10">
      <span className="font-display text-[17px] font-extrabold tracking-tight text-white px-1.5 mb-7">
        synth<span className="text-violet-400">AI</span>
      </span>

      <p className="text-[10px] font-semibold text-white/25 tracking-[1.5px] uppercase px-2 mb-2">Overview</p>
      {NAV_ITEMS.map((n) => (
        <div
          key={n.label}
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium mb-0.5 cursor-pointer transition-all
            ${n.active
              ? "bg-violet-600/25 text-violet-300 border border-violet-500/30"
              : "text-white/40 hover:bg-white/[0.06] hover:text-white/80"}`}
        >
          <i className={`ti ${n.icon} text-base`} aria-hidden="true" />
          {n.label}
        </div>
      ))}

      <p className="text-[10px] font-semibold text-white/25 tracking-[1.5px] uppercase px-2 mt-5 mb-2">Workspace</p>
      {NAV_WORKSPACE.map((n) => (
        <div
          key={n.label}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-white/40 hover:bg-white/[0.06] hover:text-white/80 cursor-pointer transition-all mb-0.5"
        >
          <i className={`ti ${n.icon} text-base`} aria-hidden="true" />
          {n.label}
        </div>
      ))}

      <p className="text-[10px] font-semibold text-white/25 tracking-[1.5px] uppercase px-2 mt-5 mb-2">System</p>
      <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-white/40 hover:bg-white/[0.06] hover:text-white/80 cursor-pointer transition-all mb-0.5">
        <i className="ti ti-bell text-base" aria-hidden="true" />
        Alerts
        <span className="ml-auto bg-red-500/20 text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full">3</span>
      </div>
      <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-white/40 hover:bg-white/[0.06] hover:text-white/80 cursor-pointer transition-all">
        <i className="ti ti-settings text-base" aria-hidden="true" />
        Settings
      </div>

      {/* user */}
      <div className="mt-auto flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] cursor-pointer hover:bg-white/[0.08] transition-all">
        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
          NQ
        </div>
        <div>
          <p className="text-[12px] font-semibold text-white/80">Neha Q.</p>
          <p className="text-[10px] text-white/30">Admin</p>
        </div>
        <i className="ti ti-chevron-right ml-auto text-[13px] text-white/20" aria-hidden="true" />
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 bg-white/[0.02] border-b border-white/[0.07] backdrop-blur-md relative z-10">
      <div>
        <p className="font-display text-[18px] font-bold text-white tracking-tight">Agent Dashboard</p>
        <p className="text-[11px] text-white/30 mt-0.5">Monday, 23 June 2026</p>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 bg-emerald-500/12 border border-emerald-500/25 rounded-full px-3 py-1.5 text-[11px] font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          12 agents running
        </div>
        <button className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 active:scale-95 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition-all">
          <i className="ti ti-plus text-[13px]" aria-hidden="true" />
          New Agent
        </button>
      </div>
    </div>
  );
}

function StatCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          variants={fadeUp} initial="hidden" animate="show" custom={i}
          className="relative bg-white/[0.05] border border-white/[0.09] backdrop-blur-xl rounded-2xl p-4 overflow-hidden"
        >
          {/* top accent */}
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.color}`} />
          <div className="flex items-center justify-between text-[11px] font-medium text-white/40 mb-2">
            {s.label}
            <i className={`ti ${s.icon} text-sm`} style={{ color: s.glow.replace("0.25", "0.8") }} aria-hidden="true" />
          </div>
          <p className="font-display text-[28px] font-extrabold text-white tracking-tight leading-none">{s.value}</p>
          <p className={`text-[10px] font-medium mt-1.5 ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.change}</p>
        </motion.div>
      ))}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-[18px] ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, sub }) {
  return (
    <div className="mb-4">
      <p className="text-[13px] font-semibold text-white/85">{title}</p>
      <p className="text-[11px] text-white/30 mt-0.5">{sub}</p>
    </div>
  );
}

function ThroughputChart() {
  return (
    <GlassCard>
      <CardHeader title="Task Throughput" sub="Agent executions over the last 7 days" />
      <div className="flex items-end gap-1.5 h-[90px]">
        {CHART_BARS.map((b) => (
          <div key={b.day} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className="w-full rounded-t-md transition-opacity hover:opacity-70 cursor-pointer"
              style={{
                height: `${b.pct}%`,
                background: b.peak
                  ? "linear-gradient(180deg,#A78BFA,#7C3AED)"
                  : "rgba(124,58,237,0.45)",
              }}
            />
            <span className="text-[9px] text-white/25">{b.day}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function AgentsList() {
  return (
    <GlassCard>
      <CardHeader title="Active Agents" sub="Live status overview" />
      <div className="flex flex-col divide-y divide-white/[0.05]">
        {AGENTS.map((a) => (
          <div key={a.name} className="flex items-center gap-2.5 py-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: a.iconBg }}
            >
              <i className={`ti ${a.icon} text-[14px]`} style={{ color: a.iconColor }} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-white/80 truncate">{a.name}</p>
              <p className="text-[10px] text-white/30 truncate">{a.task}</p>
            </div>
            <span className={`ml-auto text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[a.statusClass]}`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function ActivityFeed() {
  return (
    <GlassCard>
      <CardHeader title="Recent Activity" sub="Last 6 agent events" />
      <div className="flex flex-col divide-y divide-white/[0.04]">
        {FEED.map((f, i) => (
          <div key={i} className="flex items-start gap-2.5 py-2">
            <div className="w-[7px] h-[7px] rounded-full mt-1 flex-shrink-0" style={{ background: f.color }} />
            <div>
              <p className="text-[11px] text-white/55 leading-relaxed">{f.msg}</p>
              <p className="text-[10px] text-white/20 mt-0.5">{f.time}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function DonutChart() {
  return (
    <GlassCard>
      <CardHeader title="Task Distribution" sub="By agent category this month" />
      <div className="flex items-center gap-5">
        <svg width="110" height="110" viewBox="0 0 110 110" className="flex-shrink-0">
          <circle cx="55" cy="55" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
          <circle cx="55" cy="55" r="40" fill="none" stroke="#7C3AED" strokeWidth="18" strokeDasharray="100 151" strokeDashoffset="0" />
          <circle cx="55" cy="55" r="40" fill="none" stroke="#2563EB" strokeWidth="18" strokeDasharray="60 191" strokeDashoffset="-100" />
          <circle cx="55" cy="55" r="40" fill="none" stroke="#059669" strokeWidth="18" strokeDasharray="40 211" strokeDashoffset="-160" />
          <circle cx="55" cy="55" r="40" fill="none" stroke="#D97706" strokeWidth="18" strokeDasharray="51 200" strokeDashoffset="-200" />
          <text x="55" y="51" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">3.2K</text>
          <text x="55" y="64" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Inter, sans-serif">tasks</text>
        </svg>
        <div className="flex flex-col gap-2">
          {DONUT_LEGEND.map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-[11px] text-white/50">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
              {l.label}
              <span className="ml-auto font-semibold text-white/80">{l.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0A0A12] font-sans relative overflow-hidden">

      {/* gradient orbs */}
      <div className="pointer-events-none absolute -top-24 left-16 w-[420px] h-[420px] rounded-full bg-violet-700 opacity-35 blur-[80px]" />
      <div className="pointer-events-none absolute top-48 -right-20 w-[360px] h-[360px] rounded-full bg-blue-600 opacity-35 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-16 left-72 w-[280px] h-[280px] rounded-full bg-violet-700 opacity-20 blur-[80px]" />

      <Sidebar />

      <div className="flex flex-col flex-1 relative z-10 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-5">
          <StatCards />

          {/* mid row */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-3 mb-3"
          >
            <ThroughputChart />
            <AgentsList />
          </motion.div>

          {/* bottom row */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="grid grid-cols-1 xl:grid-cols-2 gap-3"
          >
            <ActivityFeed />
            <DonutChart />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
