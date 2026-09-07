// https://01a07939-f278-75fe-893a-a407299f1bd2.arena.site/
import { useEffect, useState } from "react";
import { AppProvider, useApp, type Tab } from "./store";
import { Button, Chip, Confetti, IconButton, PullToRefresh, Sheet, SheetBlock, Toasts } from "./components/ui";
import Sheets from "./components/Sheets";
import Home from "./screens/Home";
import Discover from "./screens/Discover";
import Build from "./screens/Build";
import Grow from "./screens/Grow";
import Learn from "./screens/Learn";
import { cn } from "./utils/cn";

/* ============================ nav icons ============================ */
const I = {
  home: "M3 10.6 12 3.5l9 7.1V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  discover: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2.1 5-5 2.1 2.1-5z",
  build: "M14.7 6.3a4 4 0 0 0 5 5L21 12.6 11.4 22l-2-2-1.4 1.4L5 18.4 6.4 17l-2-2L13.4 6zM3 8 8 3l3 3-5 5z",
  grow: "M4 19h16M7 16V9m5 7V5m5 11v-5",
  learn: "M12 4 2 9l10 5 10-5zM5 12.5V17c0 1.4 3.1 3 7 3s7-1.6 7-3v-4.5",
};

function NavIcon({ d, active }: { d: string; active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[23px] w-[23px]" stroke="currentColor" strokeWidth={active ? 2.4 : 1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: I.home },
  { id: "discover", label: "Discover", icon: I.discover },
  { id: "build", label: "Build", icon: I.build },
  { id: "grow", label: "Grow", icon: I.grow },
  { id: "learn", label: "Learn", icon: I.learn },
];

/* ============================ shell ============================ */
function Shell() {
  const { tab, setTab, theme, toggleTheme, confetti, openSheet, level, mode } = useApp();
  const [onboard, setOnboard] = useState(true);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => window.scrollTo(0, 0), 30);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="anim-aurora absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brand-400/25 blur-[80px] dark:bg-brand-600/20" />
        <div className="anim-aurora absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-[90px] dark:bg-fuchsia-700/15" style={{ animationDelay: "3s" }} />
        <div className="anim-aurora absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-sky-400/15 blur-[80px] dark:bg-sky-700/12" style={{ animationDelay: "6s" }} />
      </div>

      {/* ============================ header ============================ */}
      <header className="safe-t sticky top-0 z-30 border-b border-slate-900/[0.05] bg-white/70 backdrop-blur-2xl dark:border-white/[0.06] dark:bg-[#08080d]/70">
        <div className="mx-auto flex w-full max-w-md items-center gap-2.5 px-4 py-2.5">
          <button onClick={() => setTab("home")} className="press flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-2xl grad-brand text-[15px] text-white shadow-[0_8px_20px_-10px_rgba(109,94,252,0.95)]">
              🚀
            </div>
            <div className="text-left">
              <div className="font-display text-[15px] leading-none font-extrabold tracking-tight">Launchpad</div>
              <div className="mt-0.5 text-[10.5px] font-semibold muted">AI e-commerce launch coach</div>
            </div>
          </button>
          <div className="flex-1" />
          <button
            onClick={() => openSheet("install")}
            className="press flex h-9 items-center gap-1.5 rounded-2xl border border-brand-500/30 bg-brand-500/10 px-3 text-[12px] font-bold text-brand-700 dark:text-brand-200"
          >
            ＋ Install
          </button>
          <IconButton label="Toggle theme" onClick={toggleTheme}>
            <span className="text-[15px]">{theme === "dark" ? "☀️" : "🌙"}</span>
          </IconButton>
          <button onClick={() => setTab("learn")} className="press relative grid h-10 w-10 place-items-center rounded-2xl grad-brand text-[12px] font-extrabold text-white">
            {level}
            <span className="absolute -bottom-1 rounded-full bg-white px-1 text-[7.5px] font-extrabold text-brand-700 dark:bg-slate-900 dark:text-brand-200">
              LV
            </span>
          </button>
        </div>
      </header>

      {/* ============================ content ============================ */}
      <PullToRefresh>
        <main className="mx-auto w-full max-w-md pb-32">
          <div key={tab}>
            {tab === "home" && <Home />}
            {tab === "discover" && <Discover />}
            {tab === "build" && <Build />}
            {tab === "grow" && <Grow />}
            {tab === "learn" && <Learn />}
          </div>
        </main>
      </PullToRefresh>

      {/* ============================ bottom nav ============================ */}
      <nav className="fixed inset-x-0 bottom-0 z-40">
        <div className="safe-b border-t border-slate-900/[0.06] bg-white/80 pb-1 backdrop-blur-2xl dark:border-white/[0.07] dark:bg-[#0a0a11]/85">
          <div className="mx-auto flex w-full max-w-md items-stretch justify-between px-2 pt-1.5">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="press relative flex flex-1 flex-col items-center gap-1 py-1.5"
                >
                  <span
                    className={cn(
                      "relative grid h-9 w-14 place-items-center rounded-2xl transition-all duration-300",
                      active
                        ? "bg-brand-500/12 text-brand-600 dark:bg-brand-500/20 dark:text-brand-200"
                        : "text-slate-400 dark:text-slate-500",
                    )}
                    style={active ? { transform: "translateY(-2px) scale(1.06)" } : undefined}
                  >
                    <NavIcon d={t.icon} active={active} />
                    {active && <span className="absolute -top-[9px] h-1 w-8 rounded-full grad-brand" />}
                  </span>
                  <span
                    className={cn(
                      "text-[10.5px] font-bold transition-colors",
                      active ? "text-brand-600 dark:text-brand-200" : "text-slate-400 dark:text-slate-500",
                    )}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <Sheets />
      <Toasts />
      <Confetti trigger={confetti} />

      {/* ============================ onboarding ============================ */}
      {onboard && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/55 backdrop-blur-[8px]">
          <div className="anim-sheet safe-b w-full max-w-md rounded-t-[30px] border-t border-white/25 bg-[#fbfbfe]/95 p-5 pb-7 backdrop-blur-2xl dark:border-white/10 dark:bg-[#101018]/95">
            {slide === 0 && (
              <div className="anim-slide-up">
                <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-[28px] grad-brand text-4xl shadow-[0_20px_40px_-16px_rgba(109,94,252,0.9)]">
                  🚀
                </div>
                <h2 className="text-center font-display text-[24px] leading-tight font-extrabold tracking-tight">
                  Your AI team for turning an idea into a real business
                </h2>
                <p className="mx-auto mt-2.5 max-w-[300px] text-center text-[13.5px] leading-relaxed muted">
                  Not a store builder. A coach that shows you the evidence, the risks, and the cheapest experiment that can prove you wrong.
                </p>
              </div>
            )}
            {slide === 1 && (
              <div className="anim-slide-up">
                <div className="mx-auto mb-4 flex justify-center gap-2">
                  {["🎯", "🧪", "🎨", "🎬", "📊"].map((e, i) => (
                    <div
                      key={e}
                      className="anim-pop grid h-12 w-12 place-items-center rounded-2xl border border-slate-900/[0.06] bg-white/80 text-xl dark:border-white/10 dark:bg-white/[0.06]"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <h2 className="text-center font-display text-[22px] leading-tight font-extrabold tracking-tight">
                  One mission at a time
                </h2>
                <p className="mx-auto mt-2.5 max-w-[310px] text-center text-[13.5px] leading-relaxed muted">
                  Discover opportunities → validate them → build the brand → create content → read the numbers honestly. 17 guided stages, one
                  clear next action each day.
                </p>
              </div>
            )}
            {slide === 2 && (
              <div className="anim-slide-up">
                <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-[28px] bg-amber-500/15 text-4xl">🛡️</div>
                <h2 className="text-center font-display text-[22px] leading-tight font-extrabold tracking-tight">
                  Learning mode is free of risk
                </h2>
                <p className="mx-auto mt-2.5 max-w-[310px] text-center text-[13.5px] leading-relaxed muted">
                  Research, simulate and practise without spending anything. Real commerce needs an adult account holder — we'll say so plainly
                  instead of pretending otherwise.
                </p>
                <div className="mt-3 flex justify-center gap-2">
                  <Chip tone="ok">No borrowing</Chip>
                  <Chip tone="warn">Organic first</Chip>
                  <Chip tone="brand">€150 cap</Chip>
                </div>
              </div>
            )}

            <div className="mt-5 flex items-center gap-2">
              {slide < 2 ? (
                <>
                  <div className="flex flex-1 gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={cn("h-1.5 rounded-full transition-all duration-300", i <= slide ? "w-6 grad-brand" : "w-1.5 bg-slate-300 dark:bg-white/20")}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setOnboard(false)}>
                    Skip
                  </Button>
                  <Button onClick={() => setSlide((s) => s + 1)}>Next →</Button>
                </>
              ) : (
                <Button full size="lg" onClick={() => setOnboard(false)}>
                  Start my mission
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* mode pill */}
      <div className="pointer-events-none fixed bottom-[86px] left-0 right-0 z-30 flex justify-center">
        <span className="rounded-full border border-white/25 bg-slate-900/70 px-2.5 py-1 text-[9.5px] font-bold tracking-wider text-white/80 uppercase backdrop-blur-xl dark:border-white/10">
          {mode === "learn" ? "learning mode · sandbox" : "launch mode · guardian required"}
        </span>
      </div>
    </div>
  );
}

/* ============================ install prompt ============================ */
function InstallSheet() {
  const { closeSheet } = useApp();
  return (
    <Sheet
      title="Install Launchpad"
      subtitle="Add to your home screen for full-screen, offline-capable learning"
      footer={<Button full onClick={closeSheet}>Add to home screen</Button>}
    >
      <div className="mb-3 flex gap-2">
        {["📱", "📴", "🔔", "⚡"].map((e, i) => (
          <div
            key={e}
            className="anim-pop flex-1 rounded-2xl border border-slate-900/[0.06] bg-white/70 p-3 text-center text-xl dark:border-white/10 dark:bg-white/[0.05]"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {e}
          </div>
        ))}
      </div>
      <SheetBlock title="What you get" tone="ok">
        Full-screen app-like experience, theme-coloured browser bar, offline lesson library, push-ready notifications and instant launch from
        your home screen.
      </SheetBlock>
      <SheetBlock title="On iOS">
        Tap the <b>Share</b> icon → <b>Add to Home Screen</b> → Add.
      </SheetBlock>
      <SheetBlock title="On Android / desktop">
        Accept the install prompt, or use the browser menu → <b>Install app</b>.
      </SheetBlock>
      <SheetBlock title="Service worker" tone="warn">
        Offline support for learning content is prepared and will cache on your next visit — commerce actions always require a live connection
        so nothing is ever charged by accident.
      </SheetBlock>
    </Sheet>
  );
}

/* wrap: install sheet is rendered by Sheets.tsx switch? Keep local for clarity */
function InstallBridge() {
  const { sheet } = useApp();
  return sheet === "install" ? <InstallSheet /> : null;
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
      <InstallBridge />
    </AppProvider>
  );
}
