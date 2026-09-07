// https://01a07939-f278-73b0-80ed-95eab658bea2.arena.site/
import { useEffect, useState } from "react";
import { AppProvider, useApp } from "./lib/store";
import { BottomNav, type TabId } from "./components/AppShell";
import { Confetti, ToastHost } from "./components/ui";
import Onboarding from "./components/Onboarding";
import Sheets from "./components/Sheets";
import Home from "./screens/Home";
import Discover from "./screens/Discover";
import Build from "./screens/Build";
import Grow from "./screens/Grow";
import Learn from "./screens/Learn";

function Shell() {
  const { state, toast } = useApp();
  const [tab, setTab] = useState<TabId>("home");
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 260);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!state.onboarded || !booted) return;
    const t = setTimeout(
      () =>
        toast({
          emoji: "🧭",
          title: "Today's mission is ready",
          body: "Evidence first. Then the cheapest possible experiment.",
        }),
      900,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, state.onboarded]);

  if (!state.onboarded) {
    return (
      <>
        <Onboarding />
        <ToastHost />
        <Confetti />
      </>
    );
  }

  return (
    <div className="mx-auto min-h-[100dvh] w-full max-w-md bg-[var(--color-canvas)] md:shadow-[0_0_70px_-20px_rgba(15,23,42,0.35)] dark:bg-[#0b0b12]">
      <div key={tab} className="anim-fade">
        {tab === "home" && <Home go={setTab} />}
        {tab === "discover" && <Discover />}
        {tab === "build" && <Build />}
        {tab === "grow" && <Grow />}
        {tab === "learn" && <Learn />}
      </div>
      <BottomNav tab={tab} setTab={setTab} />
      <Sheets />
      <ToastHost />
      <Confetti />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
