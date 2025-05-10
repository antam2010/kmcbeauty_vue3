'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function TreatmentCalendarPage() {
  // 예시 데이터 (백엔드 연동 시 fetch로 교체)
  const events = [
    { title: '피부 관리', start: '2025-05-10T10:00:00', end: '2025-05-10T11:00:00' },
    { title: '스케일링', start: '2025-05-11T13:00:00', end: '2025-05-11T14:00:00' },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">시술 예약 캘린더</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale="ko"
        height="auto"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />
    </div>
  );
}
