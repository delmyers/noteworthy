import React, { useState } from "react";

const noteIcons = [
  // Whole note
  <svg width="32" height="32" viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="10" ry="6" fill="black" /></svg>,
  // Half note
  <svg width="32" height="32" viewBox="0 0 32 32"><ellipse cx="12" cy="24" rx="6" ry="3" fill="white" stroke="black"/><rect x="17" y="8" width="2" height="16" fill="black"/></svg>,
  // Quarter note
  <svg width="32" height="32" viewBox="0 0 32 32"><ellipse cx="12" cy="24" rx="6" ry="3" fill="black"/><rect x="17" y="8" width="2" height="16" fill="black"/></svg>,
  // Eighth note
  <svg width="32" height="32" viewBox="0 0 32 32"><ellipse cx="12" cy="24" rx="6" ry="3" fill="black"/><rect x="17" y="8" width="2" height="16" fill="black"/><path d="M18 8 Q26 12 18 16" stroke="black" fill="none" strokeWidth="2"/></svg>,
  // Sixteenth note
  <svg width="32" height="32" viewBox="0 0 32 32"><ellipse cx="12" cy="24" rx="6" ry="3" fill="black"/><rect x="17" y="8" width="2" height="16" fill="black"/><path d="M18 8 Q26 12 18 16" stroke="black" fill="none" strokeWidth="2"/><path d="M18 12 Q26 16 18 20" stroke="black" fill="none" strokeWidth="2"/></svg>,
];

const BottomFlyout: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fly-out */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: open ? "20vh" : "0",
          background: "rgba(255,255,255,0.98)",
          boxShadow: open ? "0 -2px 16px rgba(0,0,0,0.2)" : "none",
          transition: "height 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s",
          overflow: "hidden",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open && (
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            {noteIcons.map((icon, idx) => (
              <button
                key={idx}
                style={{
                  background: "none",
                  border: "none",
                  margin: "0 16px",
                  cursor: "pointer",
                  outline: "none",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={`Note ${idx + 1}`}
              >
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* 3-dot icon */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
            position: "fixed",
            left: "0%",
            bottom: open ? "20vh" : "0px",
            padding: 0,
            margin: 0,
            background: "#333",
            border: "none",
            width: "100%",
            height: 12,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 1001,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "bottom 0.3s cubic-bezier(.4,2,.6,1)",
            clipPath: "inset(4px 0 0 0 round 95% 95% 0 0)",
        }}
        aria-label="Open flyout"
      >
        <svg width="24" height="24">
          <circle cx="4" cy="20" r="2" fill="#fff" />
          <circle cx="12" cy="20" r="2" fill="#fff" />
          <circle cx="20" cy="20" r="2" fill="#fff" />
        </svg>
      </button>
    </>
  );
};

export default BottomFlyout;