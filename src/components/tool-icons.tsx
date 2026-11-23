// Local vector marks: recognizable software symbols, with the names kept in HTML.
export function ToolIcon({ name }: { name: string }) {
  const shared = { width: 24, height: 24, viewBox: "0 0 24 24", "aria-hidden": true as const, focusable: "false" as const };
  if (name === "Figma") return <svg {...shared}><path fill="#f24e1e" d="M8 1a4 4 0 0 0 0 8h4V1Z" /><path fill="#ff7262" d="M12 1h4a4 4 0 1 1 0 8h-4Z" /><path fill="#a259ff" d="M8 9a4 4 0 0 0 0 8h4V9Z" /><circle cx="16" cy="13" r="4" fill="#1abcfe" /><path fill="#0acf83" d="M8 17h4v4a4 4 0 1 1-4-4Z" /></svg>;
  if (["Photoshop", "Illustrator", "After Effects"].includes(name)) {
    const [letters, ink, paper] = name === "Photoshop" ? ["Ps", "#31a8ff", "#001e36"] : name === "Illustrator" ? ["Ai", "#ff9a00", "#330000"] : ["Ae", "#9999ff", "#00005b"];
    return <svg {...shared}><rect x="1" y="1" width="22" height="22" rx="4" fill={paper} /><text x="12" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={ink}>{letters}</text></svg>;
  }
  if (name === "Cursor") return <svg {...shared}><path d="m5 2 15 11-7 2-3 7Z" fill="#111" /><path d="m5 2 8 13 7-2M13 15l-3 7" fill="none" stroke="#999" strokeWidth="1.2" /></svg>;
  if (name === "VS Code") return <svg {...shared}><path fill="#007acc" d="m17.5 1 5.5 2.6v16.8L17.5 23 5.8 13.5l-4.1 3.2L0 15.8V8.2l1.7-.9 4.1 3.2ZM17.5 6.1 8.8 12l8.7 5.9ZM2 10.1v3.8L4.4 12Z" /></svg>;
  if (name === "HTML/CSS") return <svg {...shared}><path fill="#e34f26" d="m1 3 1.8 17 8.2 3V3Z" /><path fill="#1572b6" d="M13 3v20l8.2-3L23 3Z" /><text x="6" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="white">5</text><text x="18" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="white">3</text></svg>;
  return <svg {...shared}><path fill="#f7df1e" d="M0 1h12v22H0Z" /><path fill="#3178c6" d="M12 1h12v22H12Z" /><text x="6" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#111">JS</text><text x="18" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="white">TS</text></svg>;
}
