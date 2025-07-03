import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const nudgeVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.3, duration: 0.5 },
  }),
};

export default function NudgeCard({ nudge, index, onActionClick }) {
  return (
    <motion.div
      custom={index}
      variants={nudgeVariants}
      initial="hidden"
      animate="visible"
      style={{
        padding: "1rem",
        background: "#fff9e6",
        borderRadius: 6,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #f5c518",
      }}
      role="region"
      aria-label={nudge.text}
    >
      <p style={{ margin: 0 }}>{nudge.text}</p>
      <button
        onClick={() => onActionClick(nudge.actionLabel)}
        style={{
          background: "#f5c518",
          color: "#333",
          border: "none",
          borderRadius: 4,
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
        aria-label={`Action: ${nudge.actionLabel}`}
      >
        {nudge.actionLabel}
      </button>
    </motion.div>
  );
}

NudgeCard.propTypes = {
  nudge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    actionLabel: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onActionClick: PropTypes.func.isRequired,
};
