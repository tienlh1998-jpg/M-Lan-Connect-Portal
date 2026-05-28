/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  User, Shield, Bell, Key, Cloud, Eye, Volume2, Save, BadgeCheck, 
  HelpCircle, Edit3, Check, Trash2, Sliders, Settings 
} from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsProps {
  profile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  onShowNotification: (text: string) => void;
  activeTheme?: string;
  onChangeTheme?: (theme: 'vibrant' | 'dark' | 'green' | 'blue') => void;
}

export default function SettingsView({
  profile,
  onUpdateProfile,
  onShowNotification,
  activeTheme,
  onChangeTheme
}: SettingsProps) {
  const [name, setName] = useState(profile.name);
  const [department, setDepartment] = useState(profile.department);
  const [bio, setBio] = useState(profile.bio);
  
  // Simulated preference states
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifRank, setNotifRank] = useState(false);
  const [notifActivity, setNotifActivity] = useState(true);

  // Simulated Admin mock list for local interactivity
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, type: 'Yêu cầu mở CLB', name: 'CLB Cờ Vua Mỹ Lan', requester: 'Lê Văn C', date: 'Hôm nay' },
    { id: 2, type: 'Xét duyệt sự kiện', name: 'Triển lãm tranh nội bộ', requester: 'Trần Thị B', date: 'Hôm qua' },
  ]);

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      department,
      bio
    });
    onShowNotification('Cập nhật hồ sơ cá nhân thành công!');
  };

  const handleApprovalAction = (id: number, action: 'approve' | 'reject') => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    if (action === 'approve') {
      onShowNotification('Đã phê duyệt và thông báo gửi đến câu lạc bộ!');
    } else {
      onShowNotification('Đã từ chối phê duyệt yêu cầu.');
    }
  };

  return (
    <div id="settings-view" className="space-y-8 animate-fade-in z-20 relative">
      <div>
        <h2 className="text-3xl font-bold text-on-surface tracking-tight">Cài đặt</h2>
        <p className="text-body-md text-on-surface-variant">
          Quản lý tài khoản cá nhân, phân quyền hệ thống và tùy chọn thông báo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Space (7 cols): Profiles & Preference toggles */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main profile form */}
          <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 shadow-xl">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2 pb-3 border-b border-outline-variant/10">
              <User className="w-5 h-5 text-primary" />
              Chỉnh sửa hồ sơ cá nhân
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">Họ và tên</label>
                  <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary whitespace-nowrap"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">Phòng ban / Nhóm làm việc</label>
                  <input 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary whitespace-nowrap"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">Mã nhân viên (Worker ID)</label>
                <input 
                  value={profile.workerId}
                  className="w-full bg-surface-container-highest/20 border border-outline-variant/10 rounded-xl p-3 text-sm text-on-surface-variant cursor-not-allowed"
                  disabled
                  title="Mã nhân viên được cố định bởi phòng Nhân sự"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">Mô tả / Sở thích cá nhân</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-outline-variant/10">
                <button 
                  type="submit"
                  className="bg-primary text-on-primary hover:brightness-110 font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-primary/20"
                >
                  <Save className="w-4 h-4" />
                  Lưu thay đổi hồ sơ
                </button>
              </div>
            </form>
          </div>

          {/* Theme Customizer Panel */}
          <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 shadow-xl space-y-5">
            <div>
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 pb-3 border-b-4 border-outline">
                <Sliders className="w-5 h-5 text-primary" />
                Đổi mới giao diện hệ thống
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 mt-3 font-semibold dark:text-gray-300">
                Lựa chọn dải màu phong cách chủ đạo phù hợp nhất với tâm trạng và phong thái học tập, sinh hoạt của bạn:
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
              {/* Vibrant */}
              <button 
                type="button"
                onClick={() => {
                  if (onChangeTheme) {
                    onChangeTheme('vibrant');
                    onShowNotification('Thay đổi sang Giao diện Vibrant Neobrutalism thành công!');
                  }
                }}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                  activeTheme === 'vibrant' 
                    ? 'border-[#1A1A1A] bg-[#FFE66D]/20 shadow-[4px_4px_0px_#1A1A1A] scale-[1.02]' 
                    : 'border-transparent hover:border-[#1A1A1A] hover:bg-[#FFE66D]/5'
                }`}
              >
                <div className="flex gap-1.5 p-1 bg-white border-2 border-outline rounded-full">
                  <span className="w-4 h-4 rounded-full bg-[#FF6B6B] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#4ECDC4] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#FFE66D] border border-black"></span>
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-on-surface">Mặc định</span>
              </button>

              {/* Dark */}
              <button 
                type="button"
                onClick={() => {
                  if (onChangeTheme) {
                    onChangeTheme('dark');
                    onShowNotification('Kích hoạt Giao diện Cyber Dark bóng tối rạng ngời!');
                  }
                }}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                  activeTheme === 'dark' 
                    ? 'border-[#1A1A1A] bg-[#FFE66D]/20 shadow-[4px_4px_0px_#1A1A1A] scale-[1.02]' 
                    : 'border-transparent hover:border-[#1A1A1A] hover:bg-[#FFE66D]/5'
                }`}
              >
                <div className="flex gap-1.5 p-1 bg-[#1A1C29] border-2 border-[#1A1A1A] rounded-full">
                  <span className="w-4 h-4 rounded-full bg-[#A29BFE] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#00cec9] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#ff7675] border border-black"></span>
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-on-surface">Cyber Dark</span>
              </button>

              {/* Green */}
              <button 
                type="button"
                onClick={() => {
                  if (onChangeTheme) {
                    onChangeTheme('green');
                    onShowNotification('Gia nhập không gian Tropical Fresh Green mát rạng rỡ!');
                  }
                }}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                  activeTheme === 'green' 
                    ? 'border-[#1A1A1A] bg-[#FFE66D]/20 shadow-[4px_4px_0px_#1A1A1A] scale-[1.02]' 
                    : 'border-transparent hover:border-[#1A1A1A] hover:bg-[#FFE66D]/5'
                }`}
              >
                <div className="flex gap-1.5 p-1 bg-white border-2 border-outline rounded-full">
                  <span className="w-4 h-4 rounded-full bg-[#2ECC71] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#FFE66D] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#FF9F43] border border-black"></span>
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-on-surface">Xanh lá</span>
              </button>

              {/* Blue */}
              <button 
                type="button"
                onClick={() => {
                  if (onChangeTheme) {
                    onChangeTheme('blue');
                    onShowNotification('Thư thái cùng Giao diện Ocean Blue dạt dào!');
                  }
                }}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                  activeTheme === 'blue' 
                    ? 'border-[#1A1A1A] bg-[#FFE66D]/20 shadow-[4px_4px_0px_#1A1A1A] scale-[1.02]' 
                    : 'border-transparent hover:border-[#1A1A1A] hover:bg-[#FFE66D]/5'
                }`}
              >
                <div className="flex gap-1.5 p-1 bg-white border-2 border-outline rounded-full">
                  <span className="w-4 h-4 rounded-full bg-[#3498DB] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#FF6B6B] border border-black"></span>
                  <span className="w-4 h-4 rounded-full bg-[#A29BFE] border border-black"></span>
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-on-surface">Ocean Blue</span>
              </button>
            </div>
          </div>

          {/* Preferences Toggles */}
          <div className="glass-card rounded-3xl p-8 border border-outline-variant/15 shadow-xl">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2 pb-3 border-b border-outline-variant/10">
              <Bell className="w-5 h-5 text-primary" />
              Lựa chọn thông báo & Preference
            </h3>

            <div className="space-y-5">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-on-surface">Đăng ký hoạt động thành công</h4>
                  <p className="text-xs text-on-surface-variant">Gửi email xác nhận đăng ký sự kiện và thời khóa biểu di truyền.</p>
                </div>
                <div 
                  onClick={() => setNotifEmail(!notifEmail)}
                  className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${
                    notifEmail ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <div className={`bg-surface-dim w-4 h-4 rounded-full shadow-lg transition-transform duration-300 ${
                    notifEmail ? 'translate-x-6' : ''
                  }`}></div>
                </div>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-5">
                <div>
                  <h4 className="text-sm font-semibold text-on-surface">Tin nhắn nhắc nhở hoạt động của CLB</h4>
                  <p className="text-xs text-on-surface-variant">Notif khi CLB đã tham gia tổ chức buổi tập hay giao lưu.</p>
                </div>
                <div 
                  onClick={() => setNotifPush(!notifPush)}
                  className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${
                    notifPush ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <div className={`bg-surface-dim w-4 h-4 rounded-full shadow-lg transition-transform duration-300 ${
                    notifPush ? 'translate-x-6' : ''
                  }`}></div>
                </div>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-5">
                <div>
                  <h4 className="text-sm font-semibold text-on-surface">Điểm số và xếp hạng biến đổi</h4>
                  <p className="text-xs text-on-surface-variant">Nhận báo cáo nhanh khi thứ hạng của bạn thay đổi trên bảng tổng sắp.</p>
                </div>
                <div 
                  onClick={() => setNotifRank(!notifRank)}
                  className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${
                    notifRank ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <div className={`bg-surface-dim w-4 h-4 rounded-full shadow-lg transition-transform duration-300 ${
                    notifRank ? 'translate-x-6' : ''
                  }`}></div>
                </div>
              </div>

              {/* Toggle 4 */}
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-5">
                <div>
                  <h4 className="text-sm font-semibold text-on-surface">Sự kiện tiêu điểm hàng tuần</h4>
                  <p className="text-xs text-on-surface-variant">Nhận thông báo khi có album ảnh sự kiện nóng hổi vừa ra mắt.</p>
                </div>
                <div 
                  onClick={() => setNotifActivity(!notifActivity)}
                  className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${
                    notifActivity ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <div className={`bg-surface-dim w-4 h-4 rounded-full shadow-lg transition-transform duration-300 ${
                    notifActivity ? 'translate-x-6' : ''
                  }`}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Space (4 cols): User overview, Admin Portal actions */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Main User Card Overview */}
          <div className="glass-card rounded-3xl p-6 text-center border border-outline-variant/15 select-none relative overflow-hidden flex flex-col items-center">
            {/* Overlay banner decoration */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-primary/35 to-primary-container/20"></div>
            
            <div className="relative mt-8 mb-4">
              <img 
                referrerPolicy="no-referrer"
                src={profile.avatarUrl} 
                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary border border-surface-container shadow-2xl relative" 
                alt={profile.name} 
              />
              <span className="absolute bottom-1 right-1 bg-tertiary text-on-surface font-black p-1 rounded-full text-[10px] w-5 h-5 flex items-center justify-center border border-surface-container" title="User Role Level">
                ✓
              </span>
            </div>

            <h4 className="font-bold text-lg text-on-surface flex items-center gap-1">
              {profile.name}
              <BadgeCheck className="w-5 h-5 text-primary" />
            </h4>
            <p className="text-xs text-on-surface-variant/80 font-semibold">{profile.department}</p>
            <p className="text-[10px] text-primary bg-primary/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider mt-3 inline-block">
              {profile.role}
            </p>

            <blockquote className="text-xs text-on-surface-variant italic leading-relaxed mt-4 border-t border-outline-variant/10 pt-4 w-full">
              "{profile.bio}"
            </blockquote>
          </div>

          {/* Admin Portal Task Approvals list */}
          <div className="glass-card rounded-3xl p-6 border border-primary/20 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-on-surface flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Ban Quản Trị Portal
              {pendingApprovals.length > 0 && (
                <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingApprovals.length}
                </span>
              )}
            </h4>
            <p className="text-xs text-on-surface-variant">Duyệt nhanh đề xuất mở CLB hoặc sự kiện mới.</p>

            <div className="divide-y divide-outline-variant/10">
              {pendingApprovals.map(item => (
                <div key={item.id} className="py-4 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-primary font-bold">{item.type}</span>
                    <span className="text-on-surface-variant/70">{item.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-on-surface leading-snug">{item.name}</p>
                  <p className="text-[10px] text-on-surface-variant">Người gửi: <span className="text-on-surface font-medium">{item.requester}</span></p>
                  
                  <div className="flex gap-2 pt-1.5 justify-end">
                    <button 
                      onClick={() => handleApprovalAction(item.id, 'reject')}
                      className="px-3 py-1.5 rounded-lg border border-error/30 text-[10px] font-bold text-error bg-error/5 hover:bg-error/10 cursor-pointer"
                    >
                      Từ chối
                    </button>
                    <button 
                      onClick={() => handleApprovalAction(item.id, 'approve')}
                      className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-[10px] font-bold hover:brightness-110 cursor-pointer"
                    >
                      Phê duyệt
                    </button>
                  </div>
                </div>
              ))}

              {pendingApprovals.length === 0 && (
                <div className="text-center py-6 text-xs text-on-surface-variant italic">
                  Không còn yêu cầu chờ phê duyệt nào!
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
