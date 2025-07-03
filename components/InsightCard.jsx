import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const insightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.4, duration: 0.6 },
  }),
};

export default function InsightCard({ insight, index, onActionClick }) {
  return (
    <motion.div
      custom={index}
      variants={insightVariants}
      initial="hidden"
      animate="visible"
      style={{
        padding: "1rem",
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      role="region"
      aria-label={insight.text}
    >
      <p style={{ margin: 0 }}>{insight.text}</p>
      <button
        onClick={() => onActionClick(insight.actionLabel)}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
        aria-label={`Action: ${insight.actionLabel}`}
      >
        {insight.actionLabel}
      </button>
    </motion.div>
  );
}

InsightCard.propTypes = {
  insight: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    actionLabel: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onActionClick: PropTypes.func.isRequired,
};
