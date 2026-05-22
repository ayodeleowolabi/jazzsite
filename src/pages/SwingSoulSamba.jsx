import { useState, useRef } from "react";

const ACCESS_CODE = "DCMUSIC";
const R2_BASE = "https://pub-0220304f67b944c48a04efc83576ba6b.r2.dev";

const TRACKS = [
  { num: "1", name: "Mama He Treats Your Daughter Mean", dur: "6:11",  file: "01.mp3", arranged: true },
  { num: "2", name: "One Note Samba",                   dur: "10:30", file: "02.mp3", arranged: true },
  { num: "3", name: "Hi De Ho",                         dur: "3:54",  file: "03.mp3", arranged: true },
  { num: "4", name: "Desafinado",                       dur: "9:13",  file: "04.mp3", arranged: true },
  { num: "5", name: "Come Sunday",                      dur: "6:46",  file: "05.mp3", arranged: false },
  { num: "6", name: "Freedom", dur: "3:54", file: "06.mp3", arranged: false, original: true },];

const CREDITS = [
  { name: "Ayodele Owolabi",               role: "Vocals" },
  { name: "Bohemian Caverns Jazz Orchestra", role: "Live Orchestra" },
  { name: "Elijah Balbed",                 role: "Big Band Arrangements (tracks 1–4)" },
  { name: "Thunder & Lightning LLC",       role: "Live Sound · Maryland" },
  { name: "All Souls Unitarian Church",    role: "Recorded Live, 2022" },
  { name: "Ken Avis",                      role: "Historical Liner Notes" },
];

const LINER_NOTES = [
  {
    artist: "Duke Ellington",
    note: "DC's most famous musical son, born 1899 near U Street's 'Black Broadway.' Composer, bandleader, global ambassador — over five hundred compositions, beyond category. His name lives on across DC: the Duke Ellington School of Music, the Duke Ellington Bridge, and the murals of a city that never forgot him. 'Come Sunday' is an Ellington composition, recorded with Mahalia Jackson in 1958.",
  },
  {
    artist: "Blanche Calloway",
    note: "Raised alongside Cab Calloway in Baltimore, Blanche led her own touring big-band — reputed to be the first woman ever to front an all-male jazz orchestra. The Joy Boys ranked Top 10 US bands in 1933. After WWII she managed the legendary Bohemian Caverns on U Street, where she discovered Ruth Brown and invited Atlantic Records founder Ahmet Ertegun to hear her sing. What a woman.",
  },
  {
    artist: "Ruth Brown",
    note: "Left stranded in a Howard Theater alleyway as a teenager after being fired mid-tour, Ruth was found by a patron of Frank Holiday's Pool Hall and introduced to Blanche Calloway. Calloway gave her a room and a gig. Atlantic Records followed. Sixteen chart hits between 1949–55. People called Atlantic 'The Label Ruth Brown Built.' Her pianist was a young Ray Charles.",
  },
  {
    artist: "Charlie Byrd",
    note: "A guitarist from deepest Virginia who brought bossa nova to the American mainstream. His Jazz Samba album — recorded with Stan Getz in three hours, three microphones, to a reel-to-reel in a church corridor — launched a global craze. That church was All Souls Unitarian, the same venue where Ayo recorded this album in 2022, honoring the 60th anniversary of Jazz Samba.",
  },
];

const gold = "#b8860b";
const cream = "#f5efe0";
const darkBg = "#0e0b07";
const borderColor = "rgba(184,134,11,0.25)";

export default function SwingSoulSamba() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);
  const audioRef = useRef(null);

  function handleSubmit() {
    if (input.trim().toUpperCase() === ACCESS_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  function setMediaSession(index) {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: TRACKS[index].name,
        artist: "Ayodele Owolabi",
        album: "Swing, Soul & Samba: A Tribute to Washington DC",
        artwork: [{ src: "/swing-cover.jpg", sizes: "512x512", type: "image/jpeg" }],
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (index > 0) handleTrackClick(index - 1);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (index < TRACKS.length - 1) handleTrackClick(index + 1);
      });
    }
  }

  function handleTrackClick(index) {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentTrack === index) {
      if (isPlaying) { audio.pause(); setIsPlaying(false); }
      else { audio.play(); setIsPlaying(true); }
    } else {
      audio.src = `${R2_BASE}/${TRACKS[index].file}`;
      audio.play();
      setCurrentTrack(index);
      setIsPlaying(true);
      setMediaSession(index);
    }
  }

  function handleTrackEnd() {
    if (currentTrack !== null && currentTrack < TRACKS.length - 1) {
      const next = currentTrack + 1;
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = `${R2_BASE}/${TRACKS[next].file}`;
      audio.play();
      setCurrentTrack(next);
      setIsPlaying(true);
      setMediaSession(next);
    } else {
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  }

  function handlePrev() {
    if (currentTrack !== null && currentTrack > 0) handleTrackClick(currentTrack - 1);
  }

  function handleNext() {
    if (currentTrack !== null && currentTrack < TRACKS.length - 1) handleTrackClick(currentTrack + 1);
  }

  const activeTrack = currentTrack !== null ? TRACKS[currentTrack] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        .sss-page { font-family: 'EB Garamond', Georgia, serif; }
        .sss-track { transition: background 0.2s; }
        .sss-track:hover { background: rgba(184,134,11,0.08) !important; }
        .sss-liner-card {
          border-bottom: 0.5px solid rgba(184,134,11,0.15);
          cursor: pointer;
          transition: background 0.2s;
        }
        .sss-liner-card:hover { background: rgba(184,134,11,0.06); }
        .sss-btn-gold {
          display: block; width: 100%; padding: 1rem;
          background: ${gold}; color: #0e0b07;
          text-align: center; text-decoration: none;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; font-weight: 700;
          box-sizing: border-box; border: none; cursor: pointer;
          margin-bottom: 10px;
        }
        .sss-btn-outline {
          display: block; width: 100%; padding: 0.9rem;
          background: transparent; color: ${cream};
          text-align: center; text-decoration: none;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 0.75rem; letter-spacing: 0.2em;
          text-transform: uppercase; font-weight: 400;
          box-sizing: border-box;
          border: 0.5px solid rgba(245,239,224,0.3);
          cursor: pointer; margin-bottom: 10px;
        }
        .sss-ornament {
          display: flex; align-items: center; gap: 16px;
          margin: 2rem 0; color: ${gold}; font-size: 1rem;
        }
        .sss-ornament::before, .sss-ornament::after {
          content: ''; flex: 1; height: 0.5px;
          background: rgba(184,134,11,0.3);
        }
        .sss-arranged-tag {
          font-size: 0.6rem; letter-spacing: 0.1em;
          color: ${gold}; font-style: italic;
          margin-left: 6px; opacity: 0.7;
        }
        @media (max-width: 600px) {
          .sss-header-grid { grid-template-columns: 1fr !important; text-align: center; }
          .sss-header-img { margin: 0 auto 1rem !important; }
        }
      `}</style>

      <main className="sss-page" style={{
        minHeight: "100vh",
        backgroundColor: darkBg,
        color: cream,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: unlocked ? "flex-start" : "center",
        padding: "2rem",
        paddingBottom: activeTrack ? "6rem" : "3rem",
      }}>
        <audio ref={audioRef} onEnded={handleTrackEnd} />

        {!unlocked ? (
          /* ── Gate ── */
          <div style={{ maxWidth: "360px", width: "100%", textAlign: "center" }}>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "0.65rem", letterSpacing: "0.25em",
              textTransform: "uppercase", color: gold, marginBottom: "0.5rem",
            }}>Ayodele Owolabi</p>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "2rem", fontWeight: 700, lineHeight: 1.2,
              color: cream, margin: "0 0 0.25rem",
            }}>Swing, Soul &amp; Samba</h1>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic", color: gold, fontSize: "0.95rem",
              marginBottom: "2.5rem", letterSpacing: "0.05em",
            }}>A Tribute to Washington DC</p>

            <div style={{
              borderTop: `0.5px solid ${borderColor}`,
              borderBottom: `0.5px solid ${borderColor}`,
              padding: "2rem 0", marginBottom: "2rem",
            }}>
              <p style={{ color: "rgba(245,239,224,0.55)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                You hold something rare — a live recording made at All Souls Church in Washington DC. Enter your access code to listen and download.
              </p>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="ACCESS CODE"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: `1px solid ${gold}`,
                  color: cream,
                  padding: "0.75rem 0.5rem",
                  fontSize: "1rem",
                  letterSpacing: "0.2em",
                  textAlign: "center",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  marginBottom: "0.5rem",
                }}
              />
              {error && (
                <p style={{ color: "#8b1a1a", fontSize: "0.8rem", marginBottom: "0.75rem", fontStyle: "italic" }}>
                  Incorrect code. Check your liner notes.
                </p>
              )}
              <button onClick={handleSubmit} className="sss-btn-gold" style={{ marginTop: "1rem" }}>
                Enter
              </button>
            </div>
          </div>

        ) : (
          /* ── Unlocked ── */
          <div style={{ maxWidth: "620px", width: "100%" }}>

            {/* Header */}
            <div className="sss-header-grid" style={{
              display: "grid", gridTemplateColumns: "180px 1fr",
              gap: "2rem", alignItems: "center", marginBottom: "2.5rem",
            }}>
              <img
                className="sss-header-img"
                src="/swing-soul-samba-cover.jpg"
                alt="Swing Soul Samba album cover"
                style={{ width: "180px", height: "180px", objectFit: "cover", display: "block", border: `1px solid ${borderColor}` }}
              />
              <div>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "0.65rem", letterSpacing: "0.25em",
                  textTransform: "uppercase", color: gold, margin: "0 0 6px",
                }}>Ayodele Owolabi</p>
                <h1 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.75rem", fontWeight: 900, lineHeight: 1.15,
                  color: cream, margin: "0 0 4px",
                }}>Swing, Soul &amp; Samba</h1>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic", color: gold, fontSize: "0.9rem", margin: "0 0 12px",
                }}>A Tribute to Washington DC</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(245,239,224,0.4)", letterSpacing: "0.06em", margin: 0 }}>
                  6 tracks · 40 minutes · Live at All Souls Church · 2022
                </p>
                <p style={{ fontSize: "0.6rem", color: "rgba(245,239,224,0.3)", letterSpacing: "0.1em", margin: "4px 0 0" }}>
                  Press any track to begin
                </p>
              </div>
            </div>

            <div className="sss-ornament">✦</div>

            {/* Tracklist */}
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
              Tracklist
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 0.5rem" }}>
              {TRACKS.map((track, index) => {
                const isActive = currentTrack === index;
                const isThisPlaying = isActive && isPlaying;
                return (
                  <li
                    key={track.num}
                    className="sss-track"
                    onClick={() => handleTrackClick(index)}
                    style={{
                      display: "flex", gap: "14px", alignItems: "center",
                      padding: "11px 8px",
                      borderBottom: "0.5px solid rgba(184,134,11,0.1)",
                      cursor: "pointer",
                      background: isActive ? "rgba(184,134,11,0.1)" : "transparent",
                      borderRadius: "2px",
                    }}
                  >
                    <span style={{
                      fontSize: "0.75rem",
                      color: isActive ? gold : "rgba(245,239,224,0.3)",
                      minWidth: "18px", textAlign: "right",
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}>
                      {isThisPlaying ? "▶" : isActive ? "❙❙" : track.num}
                    </span>
                 <span style={{ flex: 1, fontSize: "1rem", color: isActive ? cream : "rgba(245,239,224,0.8)",
  fontFamily: "'Playfair Display', Georgia, serif", fontStyle: isActive ? "italic" : "normal",
}}>
  {track.name}
  {track.arranged && <span className="sss-arranged-tag">arr. E. Balbed</span>}
  {track.original && <span className="sss-arranged-tag">written & arranged by Ayodele Owolabi</span>}
</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(245,239,224,0.3)", letterSpacing: "0.05em" }}>
                      {track.dur}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="sss-ornament">✦</div>

            {/* Credits */}
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
              The Recording
            </p>
            <div style={{ marginBottom: "0.5rem" }}>
              {CREDITS.map(({ name, role }) => (
                <div key={name} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "8px 0", borderBottom: "0.5px solid rgba(184,134,11,0.1)",
                }}>
                  <span style={{ fontSize: "0.95rem", color: cream, fontFamily: "'Playfair Display', Georgia, serif" }}>{name}</span>
                  <span style={{ fontSize: "0.75rem", color: gold, letterSpacing: "0.04em", fontStyle: "italic" }}>{role}</span>
                </div>
              ))}
            </div>

            <div className="sss-ornament">✦</div>

            {/* Special Thanks */}
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
              Special Thanks
            </p>
            <div style={{ marginBottom: "2rem" }}>
              {[
                "DC Commission on the Arts and Humanities for sponsoring this live recording.",
                "DC Jazz Festival for their collaboration in 2020.",
              ].map((line, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  padding: "8px 0", borderBottom: "0.5px solid rgba(184,134,11,0.08)",
                }}>
                  <span style={{ color: gold, fontSize: "0.7rem", paddingTop: "3px", flexShrink: 0 }}>✦</span>
                  <p style={{ fontSize: "0.9rem", color: "rgba(245,239,224,0.65)", lineHeight: 1.7, margin: 0 }}>{line}</p>
                </div>
              ))}
            </div>

            <div className="sss-ornament">✦</div>

            {/* Liner Notes */}
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: "0.5rem" }}>
              Historical Liner Notes
            </p>
            <p style={{ fontSize: "0.85rem", color: "rgba(245,239,224,0.45)", fontStyle: "italic", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              Notes by Ken Avis — tap each artist to read their story.
            </p>
            <div style={{ marginBottom: "0.5rem" }}>
              {LINER_NOTES.map((item, i) => (
                <div key={item.artist} className="sss-liner-card">
                  <div
                    onClick={() => setExpandedNote(expandedNote === i ? null : i)}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 8px" }}
                  >
                    <span style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.05rem", color: cream, fontStyle: "italic",
                    }}>{item.artist}</span>
                    <span style={{
                      color: gold, fontSize: "0.8rem",
                      display: "inline-block",
                      transform: expandedNote === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}>▾</span>
                  </div>
                  {expandedNote === i && (
                    <div style={{ padding: "0 8px 16px" }}>
                      <p style={{
                        fontSize: "0.9rem", color: "rgba(245,239,224,0.7)",
                        lineHeight: 1.85, margin: 0,
                        borderTop: "0.5px solid rgba(184,134,11,0.15)",
                        paddingTop: "12px",
                      }}>
                        {item.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="sss-ornament">✦</div>

            {/* How to Download */}
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: "1rem" }}>
              How to Download
            </p>
            <p style={{ fontSize: "0.85rem", color: "rgba(245,239,224,0.45)", fontStyle: "italic", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Best on your computer. Once downloaded, drag into Apple Music, Spotify, or any music player.
            </p>
            <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                ["I",   "Click Download Album below. The zip file will save to your device."],
                ["II",  "Open the zip. You'll find 6 tracks numbered 01–06."],
                ["III", "Mac: double-click the zip → drag into Apple Music. Windows: right-click → Extract All → drag into library."],
                ["IV",  "Track names, artwork, and album info are embedded and will appear automatically."],
              ].map(([num, text]) => (
                <div key={num} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <span style={{
                    fontSize: "0.7rem", color: gold, paddingTop: "2px", minWidth: "22px",
                    fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic",
                  }}>{num}</span>
                  <p style={{ fontSize: "0.85rem", color: "rgba(245,239,224,0.55)", lineHeight: 1.8, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <a href={`${R2_BASE}/swing-soul-samba.zip`} download="Swing-Soul-Samba.zip" className="sss-btn-gold">
              Download Album
            </a>
            <a href="/liner-notes-en.pdf" download className="sss-btn-outline">
              Download Liner Notes (English)
            </a>
            <a href="/liner-notes-es.pdf" download className="sss-btn-outline">
              Descargar Notas del Álbum (Español)
            </a>

          </div>
        )}
      </main>

      {/* Sticky player */}
      {activeTrack && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          backgroundColor: "#110d05",
          borderTop: `0.5px solid ${borderColor}`,
          padding: "10px 16px",
          display: "flex", alignItems: "center", gap: "12px", zIndex: 100,
        }}>
          <img
            src="/swing-cover.jpg"
            alt="Swing Soul Samba"
            style={{ width: "38px", height: "38px", objectFit: "cover", flexShrink: 0, border: `0.5px solid ${borderColor}` }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "0.9rem", color: cream,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {activeTrack.name}
            </div>
            <div style={{ fontSize: "0.65rem", color: gold, letterSpacing: "0.08em" }}>
              Ayodele Owolabi · Swing, Soul &amp; Samba
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexShrink: 0 }}>
            <button
              onClick={handlePrev}
              disabled={currentTrack === 0}
              style={{ background: "none", border: "none",
                cursor: currentTrack === 0 ? "default" : "pointer",
                color: currentTrack === 0 ? "#333" : gold, fontSize: "1rem", padding: 0 }}
            >⏮</button>
            <button
              onClick={() => currentTrack !== null && handleTrackClick(currentTrack)}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: gold, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.65rem", color: darkBg, flexShrink: 0,
              }}
            >
              {isPlaying ? "❙❙" : "▶"}
            </button>
            <button
              onClick={handleNext}
              disabled={currentTrack === TRACKS.length - 1}
              style={{ background: "none", border: "none",
                cursor: currentTrack === TRACKS.length - 1 ? "default" : "pointer",
                color: currentTrack === TRACKS.length - 1 ? "#333" : gold, fontSize: "1rem", padding: 0 }}
            >⏭</button>
          </div>
        </div>
      )}
    </>
  );
}
