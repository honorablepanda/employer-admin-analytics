import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function ProgressBar({ xp, showCelebration }) {
  return (
    <div
      style={{
        background: "#ddd",
        borderRadius: 20,
        height: 24,
        width: "100%",
        overflow: "hidden",
        marginBottom: 12,
        position: "relative",
      }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={xp}
      aria-label="Admin experience progress"
    >
      <motion.div
        style={{
          height: "100%",
          backgroundColor: showCelebration ? "#ffd700" : "#007bff",
          borderRadius: 20,
          width: `${Math.min(xp, 100)}%`,
        }}
        animate={{ width: `${Math.min(xp, 100)}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  xp: PropTypes.number.isRequired,
  showCelebration: PropTypes.bool,
};
