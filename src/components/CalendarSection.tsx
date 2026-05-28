/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  PlusCircle, ChevronLeft, ChevronRight, Clock, MapPin, Calendar, 
  BookOpen, Heart, Activity, AlertCircle, FileText
} from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarSectionProps {
  events: CalendarEvent[];
  onToggleRegister: (eventId: string) => void;
  onOpenCreateEventModal: () => void;
}

export default function CalendarSection({
  events,
  onToggleRegister,
  onOpenCreateEventModal
}: CalendarSectionProps) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // 9 represents October (0-indexed for display usually, but here October 2024 is visual focus)
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDay, setSelectedDay] = useState<number | null>(8);

  const months = [
    'Tháng 1, 2024', 'Tháng 2, 2024', 'Tháng 3, 2024', 'Tháng 4, 2024',
    'Tháng 5, 2024', 'Tháng 6, 2024', 'Tháng 7, 2024', 'Tháng 8, 2024',
    'Tháng 9, 2024', 'Tháng 10, 2024', 'Tháng 11, 2024', 'Tháng 12, 2024'
  ];

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => (prev === 11 ? 0 : prev + 1));
  };

  // Generate mock calendar days for visual perfection
  // Let October have 31 days. Start day on Tuesday (2nd day of week)
  const totalDays = 31;
  const startOffset = 1; // 1 blank/previous month day for alignment
  const calendarDays = [];

  // Previous month placeholder
  calendarDays.push({ day: 30, isCurrentMonth: false, event: null });

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    // Find if we have any event on this day (e.g. October)
    // October is index 9
    const dayEvent = currentMonthIndex === 9 
      ? events.find(e => e.dayOfMonth === d)
      : null;

    calendarDays.push({
      day: d,
      isCurrentMonth: true,
      event: dayEvent
    });
  }

  // Find selected event details to show info
  const selectedEvent = currentMonthIndex === 9 && selectedDay
    ? events.find(e => e.dayOfMonth === selectedDay)
    : null;

  return (
    <div id="calendar-section-view" className="space-y-8 animate-fade-in">
      {/* Header section with breadcrumbs and button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-2">
            <span className="opacity-70">PORTAL</span>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-primary font-bold">Lịch &amp; Hoạt động</span>
          </nav>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Lịch &amp; Hoạt động</h2>
        </div>
        <button 
          onClick={onOpenCreateEventModal}
          className="bg-primary hover:bg-primary/90 text-on-primary font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Tạo sự kiện mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Column Left (70%): Calendar View */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 shadow-2xl overflow-hidden border border-outline-variant/10">
            
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-on-surface w-40">{months[currentMonthIndex]}</h3>
                <div className="flex border border-outline-variant/30 rounded-lg overflow-hidden shrink-0">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-surface-variant/50 transition-colors text-on-surface-variant cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-surface-variant/50 transition-colors text-on-surface-variant cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* View options */}
              <div className="flex bg-surface-container-high rounded-xl p-1 shrink-0 self-start sm:self-auto shadow-inner">
                {(['month', 'week', 'day'] as const).map(type => (
                  <button 
                    key={type}
                    onClick={() => setViewType(type)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                      viewType === type 
                        ? 'bg-primary text-on-primary shadow-sm' 
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {type === 'month' ? 'Tháng' : type === 'week' ? 'Tuần' : 'Ngày'}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Header Row */}
            <div className="grid grid-cols-7 border-b border-outline-variant/10 pb-4 mb-4 text-center">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((dayName, idx) => (
                <div 
                  key={idx} 
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    dayName === 'T7' ? 'text-tertiary' : dayName === 'CN' ? 'text-error' : 'text-on-surface-variant'
                  }`}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* Calendar Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, index) => {
                const isSelected = d.isCurrentMonth && selectedDay === d.day;
                return (
                  <div 
                    key={index}
                    onClick={() => {
                      if (d.isCurrentMonth) {
                        setSelectedDay(d.day);
                      }
                    }}
                    className={`aspect-square p-2 border border-outline-variant/5 flex flex-col justify-between group hover:bg-surface-variant/20 transition-all cursor-pointer rounded-lg relative overflow-hidden ${
                      !d.isCurrentMonth ? 'opacity-20 pointer-events-none' : ''
                    } ${
                      isSelected ? 'ring-2 ring-primary/60 bg-primary/[0.04]' : ''
                    }`}
                  >
                    <span className={`text-xs font-semibold ${
                      isSelected ? 'text-primary font-bold text-sm' : 'text-on-surface-variant'
                    }`}>
                      {d.day}
                    </span>

                    {/* Tag if has event */}
                    {d.event && (
                      <div className="flex flex-col w-full mt-auto">
                        <span className={`text-[8px] font-bold px-1 py-0.5 rounded truncate ${
                          d.event.category === 'Thể thao' 
                            ? 'bg-tertiary/25 text-tertiary border border-tertiary/10' 
                            : d.event.category === 'Workshop' 
                            ? 'bg-primary-container/25 text-primary border border-primary/10' 
                            : 'bg-error/20 text-error border border-error/10'
                        }`}>
                          {d.event.title}
                        </span>
                        {/* Glowing node action */}
                        <div className={`w-1.5 h-1.5 rounded-full absolute top-2 right-2 ${
                          d.event.category === 'Thể thao' ? 'bg-tertiary animate-pulse' : 'bg-primary animate-pulse'
                        }`}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event Category Legend & selected tooltip info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface-container-high/20 border border-outline-variant/10 rounded-2xl gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.6)]"></div>
                <span className="text-xs font-semibold text-on-surface-variant">Thể thao</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_rgba(77,142,255,0.6)]"></div>
                <span className="text-xs font-semibold text-on-surface-variant">Workshop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                <span className="text-xs font-semibold text-on-surface-variant">Teambuilding</span>
              </div>
            </div>

            {/* Micro Interaction Tooltip detail */}
            {selectedEvent ? (
              <div className="flex items-center gap-2 text-xs text-primary-fixed-dim bg-primary/15 border border-primary/20 px-3 py-1.5 rounded-xl">
                <AlertCircle className="w-4 h-4" />
                <span>Ngày {selectedDay} có sự kiện: <strong>{selectedEvent.title}</strong></span>
              </div>
            ) : (
              selectedDay && (
                <div className="text-xs text-on-surface-variant italic">
                  Ngày {selectedDay} chưa có sự kiện lên lịch.
                </div>
              )
            )}
          </div>
        </div>

        {/* Column Right (30%): Upcoming Events list & statistics */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-on-surface">Sắp diễn ra</h3>
            <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">Xem tất cả</span>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-1">
            {events.map((event) => (
              <div 
                key={event.id}
                className="glass-card rounded-2xl p-4 hover:border-primary/40 hover:-translate-y-0.5 border border-outline-variant/10 transition-all cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className={`flex flex-col items-center justify-center min-w-[60px] h-[60px] rounded-xl border ${
                    event.category === 'Thể thao' 
                      ? 'bg-tertiary/10 border-tertiary/20 text-tertiary' 
                      : event.category === 'Workshop' 
                      ? 'bg-primary-container/10 border-primary-container/20 text-primary' 
                      : 'bg-error/10 border-error/20 text-error'
                  }`}>
                    <span className="text-[10px] uppercase font-bold">{event.month}</span>
                    <span className="text-lg font-black leading-none">{event.dayOfMonth}</span>
                  </div>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <span className={`text-[9px] font-black uppercase tracking-wider ${
                      event.category === 'Thể thao' ? 'text-tertiary' : event.category === 'Workshop' ? 'text-primary' : 'text-error'
                    }`}>
                      {event.category}
                    </span>
                    <h4 className="font-bold text-xs text-on-surface truncate group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant opacity-70">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant opacity-70">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                  <button 
                    onClick={() => onToggleRegister(event.id)}
                    className={`text-[10px] font-black tracking-wider px-3 py-1.5 rounded-lg uppercase cursor-pointer ${
                      event.status === 'Đã Đăng Ký' 
                        ? 'bg-tertiary/20 text-tertiary hover:bg-tertiary/30 border border-tertiary/10' 
                        : event.status === 'Hết chỗ' 
                        ? 'bg-surface-container-highest/60 text-on-surface-variant/40 cursor-not-allowed' 
                        : 'bg-primary/20 text-primary border border-primary/25 hover:bg-primary/30'
                    }`}
                  >
                    {event.status === 'Đã Đăng Ký' ? 'Đã Đăng Ký' : event.status === 'Hết chỗ' ? 'Hết chỗ' : 'Đăng Ký'}
                  </button>
                  <span className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                    Chi tiết
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Activity statistics progress report widget */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 relative overflow-hidden group">
            <h5 className="font-bold text-xs text-on-surface mb-2 uppercase tracking-wide">Thống kê hoạt động</h5>
            <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed">
              Bạn đã đăng ký tham gia {events.filter(e => e.status === 'Đã Đăng Ký').length}/{events.length} hoạt động tháng này. Tuyệt vời!
            </p>
            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(173,198,255,0.5)]" 
                style={{ width: `${(events.filter(e => e.status === 'Đã Đăng Ký').length / Math.max(events.length, 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
