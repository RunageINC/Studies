export const Controller = () => {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      aria-label="Won Games"
    >
      {/* Controller Body */}
      <path
        d="M20 60 Q10 20 40 20 H160 Q190 20 180 60 L170 100 Q160 110 150 100 L140 80 H60 L50 100 Q40 110 30 100 L20 60"
        fill="#222"
        stroke="#000"
        strokeWidth="2"
      />
      {/* D-Pad */}
      <rect x="50" y="45" width="10" height="20" fill="#fff" />
      <rect x="45" y="50" width="20" height="10" fill="#fff" />
      {/* Face Buttons */}
      <circle cx="150" cy="45" r="5" fill="#fff" />
      <circle cx="160" cy="55" r="5" fill="#fff" />
      <circle cx="140" cy="55" r="5" fill="#fff" />
      <circle cx="150" cy="65" r="5" fill="#fff" />
      {/* Thumbsticks */}
      <circle cx="80" cy="70" r="8" fill="#fff" stroke="#000" strokeWidth="1" />
      <circle
        cx="120"
        cy="70"
        r="8"
        fill="#fff"
        stroke="#000"
        strokeWidth="1"
      />
    </svg>
  );
};
