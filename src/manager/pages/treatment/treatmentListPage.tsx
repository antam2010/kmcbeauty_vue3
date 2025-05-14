'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventApi, DatesSetArg } from '@fullcalendar/core';

import { getTreatmentList } from '@/manager/api/treatment';

const TreatmentCalendarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  const fetchTreatmentListByRange = async (start: string, end: string) => {
    try {
      const response = await getTreatmentList({
        start_date: start,
        end_date: end,
        page: 1,
        size: 100,
      });

      const mappedEvents = response.items.map((item) => ({
        id: item.id,
        title: item.phonebook?.name ?? '이름 없음',
        start: item.reserved_at,
        end: item.finished_at,
        extendedProps: {
          memo: item.memo,
          customerName: item.phonebook?.name ?? '',
          phoneNumber: item.phonebook?.phone_number ?? '',
          durationTotalMin: item.treatment_items.reduce((sum, t) => sum + t.duration_min, 0),
        },
      }));

      setEvents(mappedEvents);
    } catch (e) {
      console.error('예약 조회 실패', e);
    }
  };

  const handleDatesSet = (arg: DatesSetArg) => {
    const start = arg.startStr;
    const end = arg.endStr;
    fetchTreatmentListByRange(start, end);
  };

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent(info.event);
  };

  const handleEdit = () => {
    if (!selectedEvent) return;
    alert(`수정 화면으로 이동: ID ${selectedEvent.id}`);
  };

  const handleDelete = () => {
    if (!selectedEvent) return;
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      alert(`삭제 요청 보냄: ID ${selectedEvent.id}`);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow relative">
      <h1 className="text-xl font-bold mb-4">시술 예약 캘린더</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale="ko"
        height="auto"
        events={events}
        datesSet={handleDatesSet}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-lg font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              고객명: {selectedEvent.extendedProps?.customerName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              연락처: {selectedEvent.extendedProps?.phoneNumber}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              시작 시간: {selectedEvent.start?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              종료 시간: {selectedEvent.end?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              메모: {selectedEvent.extendedProps?.memo}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentCalendarPage;