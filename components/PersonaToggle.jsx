import React from "react";
import PropTypes from "prop-types";

export default function PersonaToggle({ persona, setPersona, showBenchmark, setShowBenchmark }) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <label htmlFor="persona-select" style={{ fontWeight: "600" }}>
        Select Persona:
      </label>
      <select
        id="persona-select"
        value={persona}
        onChange={(e) => setPersona(e.target.value)}
        style={{
          padding: "0.3rem 0.6rem",
          fontSize: "1rem",
          borderRadius: 4,
          border: "1px solid #ccc",
          outlineOffset: 2,
        }}
        aria-label="Select admin persona"
      >
        <option value="employer">Employer</option>
        <option value="universityAdmin">University Admin</option>
        <option value="careerCenterStaff">Career Center Staff</option>
      </select>

      <label
        htmlFor="benchmark-toggle"
        style={{ fontWeight: "600", cursor: "pointer", userSelect: "none" }}
      >
        <input
          type="checkbox"
          id="benchmark-toggle"
          checked={showBenchmark}
          onChange={() => setShowBenchmark(!showBenchmark)}
          style={{ marginRight: 6, cursor: "pointer" }}
          aria-checked={showBenchmark}
          role="switch"
        />
        Show Benchmark Comparison
      </label>
    </div>
  );
}

PersonaToggle.propTypes = {
  persona: PropTypes.string.isRequired,
  setPersona: PropTypes.func.isRequired,
  showBenchmark: PropTypes.bool.isRequired,
  setShowBenchmark: PropTypes.func.isRequired,
};
