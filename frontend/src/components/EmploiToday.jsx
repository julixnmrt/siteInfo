import React from "react";
import "../styles/Calendar.css";

const events = [
  { id: 1, start: "08:00", end: "08:30", title: "Petit déjeuner" },
  { id: 2, start: "09:00", end: "10:00", title: "Réunion projet" },
  { id: 3, start: "12:00", end: "13:00", title: "Déjeuner" },
  { id: 4, start: "14:00", end: "16:00", title: "Travail sur le rapport" },
  { id: 5, start: "17:00", end: "18:00", title: "Sport" },
];

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export default function EmploiDuTempsCalendar() {
  const startHour = 8;
  const endHour = 22;
  const slotHeight = 60; // 60px par heure

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  return (
    <div className="calendar-wrapper">
      {hours.map((hour) => (
        <div key={hour} className="calendar-row">
          <div className="hour-label">{String(hour).padStart(2, "0")}:00</div>
          <div className="hour-slot" />
        </div>
      ))}

      {/* Events superposés */}
      <div className="event-layer">
        {events.map((event) => {
          const top = (timeToMinutes(event.start) - startHour * 60) * (slotHeight / 60);
          const height =
            (timeToMinutes(event.end) - timeToMinutes(event.start)) *
            (slotHeight / 60);
          return (
            <div
              key={event.id}
              className="event-box"
              style={{ top: `${top}px`, height: `${height}px` }}
            >
              {event.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
