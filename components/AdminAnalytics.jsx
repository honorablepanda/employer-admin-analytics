import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmployerAdminMockData from "../hooks/useEmployerAdminMockData";
import AdminDataChat from "./AdminDataChat";
import KPICard from "./KPICard";
import InsightCard from "./InsightCard";
import NudgeCard from "./NudgeCard";
import ProgressBar from "./ProgressBar";
import PersonaToggle from "./PersonaToggle";
import ApplicationsOverTimeChart from "./ApplicationsOverTimeChart";

const badges = [
  { id: 1, name: "First Action", threshold: 10 },
  { id: 2, name: "Rising Star", threshold: 50 },
  { id: 3, name: "Super Admin", threshold: 100 },
];

// Existing personaData object goes here (keep it as in your project)

export default function AdminAnalytics() {
  const data = useEmployerAdminMockData();
  if (!data) {
    return <div>Loading...</div>;
  }

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [toast, setToast] = useState("");
  const [persona, setPersona] = useState("employer");
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(2); // latest by default
  const [xp, setXp] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const incrementXp = (amount = 10) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      const justReachedBadge = badges.find((b) => b.threshold === newXp);
      if (justReachedBadge) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
      return newXp;
    });
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const personaObj = personaData[persona];
  const { title, timeSeries, insights, benchmarks, nudges } = personaObj;
  const kpis = timeSeries[selectedDateIndex].kpis;

  const narrative = `Welcome to the ${title}. Showing data for ${timeSeries[selectedDateIndex].date}. Benchmark comparison is ${
    showBenchmark ? "ON" : "OFF"
  }.`;

  const handleActionClick = (actionLabel) => {
    setToast(`Action "${actionLabel}" triggered! (Backend wiring coming soon)`);
    incrementXp(10);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div
      style={{
        padding: "2rem 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 900,
        margin: "auto",
        color: "#222",
        lineHeight: 1.5,
      }}
    >
      <h1 tabIndex={0} style={{ fontWeight: "700", fontSize: "2rem", marginBottom: "1rem" }}>
        {title}
      </h1>

      <PersonaToggle
        persona={persona}
        setPersona={setPersona}
        showBenchmark={showBenchmark}
        setShowBenchmark={setShowBenchmark}
      />

      {/* Timeline scroller */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          paddingBottom: "1rem",
          marginBottom: "2rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        {timeSeries.map((point, idx) => (
          <button
            key={point.date}
            onClick={() => setSelectedDateIndex(idx)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 6,
              border: idx === selectedDateIndex ? "2px solid #007bff" : "1px solid #ccc",
              background: idx === selectedDateIndex ? "#e7f0fe" : "#f9f9f9",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {point.date}
          </button>
        ))}
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" }}
      >
        {kpis.map((kpi, index) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            suffix={kpi.suffix}
            benchmark={benchmarks[index]?.value}
            showBenchmark={showBenchmark}
            index={index}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: kpis.length * 0.3 + 0.5, duration: 1 }}
        style={{
          marginTop: "2rem",
          background: "#e8f0fe",
          padding: "1rem 1.5rem",
          borderRadius: 6,
          fontStyle: "italic",
          color: "#333",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
        tabIndex={0}
        aria-live="polite"
      >
        {narrative}
      </motion.div>

      <section style={{ marginTop: "2rem" }}>
        <h2 tabIndex={0}>Actionable Insights</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {insights.map((insight, index) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              index={index}
              onActionClick={handleActionClick}
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 tabIndex={0}>Nudge Engine</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {nudges.map((nudge, index) => (
            <NudgeCard key={nudge.id} nudge={nudge} index={index} onActionClick={handleActionClick} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 tabIndex={0}>Admin Progress</h2>
        <ProgressBar xp={xp} showCelebration={showCelebration} />
        <p>
          XP: {xp} / 100{" "}
          {showCelebration && (
            <span role="img" aria-label="celebration">
              🎉
            </span>
          )}
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {badges
            .filter((badge) => xp >= badge.threshold)
            .map((badge) => (
              <div
                key={badge.id}
                style={{
                  padding: "0.25rem 1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: 12,
                }}
                title={`Badge: ${badge.name}`}
              >
                {badge.name}
              </div>
            ))}
        </div>
      </section>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#333",
            color: "white",
            padding: "0.8rem 1.2rem",
            borderRadius: 4,
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
          role="alert"
          aria-live="assertive"
        >
          {toast}
        </div>
      )}

      
<section style={{ marginTop: "2rem" }}>
  <h2 tabIndex={0}>Applications Over Time</h2>
  <ApplicationsOverTimeChart data={data.timeSeries} />
</section>


      <AdminDataChat />
    </div>
  );
}
