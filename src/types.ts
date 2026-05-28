/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabId = 'tong-quan' | 'quan-ly-clb' | 'lich-hoat-dong' | 'bang-xep-hang' | 'thu-vien-recap' | 'cai-dat';

export interface Club {
  id: string;
  name: string;
  category: 'Thể thao' | 'Học thuật' | 'Sở thích' | 'Nghệ thuật';
  memberCount: number;
  status: 'Active' | 'Draft';
  description: string;
  icon: string;
  isJoined?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'Thể thao' | 'Workshop' | 'Teambuilding';
  date: string; // e.g., "12 Tháng 10, 2024" or date string
  time: string;
  location: string;
  status: 'Đã Đăng Ký' | 'Chưa Đăng Ký' | 'Sắp mở' | 'Hết chỗ' | 'SẮP MỞ ĐĂNG KÝ';
  month: string; // e.g., "Th10"
  dayOfMonth: number;
  description?: string;
}

export interface RankingMember {
  rank: number;
  name: string;
  department: string;
  points: number;
  image: string;
  clubCount: number;
  recentPoints?: number;
}

export interface RecapAlbum {
  id: string;
  title: string;
  category: 'Thể thao' | 'Workshop' | 'Giải trí' | 'Teambuilding';
  date: string;
  photosCount: number;
  image: string;
  views: number;
  isFeatured?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  workerId: string;
  department: string;
  bio: string;
  avatarUrl: string;
  team: string;
  status: string;
}
