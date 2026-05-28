/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Users, Search, Plus, Sliders, ArrowUpDown, ChevronDown, CheckCircle, 
  Settings, Award, Smile, BookOpen, Activity, Heart, Camera, Code, Sparkles, Check
} from 'lucide-react';
import { Club } from '../types';

interface ClubManagementProps {
  clubs: Club[];
  onJoinClub: (clubId: string) => void;
  onOpenCreateClubModal: () => void;
}

export default function ClubManagement({
  clubs,
  onJoinClub,
  onOpenCreateClubModal
}: ClubManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [sortOrder, setSortOrder] = useState<'member-desc' | 'member-asc' | 'name-asc'>('member-desc');

  // Categories list
  const categories = ['Tất cả', 'Thể thao', 'Học thuật', 'Sở thích', 'Nghệ thuật'];

  // Handle Filtering & Sorting
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedClubs = [...filteredClubs].sort((a, b) => {
    if (sortOrder === 'member-desc') {
      return b.memberCount - a.memberCount;
    } else if (sortOrder === 'member-asc') {
      return a.memberCount - b.memberCount;
    } else {
      return a.name.localeCompare(b.name, 'vi');
    }
  });

  return (
    <div id="club-management-view" className="space-y-8 animate-fade-in animate-duration-200">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Quản lý CLB</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Khám phá và quản lý các cộng đồng nội bộ sôi nổi tại Mỹ Lan.
          </p>
        </div>
        <button 
          onClick={onOpenCreateClubModal}
          className="bg-primary hover:bg-primary/90 text-on-primary font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tạo CLB mới
        </button>
      </section>

      {/* Filters Section */}
      <section className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-highest/40 border border-outline-variant/20 rounded-xl py-2.5 pl-10 pr-4 text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/40" 
            placeholder="Tìm tên câu lạc bộ, mô tả..." 
            type="text"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          {/* Category Filter */}
          <div className="relative group w-full sm:w-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-on-surface-variant/60">
              Phân loại:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-surface-container-highest/60 border border-outline-variant/20 rounded-xl py-2.5 pl-20 pr-8 text-xs font-semibold text-on-surface appearance-none focus:outline-none focus:ring-1 focus:ring-white/10 w-full sm:w-44 cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-surface-container-high block p-2">{cat}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>

          {/* Sort Filter */}
          <div className="relative w-full sm:w-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-on-surface-variant/60">
              Sắp xếp:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-surface-container-highest/60 border border-outline-variant/20 rounded-xl py-2.5 pl-20 pr-8 text-xs font-semibold text-on-surface appearance-none focus:outline-none focus:ring-1 focus:ring-white/10 w-full sm:w-48 cursor-pointer"
            >
              <option value="member-desc" className="bg-surface-container-high block p-2">Nhiều thành viên nhất</option>
              <option value="member-asc" className="bg-surface-container-high block p-2">Ít thành viên nhất</option>
              <option value="name-asc" className="bg-surface-container-high block p-2">Tên CLB (A-Z)</option>
            </select>
            <ArrowUpDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Grid Layout: Club Cards */}
      {sortedClubs.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedClubs.map((club) => (
            <div 
              key={club.id} 
              className={`glass-panel rounded-2xl p-6 transition-all duration-300 flex flex-col group hover:-translate-y-2 border ${
                club.isJoined 
                  ? 'border-primary/30 bg-primary/[0.02]' 
                  : club.status === 'Draft' 
                  ? 'border-dashed border-outline-variant/40 bg-surface-container-lowest/20' 
                  : 'border-outline-variant/10 hover:border-primary/20'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors ${
                  club.isJoined 
                    ? 'bg-primary/20 border-primary/40 text-primary' 
                    : 'bg-surface-container-high/50 border-outline-variant/20 text-on-surface-variant group-hover:border-primary/20'
                }`}>
                  {club.category === 'Thể thao' && <Activity className="w-8 h-8" />}
                  {club.category === 'Học thuật' && <BookOpen className="w-8 h-8" />}
                  {club.category === 'Sở thích' && <Heart className="w-8 h-8" />}
                  {club.category === 'Nghệ thuật' && <Camera className="w-8 h-8" />}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                  club.category === 'Thể thao' 
                    ? 'bg-tertiary/10 text-tertiary border-tertiary/20' 
                    : club.category === 'Học thuật' 
                    ? 'bg-primary/10 text-primary border-primary/25' 
                    : 'bg-secondary/10 text-secondary border-secondary/20'
                }`}>
                  {club.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-on-surface mb-2">{club.name}</h3>
              <p className="text-xs text-on-surface-variant/80 mb-6 line-clamp-3 min-h-[3rem]">
                {club.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-outline-variant/10 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-xs text-on-surface-variant">{club.memberCount} thành viên</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${club.status === 'Active' ? 'bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.6)]' : 'bg-error/60'}`}></span>
                    <span className="text-xs text-on-surface-variant">{club.status}</span>
                  </div>
                </div>
              </div>

              {club.status === 'Draft' ? (
                <button className="mt-6 w-full py-2.5 rounded-xl bg-surface-container-highest/50 text-on-surface-variant/50 cursor-not-allowed font-semibold text-xs border border-outline-variant/10" disabled>
                  Chờ phê duyệt
                </button>
              ) : (
                <button 
                  onClick={() => onJoinClub(club.id)}
                  className={`mt-6 w-full py-2.5 rounded-xl font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                    club.isJoined 
                      ? 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/25' 
                      : 'bg-primary text-on-primary hover:brightness-110'
                  }`}
                >
                  {club.isJoined ? 'Đã tham gia' : 'Tham gia ngay'}
                </button>
              )}
            </div>
          ))}
        </section>
      ) : (
        <div className="glass-panel text-center py-16 rounded-2xl">
          <p className="text-on-surface-variant text-sm">Không tìm thấy câu lạc bộ phù hợp với từ khóa.</p>
        </div>
      )}

      {/* Featured Bento-like Spotlight Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 overflow-hidden relative group border border-primary/10">
          <div className="relative z-10 max-w-md flex flex-col justify-between h-full space-y-4">
            <div>
              <span className="bg-primary text-on-primary-container border border-primary/25 text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block tracking-wider">
                Sự kiện tiêu điểm
              </span>
              <h2 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">
                Giải Cầu lông Mỹ Lan Open 2024 sắp khởi tranh!
              </h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Đăng ký tham gia ngay để nhận áo thun độc quyền và cơ hội giành giải thưởng lớn nhất năm từ CLB Cầu lông.
              </p>
            </div>
            <button className="bg-white text-surface-dim hover:bg-primary-container hover:text-white font-bold text-xs px-6 py-3 rounded-xl transition-all self-start cursor-pointer">
              Chi tiết & Đăng ký
            </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/3 overflow-hidden opacity-10 lg:opacity-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none">
            <img 
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover" 
              alt="Cầu lông" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiJFu-iYbD0JjYIL4b393B5KKRn70mVqPHzCciyiy4oXSDBZo8b2WcmuyvhNp8K2mBn0jGjZSFPjrh8DtS6c9U-_iDOtNLL5nk38HxstnOU5t5w88O91H7yZiJ3OuhnPnSjY8X7OEp-Pd-fmGyppKuXfNYFLdamQj590R_yTOrDJ2bw0oQqxHGz0Bad9gmQnSByK1kWdnBizHmdyUicL4VuKIQQNF3ObzhBysPdb5aKuAADpWZQ90Zn88ejle5LW1FPVBXQm019WcC"
            />
          </div>
          {/* Gradient overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dim via-surface-dim/80 to-transparent pointer-events-none"></div>
        </div>

        {/* Most active member card */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-center items-center text-center border border-outline-variant/10">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Thành viên năng nổ nhất</h3>
          <p className="text-xs text-on-surface-variant max-w-xs mb-6">
            Anh <span className="font-semibold text-primary">Trần Minh Tuấn</span> vừa đóng góp 5 bài viết chuyên sâu cho CLB Lập trình.
          </p>
          <div className="flex -space-x-2.5">
            <img 
              referrerPolicy="no-referrer"
              alt="Member 1" 
              className="w-8 h-8 rounded-full border-2 border-surface-container" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR8vruBa0zpScimKl1yKCkljXdNG9c_amqym86WcmBHKuKt0FsC9942VcJFfuGaletxrL13jF4msR8cwm4jB_Qyv2ES49mTvdcU6ujOuAYCPKANom5fEGRkW-OWYlh2ZlYYTqBdvu8rqCe5CVQU15FvfuNtwY77EdCqjwIiUCxw9miYQpxTRohq7o4m6vQeHF_OboieFoDa_wLo-KeLf3UJiU1mXzjRsjyEbFFTz0fNkin-kgyn-wFM-ijM6rvKaw4sJFOZtJe46Q7" 
            />
            <img 
              referrerPolicy="no-referrer"
              alt="Member 2" 
              className="w-8 h-8 rounded-full border-2 border-surface-container" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6EalremKDNgAiEwm5p0U_PDdnnSyGKdNh9mG650KegqxlAb38PTY72HA765LBzI4k1_66Hi6OaUqML2Fls-ZXobAi3Izl71yFAWmAqb6JoFOpH6e3g_vmz7keJIErPGP6-UnYqcBec1QudQ-KdhJO7jVYS_ZpE_v3jHR6nZ6FquHJLC_kacCDyV8JvjIPbLpNSjbqwgwiNCiMbdeNFUnkNWtBCbpM2tbiBrLBD1rDxc7EWbmmprtNtBJGbPa_CXL9dBmpjBCYyBvX" 
            />
            <img 
              referrerPolicy="no-referrer"
              alt="Member 3" 
              className="w-8 h-8 rounded-full border-2 border-surface-container" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ05U8ggIqtfMjzvKFqfCWLXcom1hqyCDEacYyGVDVZvoduKc2SncLMh2ktHisqW5eOhpsYeUSilekVjA3npKoaoAB60f02ldcF8bXiIXw3HdYr1TZDnORePx-BE-wbAomLDm5OSIgIetYK6LmNJTSN5UAn3Gglr66XDOtPe1kqBa0vwHVqwd1d28xL1bxnNwW3cINOcTXEE7YDCq0ky5cTX5Di_lp5-kjY8uoT5FXFKwAlv1RpzvLV1xJi3oPIicHP05KyEb8kDke" 
            />
            <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-container flex items-center justify-center text-[10px] font-bold text-primary">
              +2k
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
