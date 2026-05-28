/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Users, Calendar, Award, Image as ImageIcon, Settings as SettingsIcon,
  Search, Bell, MessageSquare, Menu, X, Plus, Clock, MapPin, Sparkles, AlertCircle, Heart 
} from 'lucide-react';

import { Club, CalendarEvent, RecapAlbum, UserProfile, TabId } from './types';
import Dashboard from './components/Dashboard';
import ClubManagement from './components/ClubManagement';
import CalendarSection from './components/CalendarSection';
import Leaderboard from './components/Leaderboard';
import RecapGallery from './components/RecapGallery';
import SettingsView from './components/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('tong-quan');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<'vibrant' | 'dark' | 'green' | 'blue'>(() => {
    return (localStorage.getItem('mylan-theme') as any) || 'vibrant';
  });

  // Sync theme with localStorage and body custom property
  useEffect(() => {
    localStorage.setItem('mylan-theme', activeTheme);
  }, [activeTheme]);

  // Modals visibility states
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showCreateClubModal, setShowCreateClubModal] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // App Notification Log list for interactive UI
  const [appNotifications, setAppNotifications] = useState([
    { id: 1, text: 'Ban Quản Trị đã duyệt CLB Sách của bạn!', time: '10 phút trước', read: false },
    { id: 2, text: 'Giải chạy marathon tuần này bắt đầu lúc 7AM.', time: '2 giờ trước', read: false },
    { id: 3, text: 'Cập nhật bảng xếp hạng thi đua tháng 10.', time: '1 ngày trước', read: true }
  ]);

  // Global State (Dynamic and Interactive Local Storage fallback or state variables)
  const [clubs, setClubs] = useState<Club[]>([
    { id: 'clb-1', name: 'Mỹ Lan Football Club', category: 'Thể thao', memberCount: 142, status: 'Active', description: 'Đội tuyển hạt nhân gắn kết tinh thần thi đấu nhiệt huyết, rèn luyện thể chất và chiến thuật bóng nảy lửa.', icon: 'sport_soccer', isJoined: true },
    { id: 'clb-2', name: 'CLB Cầu lông Mỹ Lan', category: 'Thể thao', memberCount: 98, status: 'Active', description: 'Nơi giao lưu kỹ thuật, tổ chức các buổi tập, nâng cao sức khỏe dẻo dai mỗi tuần tại nhà thi đấu.', icon: 'sports_tennis', isJoined: false },
    { id: 'clb-3', name: 'Nghiên cứu & Sáng tạo AI', category: 'Học thuật', memberCount: 126, status: 'Active', description: 'Thảo luận, chia sẻ các công nghệ AI tiên tiến, học thiết kế prompt và phát triển giải pháp thực tiễn.', icon: 'rocket_launch', isJoined: true },
    { id: 'clb-4', name: 'CLB Sách & Trà Đạo', category: 'Sở thích', memberCount: 64, status: 'Active', description: 'Không gian yên bình để các mộc thư đọc sách bách khoa, đàm thoại và thưởng thức trà thơm thanh lọc.', icon: 'menu_book', isJoined: false },
    { id: 'clb-5', name: 'Mỹ Lan Art & Guitar', category: 'Nghệ thuật', memberCount: 85, status: 'Active', description: 'Nơi kết nối các tài năng sáng tác và mỹ thuật hội họa, hâm nóng các sân khấu âm nhạc lễ hội nội bộ.', icon: 'music_note', isJoined: false },
    { id: 'clb-6', name: 'CLB Yoga & Thiền Định', category: 'Sở thích', memberCount: 52, status: 'Active', description: 'Tìm về sự thư thái nội tâm và cải thiện cơ thể linh hoạt dẻo dai bằng những asana cân bằng.', icon: 'self_improvement', isJoined: false }
  ]);

  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 'ev-1', title: 'Chung kết Cup Mỹ Lan 2024', category: 'Thể thao', date: '12 Tháng 10, 2024', time: '15:30 - 18:00', location: 'Sân cỏ Mỹ Lan Town', status: 'Chưa Đăng Ký', month: 'Th10', dayOfMonth: 12, description: 'Trận bóng hấp dẫn nhất nằm trong khuôn khổ ngày hội thể thao Mỹ Lan.' },
    { id: 'ev-2', title: 'Workshop AI ứng dụng Office', category: 'Workshop', date: '15 Tháng 10, 2024', time: '09:00 - 11:30', location: 'Phòng Hội nghị R&D', status: 'Đã Đăng Ký', month: 'Th10', dayOfMonth: 15, description: 'Chia sẻ kỹ thuật tự động hóa báo cáo và biên tập văn bản cùng chuyên gia.' },
    { id: 'ev-3', title: 'Teambuilding Vững Vươn Xa', category: 'Teambuilding', date: '18 Tháng 10, 2024', time: '08:00 - 17:00', location: 'Resort Biển Ba Động', status: 'Chưa Đăng Ký', month: 'Th10', dayOfMonth: 18, description: 'Hành trình vượt rào cản, bứt phá giới hạn và gắn kết tinh thần đoàn kết đồng đội.' },
    { id: 'ev-4', title: 'Giải bida đôi Mỹ Lan mở rộng', category: 'Thể thao', date: '25 Tháng 10, 2024', time: '16:00 - 20:00', location: 'Khu vui chơi lầu 3', status: 'Sắp mở', month: 'Th10', dayOfMonth: 25, description: 'Giải đấu giao lưu thư giãn kịch tính dành cho toàn thể CNB NV.' }
  ]);

  const [recapAlbums, setRecapAlbums] = useState<RecapAlbum[]>([
    { id: 'rc-1', title: 'Giải chạy marathon Mỹ Lan hè 2024', category: 'Thể thao', date: '12 Tháng 9, 2024', photosCount: 84, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwYi7_-IVgKzmJFOFIuQ0K4jqerLyQ07yRGMs0UIMqF2LuffR691OBTRKVYWtOTfKqKBsm9sA9TQ2dyknbTIftFoqVFul5I8RiIdT2Ofcw_cfX6g-hzVemfKED0j_8WneXbmHbcS0M9zI_1Yfu1GMhV3sIftdwUkJOLWDyXmsO_GdxZnoOVOBws6n1GF2ZR_3iGXKMUaetebIU6HhSpgQ8_th_1q6JT1TzdAHz9i__5HU0JVNvB77FrenkMmcwgf9aLolskhtjiEc8', views: 420, isFeatured: true },
    { id: 'rc-2', title: 'Workshop AI Creative Summit', category: 'Workshop', date: '25 Tháng 9, 2024', photosCount: 126, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkjgKheoixsaRWRQYj7_DUvY9zayohJtXNcW5ulxDi3B_itIbh5J_Og8zjXGTfXHDq75xd9_1ArlpNjOrko5OpUR7QxcZnMPTPiMrOeb9HALa5Eks5v1rfAB4Fncl22uhglu4xE8Jg-kxvO3HIewl6w1E5_O4RUDg-0zaW6QHDINDUE6rd1S8UKXxom0FYc7VQ5kLeqTMH-dfG2poO7tbgEPDVReFk2D7WjzNAXfqAUGZklMYT7YPZ_FFpCDs5pDe6oI_7-oDmB49v', views: 245 },
    { id: 'rc-3', title: 'PES tournament Mỹ Lan 2024', category: 'Giải trí', date: '30 Tháng 9, 2024', photosCount: 42, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpRPo7eIwAVTWlVdiuTwGUtXMod9dzuYerNpd_xSJz3JiEIqc3CKyGkHnO8mMKCX5tVXpsDQ38ksdkMMqJue4ZYguiJXD1NKTN_282D_vOzZ6bvBQoPSdZltAYiZT8XvJlOiFH6OeuIm0K1pxlU-nNth1RsGvxoq9mhoaOtIkkwnSSGT8BUHHLctw6v0kKwNk4LhKg9qWo627lFc05yIXJg2l1o5fPpDJZnFQZFnL2x63bf7NFAZ2X10CElYTJq2Q5v2Xxueb8XZcu', views: 185 },
    { id: 'rc-4', title: 'Gala Dinner: Vững Bước Vươn Xa', category: 'Teambuilding', date: '02 Tháng 10, 2024', photosCount: 215, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcvk1nEKwXu09PZ7IhtXh-bUq8MfKg4x6hdy3GjmxYbtXg-F4LbSTANl-7jS3gkXU70ek2POJVWZUBbXPcjJCgETYVDLgmfdpJHSi9HQRBv9V8hFojZcVqdIe2lNTGK6-AVymFrE8n8KixNFX-QF8IC62f0HRrcKr5a90-Mz_u1ypL1R3DdnH2Tj06N3KyBmaB_vA_06bXcBKb7a3W5FD9x4vkppLZLzNZyOyfn9K_nO9KF7oIqLaYoMgZyPGH0r3NIPFRUNteffIx', views: 512 }
  ]);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Nguyễn Văn A',
    role: 'Quản trị viên',
    workerId: 'ML-0142',
    department: 'R&D Laboratory 1',
    bio: 'Nỗ lực không ngừng nghỉ, hướng tới sứ mệnh xây dựng môi trường văn hóa Mỹ Lan đổi mới và kiên kết!',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG19COR-WbN0qsFKUEyb1NHazfLUkomXBpbnHsHP428C97bLCUTGbg9JHJEQAAsfjNPPTVvtR2Asdli_XU7nB6gSifRXkbUka5S64fypSRS_e0YotxPLdY6I9tsJsGT3EEsNskP_FDfXF6KLZsDJp7vWVCDqvu8YbecAKjsWlz41Y5WxRfHMpeGIJ7oQJbzTlvCHWgxGmxohmAhOrhMkGEFxZqkEgd-HYqMeqK7bTwdx8TFm5FwsyAwBgNWAvm7hWoc4eLdc2nA92m',
    team: 'AI Group',
    status: 'Đang hoạt động'
  });

  // Automatic dim of customized premium notification toast
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle actions
  const showNotificationToast = (text: string) => {
    setNotification(text);
  };

  const handleJoinClub = (clubId: string) => {
    setClubs(prev => prev.map(club => {
      if (club.id === clubId) {
        const nextJoined = !club.isJoined;
        if (nextJoined) {
          showNotificationToast(`Chào mừng bạn gia nhập thành công "${club.name}"!`);
          
          // Add notification item
          setAppNotifications(prevLogs => [
            { id: Date.now(), text: `Bạn vừa gia nhập câu lạc bộ "${club.name}"!`, time: 'Vừa xong', read: false },
            ...prevLogs
          ]);
        } else {
          showNotificationToast(`Bạn đã rời khỏi câu lạc bộ "${club.name}".`);
        }
        return {
          ...club,
          isJoined: nextJoined,
          memberCount: nextJoined ? club.memberCount + 1 : club.memberCount - 1
        };
      }
      return club;
    }));
  };

  const handleToggleRegister = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        if (ev.status === 'Hết chỗ') return ev;
        const registers = ev.status === 'Đã Đăng Ký';
        const nextStatus = registers ? 'Chưa Đăng Ký' : 'Đã Đăng Ký';
        
        showNotificationToast(
          registers 
            ? `Hủy ứng cử tham gia sự kiện "${ev.title}"` 
            : `Đăng ký tham gia thành công sự kiện "${ev.title}"!`
        );

        if (!registers) {
          setAppNotifications(prevLogs => [
            { id: Date.now(), text: `Đăng ký thành công: ${ev.title}`, time: 'Vừa xong', read: false },
            ...prevLogs
          ]);
        }

        return {
          ...ev,
          status: nextStatus as any
        };
      }
      return ev;
    }));
  };

  // Form submission modal for adding continuous event
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'Thể thao' | 'Workshop' | 'Teambuilding'>('Thể thao');
  const [newEventDay, setNewEventDay] = useState(20);
  const [newEventTime, setNewEventTime] = useState('14:00 - 15:30');
  const [newEventLocation, setNewEventLocation] = useState('Phòng Họp 2');

  const handleCreateNewEventSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const added: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: newEventTitle,
      category: newEventCategory,
      date: `${newEventDay} Tháng 10, 2024`,
      time: newEventTime,
      location: newEventLocation,
      status: 'Chưa Đăng Ký',
      month: 'Th10',
      dayOfMonth: newEventDay
    };

    setEvents(prev => [...prev, added]);
    showNotificationToast(`Đã lên lịch sự kiện "${newEventTitle}" thành công!`);
    setAppNotifications(prevLogs => [
      { id: Date.now(), text: `Sự kiện mới được lên lịch: ${newEventTitle}`, time: 'Vừa xong', read: false },
      ...prevLogs
    ]);
    
    // Reset form & state
    setNewEventTitle('');
    setShowCreateEventModal(false);
    setActiveTab('lich-hoat-dong'); // direct navigation to visual showcase
  };

  // Create club model submit
  const [newClubName, setNewClubName] = useState('');
  const [newClubCategory, setNewClubCategory] = useState<'Thể thao' | 'Học thuật' | 'Sở thích' | 'Nghệ thuật'>('Thể thao');
  const [newClubDesc, setNewClubDesc] = useState('');

  const handleCreateNewClubSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newClubName.trim()) return;

    const addedClub: Club = {
      id: `clb-${Date.now()}`,
      name: newClubName,
      category: newClubCategory,
      memberCount: 1,
      status: 'Draft',
      description: newClubDesc || 'Mô tả tóm lược câu lạc bộ vừa đợt đề cử thành lập.',
      icon: 'stars',
      isJoined: true
    };

    setClubs(prev => [...prev, addedClub]);
    showNotificationToast(`Yêu cầu thành lập Câu lạc bộ "${newClubName}" đã được gửi lên Ban Quản Trị.`);
    setAppNotifications(prevLogs => [
      { id: Date.now(), text: `Đã gửi đề xuất thành lập CLB "${newClubName}"`, time: 'Vừa xong', read: false },
      ...prevLogs
    ]);

    // Cleanup & navigate
    setNewClubName('');
    setNewClubDesc('');
    setShowCreateClubModal(false);
    setActiveTab('quan-ly-clb');
  };

  const handleMarkAllNotificationsRead = () => {
    setAppNotifications(prevLogs => prevLogs.map(l => ({ ...l, read: true })));
    showNotificationToast('Đã đánh dấu tất cả thông báo là đã đọc.');
  };

  return (
    <div className={`min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col md:flex-row relative overflow-hidden theme-${activeTheme}`} id="applet-portal-layout">
      
      {/* Neo-brutalist Background Decors */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFE66D] border-4 border-[#1A1A1A] rounded-full opacity-25 z-0"></div>
      <div className="absolute bottom-20 -left-10 w-32 h-32 bg-[#4ECDC4] border-4 border-[#1A1A1A] rounded-xl rotate-12 opacity-25 z-0"></div>

      {/* Floating Action Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            id="global-toast-message"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] bg-[#FFE66D] border-3 border-[#1A1A1A] rounded-2xl p-4 shadow-[6px_6px_0px_#1A1A1A] flex items-center gap-3 max-w-md w-[90%] md:w-auto text-sm text-[#1A1A1A]"
          >
            <Sparkles className="w-5 h-5 text-primary shrink-0 animate-bounce" />
            <span className="font-extrabold text-[#1A1A1A] flex-1">{notification}</span>
            <button onClick={() => setNotification(null)} className="text-[#1A1A1A]/70 hover:text-black p-1 ml-2 cursor-pointer border-2 border-transparent hover:border-[#1A1A1A] rounded-md transition-all">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE HEADER BUTTONS */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b-4 border-[#1A1A1A] z-40 w-full shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-primary font-black text-xl tracking-tight uppercase">Mỹ Lan</span>
          <span className="text-[10px] font-bold bg-[#4ECDC4] text-black px-2.5 py-1 rounded-full border-2 border-[#1A1A1A] uppercase animate-pulse">Connect</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Notification quick toggle */}
          <button 
            onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
            className="p-2 text-on-surface-variant hover:text-white relative bg-surface-container rounded-lg"
          >
            <Bell className="w-5 h-5" />
            {appNotifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface-dim"></span>
            )}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant bg-surface-container rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* LEFT SIDEBAR NAVIGATION (Desktop) */}
      <aside 
        className={`fixed md:relative inset-y-0 left-0 w-64 bg-white border-r-4 border-[#1A1A1A] flex flex-col justify-between py-6 px-4 z-[45] transform transition-transform duration-300 md:transform-none select-none ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        id="desktop-sidebar-nav"
      >
        <div className="space-y-6">
          {/* Brand/App Title Section */}
          <div className="px-3 flex items-center justify-between border-b-4 border-[#1A1A1A] pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#FF6B6B] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                <Sparkles className="w-5 h-5 text-white text-shadow animate-pulse" />
              </div>
              <div>
                <h1 className="text-md font-black text-[#1A1A1A] leading-tight uppercase tracking-tight">Mỹ Lan</h1>
                <p className="text-[10px] text-[#1A1A1A]/70 font-bold uppercase tracking-[0.05em] leading-none mt-1">Connect Portal</p>
              </div>
            </div>
            
            {/* Close Mobile sidebar btn */}
            <button className="md:hidden text-[#1A1A1A] hover:bg-[#FF6B6B]/20 p-1 border-2 border-transparent hover:border-[#1A1A1A] rounded-md" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tab Menu list */}
          <nav className="space-y-2 pt-4">
            {[
              { id: 'tong-quan', label: 'Tổng quan', icon: LayoutDashboard },
              { id: 'quan-ly-clb', label: 'Quản lý CLB', icon: Users },
              { id: 'lich-hoat-dong', label: 'Lịch & Hoạt động', icon: Calendar },
              { id: 'bang-xep-hang', label: 'Bảng xếp hạng', icon: Award },
              { id: 'thu-vien-recap', label: 'Thư viện Recap', icon: ImageIcon },
              { id: 'cai-dat', label: 'Cài đặt Portal', icon: SettingsIcon },
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabId);
                    setMobileMenuOpen(false); // Close sidebar on tap on mobile
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer relative group ${
                    isActive 
                      ? 'bg-[#FFE66D] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]' 
                      : 'text-[#1A1A1A]/85 hover:text-[#1a1a1a] border border-transparent hover:border-[#1A1A1A] hover:bg-[#4ECDC4]/20 hover:shadow-[2px_2px_0px_#1A1A1A]'
                  }`}
                >
                  <IconComp className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/80'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FF6B6B] border border-[#1A1A1A] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Mini Avatar block in sidebar and active indicators */}
        <div 
          onClick={() => setActiveTab('cai-dat')}
          className="border-t-4 border-[#1A1A1A] pt-4 flex items-center gap-3 px-2 cursor-pointer group"
        >
          <img 
            referrerPolicy="no-referrer"
            src={profile.avatarUrl} 
            className="w-11 h-11 rounded-full object-cover border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] group-hover:bg-[#FFE66D] group-hover:translate-y-[-2px] transition-all shrink-0" 
            alt={profile.name} 
          />
          <div className="overflow-hidden">
            <h5 className="font-black text-xs text-[#1A1A1A] leading-tight capitalize group-hover:text-[#FF6B6B] transition-colors truncate">{profile.name}</h5>
            <p className="text-[9px] text-[#1A1A1A]/70 font-bold truncate uppercase mt-0.5">{profile.department}</p>
          </div>
        </div>
      </aside>

      {/* CORE FRAME CONTAINER: Center Content & Top Header Bar */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen relative z-30" id="main-content-flow">
        
        {/* TOP STATUS NAVIGATION BAR (Desktop Only) */}
        <header className="hidden md:flex items-center justify-between py-5 px-8 bg-white border-b-4 border-[#1A1A1A] sticky top-0 z-40 select-none">
          {/* Breadcrumb pathing */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-black text-[#1A1A1A]/50 tracking-wider">Mỹ Lan PORTAL</span>
            <span className="text-[#1A1A1A]/30 block font-bold">/</span>
            <span id="breadcrumb-active-label" className="text-xs font-black uppercase text-[#FF6B6B] bg-[#FFE66D] px-3 py-1.5 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] tracking-widest leading-none">
              {activeTab === 'tong-quan' && 'Tổng Quan'}
              {activeTab === 'quan-ly-clb' && 'Quản lý Câu lạc bộ'}
              {activeTab === 'lich-hoat-dong' && 'Lịch & Hoạt Động'}
              {activeTab === 'bang-xep-hang' && 'Bảng Xếp Hạng Thi Đua'}
              {activeTab === 'thu-vien-recap' && 'Thư viện ảnh Recap'}
              {activeTab === 'cai-dat' && 'Cài Đặt Portal'}
            </span>
          </div>

          {/* Interactive Tools Panel */}
          <div className="flex items-center gap-4 relative">
            
            {/* Quick search input */}
            <div className="relative w-64">
              <input 
                className="bg-white border-2 border-[#1A1A1A] focus:bg-[#FFFDF4] text-xs text-[#1A1A1A] py-2 pl-9 pr-4 rounded-xl focus:outline-none w-full placeholder:text-[#1A1A1A]/40 shadow-[2px_2px_0px_#1A1A1A] font-semibold" 
                placeholder="Tìm hoạt động, clb..." 
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]" />
            </div>

            {/* Notification triggers bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="p-2 bg-white hover:bg-[#FFE66D] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer relative shrink-0"
                title="Thông báo hệ thống"
              >
                <Bell className="w-5 h-5" />
                {appNotifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF6B6B] border border-[#1A1A1A] rounded-full animate-ping"></span>
                )}
              </button>

              {/* Popup Notification Dialog */}
              <AnimatePresence>
                {showNotificationsDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotificationsDropdown(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] p-4 z-50 text-xs overflow-hidden"
                    >
                      <div className="flex justify-between items-center border-b-2 border-[#1A1A1A] pb-3 mb-3">
                        <span className="font-extrabold uppercase text-[#1A1A1A]">Thông báo mới</span>
                        <button 
                          onClick={handleMarkAllNotificationsRead} 
                          className="text-[10px] font-bold text-[#FF6B6B] hover:underline"
                        >
                          Đánh dấu đã đọc
                        </button>
                      </div>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {appNotifications.map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => {
                              setAppNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
                            }}
                            className={`p-2.5 rounded-xl group hover:bg-[#FDFCF0] transition-all cursor-pointer border-2 ${
                              item.read ? 'border-transparent opacity-60' : 'border-[#1A1A1A] bg-[#FFE66D]/20 shadow-[2px_2px_0px_#1A1A1A]'
                            }`}
                          >
                            <p className="font-bold text-[#1A1A1A] leading-snug">{item.text}</p>
                            <span className="text-[10px] text-[#1A1A1A]/60 font-semibold mt-1.5 block">{item.time}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t-2 border-[#1A1A1A] text-center mt-3">
                        <span className="text-[#1A1A1A]/60 font-black uppercase text-[9px]">Sổ tay sinh hoạt Mỹ Lan</span>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Direct communication logs messages */}
            <button 
              onClick={() => showNotificationToast('Hệ thống diễn đàn chat đang trong giai đoạn kích hoạt...')}
              className="p-2 p-2 bg-white hover:bg-[#4ECDC4] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              title="Nhóm chat Mỹ Lan"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* FLOATING ACTION NOTIFICATION DRAWER FOR MOBILE */}
        <AnimatePresence>
          {showNotificationsDropdown && mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="md:hidden bg-surface-container-high border-t border-outline-variant/20 fixed bottom-0 inset-x-0 p-6 rounded-t-3xl z-50 space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
                <span className="font-bold text-sm text-on-surface">Thông báo di dộng</span>
                <button onClick={() => setShowNotificationsDropdown(false)} className="p-1 hover:bg-white/10 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto py-1">
                {appNotifications.map(item => (
                  <div key={item.id} className="p-3 bg-surface-container rounded-xl">
                    <p className="text-xs font-semibold text-on-surface leading-tight">{item.text}</p>
                    <span className="text-[10px] text-on-surface-variant/70 mt-1 block">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRIMARY WINDOW CHASSIS CONTAINER */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 md:py-10" id="portal-tab-panels">
          {activeTab === 'tong-quan' && (
            <Dashboard 
              clubs={clubs} 
              events={events} 
              profile={profile}
              onJoinClub={handleJoinClub}
              onToggleRegister={handleToggleRegister}
              onOpenCreateEventModal={() => setShowCreateEventModal(true)}
            />
          )}

          {activeTab === 'quan-ly-clb' && (
            <ClubManagement 
              clubs={clubs} 
              onJoinClub={handleJoinClub}
              onOpenCreateClubModal={() => setShowCreateClubModal(true)}
            />
          )}

          {activeTab === 'lich-hoat-dong' && (
            <CalendarSection 
              events={events} 
              onToggleRegister={handleToggleRegister}
              onOpenCreateEventModal={() => setShowCreateEventModal(true)}
            />
          )}

          {activeTab === 'bang-xep-hang' && (
            <Leaderboard 
              onShowNotification={showNotificationToast}
              profile={profile}
            />
          )}

          {activeTab === 'thu-vien-recap' && (
            <RecapGallery 
              recapAlbums={recapAlbums}
              onAddNewAlbum={(newAlbum) => setRecapAlbums(prev => [newAlbum, ...prev])}
              onShowNotification={showNotificationToast}
            />
          )}

          {activeTab === 'cai-dat' && (
            <SettingsView 
              profile={profile}
              onUpdateProfile={(updated) => setProfile(updated)}
              onShowNotification={showNotificationToast}
              activeTheme={activeTheme}
              onChangeTheme={setActiveTheme}
            />
          )}
        </div>
      </main>

      {/* CREATE EVENT FULL FORM DIALOG MODAL */}
      <AnimatePresence>
        {showCreateEventModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel max-w-lg w-full rounded-3xl p-8 space-y-6 relative border border-primary/20"
            >
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                <h3 className="text-xl font-bold text-on-surface flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-primary" />
                  Lên kế hoạch sự kiện / Hoạt động mới
                </h3>
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewEventSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Tên sự kiện / Hoạt động</label>
                  <input 
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Ví dụ: Hội thảo công nghệ AI"
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Phân loại</label>
                    <select
                      value={newEventCategory}
                      onChange={(e: any) => setNewEventCategory(e.target.value)}
                      className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="Thể thao">Thể thao</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Teambuilding">Teambuilding</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Ngày (Trong Tháng 10/24)</label>
                    <input 
                      type="number"
                      value={newEventDay}
                      onChange={(e) => setNewEventDay(Number(e.target.value))}
                      className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                      min={1}
                      max={31}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Thời gian diễn ra</label>
                    <input 
                      value={newEventTime}
                      onChange={(e) => setNewEventTime(e.target.value)}
                      placeholder="Ví dụ: 14:00 - 15:30"
                      className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Địa điểm</label>
                    <input 
                      value={newEventLocation}
                      onChange={(e) => setNewEventLocation(e.target.value)}
                      placeholder="Ví dụ: Phòng họp lầu 3"
                      className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 p-3 bg-primary/10 rounded-xl text-xs text-primary border border-primary/15 mt-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Sự kiện sau khi được tạo sẽ hiển thị ngay cả ở trang Tổng quan lẫn trang Lịch hoạt động để các thành viên đăng ký.</span>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/10">
                  <button 
                    type="button"
                    onClick={() => setShowCreateEventModal(false)}
                    className="px-5 py-2.5 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-variant/30 text-on-surface cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/25"
                  >
                    Lên lịch ngay
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE CLUB FULL REQUEST DIALOG MODAL */}
      <AnimatePresence>
        {showCreateClubModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel max-w-lg w-full rounded-2xl p-8 space-y-6 relative border border-primary/20"
            >
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                <h3 className="text-xl font-bold text-on-surface flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-primary" />
                  Đề xuất Thành lập Câu lạc bộ Mới
                </h3>
                <button 
                  onClick={() => setShowCreateClubModal(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewClubSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Tên Câu lạc bộ đề xuất</label>
                  <input 
                    value={newClubName}
                    onChange={(e) => setNewClubName(e.target.value)}
                    placeholder="Ví dụ: CLB Tennis Mỹ Lan"
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Chuyên mục / Lĩnh vực</label>
                  <select
                    value={newClubCategory}
                    onChange={(e: any) => setNewClubCategory(e.target.value)}
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="Thể thao">Thể thao</option>
                    <option value="Học thuật">Học thuật</option>
                    <option value="Sở thích">Sở thích</option>
                    <option value="Nghệ thuật">Nghệ thuật</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Mô tả định hướng hoạt động</label>
                  <textarea 
                    value={newClubDesc}
                    onChange={(e) => setNewClubDesc(e.target.value)}
                    placeholder="Nêu bật kế hoạch sinh hoạt lý tưởng, mục tiêu và dự kiến lịch trình..."
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-2 p-3 bg-primary/10 rounded-xl text-xs text-primary border border-primary/15 mt-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Yêu cầu sau khi gửi đi sẽ được đưa vào danh sách chờ Ban Quản Trị phê duyệt (Bạn có thể xem và duyệt ngay trong mục quản lý của ô Cài Đặt!).</span>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/10">
                  <button 
                    type="button"
                    onClick={() => setShowCreateClubModal(false)}
                    className="px-5 py-2.5 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-variant/30 text-on-surface cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/25"
                  >
                    Gửi đề xuất
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

