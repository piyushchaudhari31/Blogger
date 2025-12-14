

function generateInitialsAvatar(firstName, lastName) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#000"/>
      <text
        x="50%"
        y="55%"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="100"
        font-family="Arial"
        font-weight="bold"
        fill="#fff"
      >
        ${initials}
      </text>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

module.exports = generateInitialsAvatar;
