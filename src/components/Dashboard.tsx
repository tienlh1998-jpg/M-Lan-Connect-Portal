/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  TrendingUp, Users, CheckCircle, Calendar, Plus, 
  MapPin, Clock, BookOpen, Star, Sparkles, Heart, Activity,
  Sliders, MessageSquare, ChevronRight, Check
} from 'lucide-react';
import { Club, CalendarEvent, UserProfile } from '../types';

interface DashboardProps {
  clubs: Club[];
  events: CalendarEvent[];
  profile: UserProfile;
  onJoinClub: (clubId: string) => void;
  onToggleRegister: (eventId: string) => void;
  onOpenCreateEventModal: () => void;
}

export default function Dashboard({
  clubs,
  events,
  profile,
  onJoinClub,
  onToggleRegister,
  onOpenCreateEventModal
}: DashboardProps) {
  const [chartRange, setChartRange] = useState<'month' | 'quarter'>('month');

  // Interactive Attendance chart values
  const monthData = [40, 55, 45, 70, 85, 60, 75, 92];
  const quarterData = [65, 70, 75, 80, 85, 78, 88, 95];
  const activeData = chartRange === 'month' ? monthData : quarterData;

  // Department distribution static values
  const departmentAllocation = [
    { name: 'Phòng Lab', count: 420, percentage: 85, color: 'bg-primary-container' },
    { name: 'Văn phòng Mỹ Lan', count: 310, percentage: 65, color: 'bg-tertiary' },
    { name: 'Sản xuất', count: 285, percentage: 55, color: 'bg-secondary' },
    { name: 'Nhân sự & HC', count: 230, percentage: 45, color: 'bg-outline' },
  ];

  // Outstanding widgets: we take the first 3 clubs
  const featuredClubs = clubs.slice(0, 3);

  // Active counts
  const totalActiveClubs = clubs.filter(c => c.status === 'Active').length;
  const activeMembers = 1245; 
  const attendanceRate = '92%';
  const upcomingEventsCount = events.filter(e => e.status === 'Đã Đăng Ký').length;

  return (
    <div id="dashboard-view" className="space-y-8 animate-fade-in">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Tổng quan</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Chào buổi sáng, {profile.name}. Đây là tình hình cộng đồng Mỹ Lan hôm nay.
          </p>
        </div>
        <button 
          onClick={onOpenCreateEventModal}
          className="bg-primary hover:bg-primary/90 text-on-primary font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Tạo sự kiện mới
        </button>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="glass-panel p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-primary/10 text-primary">
              <Sparkles className="w-6 h-6" />
            </span>
            <span className="text-tertiary text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12%
            </span>
          </div>
          <h3 className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Thành viên tích cực</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface">{activeMembers.toLocaleString('vi-VN')}</span>
            <span className="text-xs text-on-surface-variant/60">người</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-tertiary/10 text-tertiary">
              <Users className="w-6 h-6" />
            </span>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">2 CLB mới</span>
          </div>
          <h3 className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">CLB hoạt động</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface">{totalActiveClubs}</span>
            <span className="text-xs text-on-surface-variant/60">đơn vị</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-secondary/10 text-secondary">
              <CheckCircle className="w-6 h-6" />
            </span>
            <span className="text-xs text-on-surface-variant">Ổn định</span>
          </div>
          <h3 className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Tỷ lệ điểm danh</h3>
          <div className="flex items-baseline gap-2 w-full">
            <div className="w-full">
              <span className="text-2xl font-bold text-on-surface">{attendanceRate}</span>
              <div className="w-full h-1.5 bg-surface-container-highest/60 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-error/10 text-error">
              <Calendar className="w-6 h-6" />
            </span>
            <span className="text-xs text-on-surface-variant">Tuần này</span>
          </div>
          <h3 className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Sự kiện sắp tới</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface">{events.length}</span>
            <span className="text-xs text-on-surface-variant/60">hoạt động</span>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 glass-panel p-8 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-bold text-on-surface">Biểu đồ Điểm danh</h4>
              <p className="text-sm text-on-surface-variant">Xu hướng tham gia 30 ngày qua</p>
            </div>
            <div className="flex bg-surface-container-high rounded-xl p-1 gap-1">
              <button 
                onClick={() => setChartRange('month')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  chartRange === 'month' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Tháng này
              </button>
              <button 
                onClick={() => setChartRange('quarter')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  chartRange === 'quarter' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Quý trước
              </button>
            </div>
          </div>
          
          {/* Mock Line Chart Area */}
          <div className="relative h-64 flex items-end gap-2 pt-6">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              <div className="border-b border-on-surface"></div>
              <div className="border-b border-on-surface"></div>
              <div className="border-b border-on-surface"></div>
              <div className="border-b border-on-surface"></div>
            </div>
            {activeData.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div 
                  style={{ height: `${val}%` }} 
                  className="w-full chart-gradient rounded-t-lg relative border-t-2 border-primary group-hover:bg-primary/30 transition-all duration-500"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-high border border-outline-variant/30 text-[10px] font-bold text-primary px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {val}%
                  </div>
                </div>
                <span className="text-[10px] text-on-surface-variant/70 mt-2 font-mono">P{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl">
          <h4 className="text-lg font-bold text-on-surface mb-1">Phân bổ Thành viên</h4>
          <p className="text-sm text-on-surface-variant mb-6">Theo nhóm phòng ban / CLB</p>
          <div className="space-y-5">
            {departmentAllocation.map((dept, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-on-surface">{dept.name}</span>
                  <span className="text-primary">{dept.count} TV</span>
                </div>
                <div className="h-2 bg-surface-container-highest/40 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${dept.color}`}
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Widget CLB Nổi bật */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold text-on-surface">Widget CLB Nổi bật</h4>
            <span className="text-primary text-xs font-semibold hover:underline cursor-pointer">Xem tất cả</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredClubs.map((club) => (
              <div 
                key={club.id} 
                className={`glass-panel p-5 rounded-2xl flex flex-col justify-between gap-4 border transition-all duration-300 ${
                  club.isJoined ? 'border-primary/35 bg-primary/5 shadow-md' : 'border-outline-variant/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    club.isJoined ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest/50 text-on-surface-variant'
                  }`}>
                    {club.category === 'Thể thao' && <Activity className="w-6 h-6" />}
                    {club.category === 'Học thuật' && <BookOpen className="w-6 h-6" />}
                    {club.category === 'Sở thích' && <Heart className="w-6 h-6" />}
                    {club.category === 'Nghệ thuật' && <Sliders className="w-6 h-6" />}
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="font-semibold text-sm text-on-surface truncate">{club.name}</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                      {club.memberCount} thành viên
                    </p>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant/80 line-clamp-2 min-h-[2.5rem]">
                  {club.description}
                </p>
                <button 
                  onClick={() => onJoinClub(club.id)}
                  className={`w-full font-semibold text-xs py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                    club.isJoined 
                      ? 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/35' 
                      : 'bg-primary text-on-primary hover:brightness-110'
                  }`}
                >
                  {club.isJoined ? 'Đã tham gia' : 'Tham gia'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sự kiện Sắp diễn ra */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold text-on-surface">Sự kiện Sắp tới</h4>
            <MessageSquare className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-on-surface" />
          </div>
          <div className="space-y-3">
            {events.slice(0, 3).map((event) => (
              <div 
                key={event.id}
                onClick={() => onToggleRegister(event.id)}
                className="glass-panel p-4 rounded-xl flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-colors"
                title="Nhấp để thay đổi trạng thái đăng ký"
              >
                <div className="w-12 h-12 flex flex-col items-center justify-center bg-surface-container-high rounded-xl border border-outline-variant/30 text-center shrink-0">
                  <span className="text-[10px] font-bold text-primary uppercase leading-tight">{event.month}</span>
                  <span className="text-base font-bold text-on-surface leading-tight">{event.dayOfMonth}</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h6 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate">
                    {event.title}
                  </h6>
                  <p className="text-[11px] text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-primary" /> 
                    {event.time} • {event.location}
                  </p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap ${
                  event.status === 'Đã Đăng Ký' 
                    ? 'bg-tertiary/20 text-tertiary border border-tertiary/20' 
                    : event.status === 'Chưa Đăng Ký' 
                    ? 'bg-outline-variant/40 text-on-surface-variant' 
                    : 'bg-primary/10 text-primary border border-primary/10'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
            {events.length === 0 && (
              <div className="text-center p-8 text-xs text-on-surface-variant">
                Không tìm thấy sự kiện sắp tới.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
