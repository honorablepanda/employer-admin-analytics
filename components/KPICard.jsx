import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const kpiVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

export default function KPICard({ label, value, suffix, benchmark, showBenchmark, index }) {
  return (
    <motion.div
      custom={index}
      variants={kpiVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,123,255,0.6)" }}
      tabIndex={0}
      role="region"
      aria-label={`${label}: ${value}${suffix || ""}`}
      style={{
        background: "#f0f4f8",
        padding: "1rem 2rem",
        borderRadius: 8,
        flex: "1 1 40%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        cursor: "default",
        userSelect: "none",
        outline: "none",
        position: "relative",
      }}
      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 20px #007bff")}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)")}
    >
      <h3 style={{ margin: 0, fontSize: "1.5rem" }}>
        <CountUp start={0} end={value} duration={2} suffix={suffix || ""} separator="," />
      </h3>
      <p style={{ margin: 0, color: "#555" }}>{label}</p>

      {showBenchmark && benchmark !== undefined && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#007bff",
            color: "white",
            borderRadius: 12,
            padding: "0.2rem 0.5rem",
            fontSize: "0.8rem",
          }}
          title={`Benchmark: ${benchmark}${suffix || ""}`}
        >
          <CountUp start={0} end={benchmark} duration={2} suffix={suffix || ""} separator="," />
        </div>
      )}
    </motion.div>
  );
}

KPICard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  benchmark: PropTypes.number,
  showBenchmark: PropTypes.bool,
  index: PropTypes.number,
};
