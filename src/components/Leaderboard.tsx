/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  Award, Star, Flame, Trophy, Lock, Heart, PlusCircle, CheckCircle, 
  Search, Shield, Gift, Target, Sparkles, Plus, ArrowUpRight
} from 'lucide-react';
import { RankingMember, UserProfile } from '../types';

interface LeaderboardProps {
  onShowNotification: (text: string) => void;
  profile: UserProfile;
}

export default function Leaderboard({ onShowNotification, profile }: LeaderboardProps) {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [showNominateModal, setShowNominateModal] = useState(false);
  const [nominationName, setNominationName] = useState('');
  const [nominationReason, setNominationReason] = useState('');
  const [searchMemberQuery, setSearchMemberQuery] = useState('');

  // Local state for user points to demonstrate real interactivity
  const [userPoints, setUserPoints] = useState(1240);

  // Timeframe-dependent mock data to animate rankings
  const rankingsData: Record<typeof timeframe, RankingMember[]> = {
    month: [
      { rank: 1, name: 'Lê Văn C', department: 'Phòng Kỹ thuật', points: 3420, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG19COR-WbN0qsFKUEyb1NHazfLUkomXBpbnHsHP428C97bLCUTGbg9JHJEQAAsfjNPPTVvtR2Asdli_XU7nB6gSifRXkbUka5S64fypSRS_e0YotxPLdY6I9tsJsGT3EEsNskP_FDfXF6KLZsDJp7vWVCDqvu8YbecAKjsWlz41Y5WxRfHMpeGIJ7oQJbzTlvCHWgxGmxohmAhOrhMkGEFxZqkEgd-HYqMeqK7bTwdx8TFm5FwsyAwBgNWAvm7hWoc4eLdc2nA92m', clubCount: 4 },
      { rank: 2, name: 'Trần Thị B', department: 'Phòng Marketing', points: 2850, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpRPo7eIwAVTWlVdiuTwGUtXMod9dzuYerNpd_xSJz3JiEIqc3CKyGkHnO8mMKCX5tVXpsDQ38ksdkMMqJue4ZYguiJXD1NKTN_282D_vOzZ6bvBQoPSdZltAYiZT8XvJlOiFH6OeuIm0K1pxlU-nNth1RsGvxoq9mhoaOtIkkwnSSGT8BUHHLctw6v0kKwNk4LhKg9qWo627lFc05yIXJg2l1o5fPpDJZnFQZFnL2x63bf7NFAZ2X10CElYTJq2Q5v2Xxueb8XZcu', clubCount: 3 },
      { rank: 3, name: 'Phạm Minh D', department: 'Phòng Nhân sự', points: 2610, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaZRG9ciZ5tI5Lkas5zvnwtn-1qukQ9ZMuSnsguiXWVz7E6PTJg4ArCY44CfbQBRydFndOHD4h2jGAjgaL3d6hmJTv-U4OlSh12DQR5un7K3N3ttf72hrFKx1qyrJnWDHKTzEb9KKUXrWviB_d_XbNH08zfbBS4lJvctREPkhewmFWIGBxopRGSG1mPRIgFPJYQ5TrnOTzJlsX58Q4hVZJSJCvTVX4J2Ktm9NFmAlmWRyiLg-3qJhP0AnxMa_cikR4Q9gDpEt4jgjk', clubCount: 2 },
      { rank: 4, name: 'Nguyễn Thị E', department: 'Phòng Tài chính', points: 2450, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7SmSgFv8d_mfBf4khn9yP_vQj_c6eSXKW8la2xtAiW9vRB1IO8AOxnk6NiAyYb6X8vfuwI7A9ED4sCue325ruPuwudgCNO5zeMeP6dvDGaRRnHejNWLNqXgPnQgANyNiq3T780bRHahMxqUMQr36VajsZ07Jz7JzbdAAa4ksqJEA7n2Vnu2zckh_ngQPtF9QschZX4HScyRtdPMwUQaFU0RzlCJDNcZQUNRhCP4aX_fkoWUt2K1KjMGx8JZPas7XxxMr5bl3BjXX6', clubCount: 8 },
      { rank: 5, name: 'Đặng Văn F', department: 'Phòng Công nghệ', points: 2380, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjVLV6uSHNPxyuwcIHs9rFtBaBrrTnseWMcPNm36GZHJiyU7QAGt4wIR8a7tSzrBmocdsBoTKz8dNo6vcU6Qoh97kaqYKb2BBh2T83KKeNZJHbj-dZdp1--2De1kos81yDRClr90D7EYUALmVIDa2s1kuljMds7ZBendOMdsbFLQHMax4clopzDCWYeS6-cH63QplCkMhbYnTQWCnoPSCncFyKDH_DxNmYL0XWydyJ0OSDg-nUzxbnhXHBXyYm-66LfoxZg-goTYyI', clubCount: 12 },
      { rank: 6, name: 'Bùi Thị G', department: 'Phòng Vận hành', points: 2120, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW8DlxaS_RIAWxYqLEIzrJMAfjsmYrd7RvUN9VtZjdKN4H7lKhxk7TCUy2yqaj-nNX6kwPfn3szmyN4Dn3ZmYHKYcmyx_Nwuhklis7swURiM_9MeDyerPQAaAlJyLV3Ak4nk7xKzusc023n_HMODNDud5Ig6DWRYLaxX01qJ1R_HfyOXAJz7ALuo9weKHhw7eFShiBllzs_DNNgeEPX9CXLq2Y15l-YGoXFHdxHtGiPOfDFEpFnKpzi_zUNTnJQZQmkPkq1vlYbgSu', clubCount: 5 }
    ],
    quarter: [
      { rank: 1, name: 'Lê Văn C', department: 'Phòng Kỹ thuật', points: 9550, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG19COR-WbN0qsFKUEyb1NHazfLUkomXBpbnHsHP428C97bLCUTGbg9JHJEQAAsfjNPPTVvtR2Asdli_XU7nB6gSifRXkbUka5S64fypSRS_e0YotxPLdY6I9tsJsGT3EEsNskP_FDfXF6KLZsDJp7vWVCDqvu8YbecAKjsWlz41Y5WxRfHMpeGIJ7oQJbzTlvCHWgxGmxohmAhOrhMkGEFxZqkEgd-HYqMeqK7bTwdx8TFm5FwsyAwBgNWAvm7hWoc4eLdc2nA92m', clubCount: 4 },
      { rank: 2, name: 'Đặng Văn F', department: 'Phòng Công nghệ', points: 8320, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjVLV6uSHNPxyuwcIHs9rFtBaBrrTnseWMcPNm36GZHJiyU7QAGt4wIR8a7tSzrBmocdsBoTKz8dNo6vcU6Qoh97kaqYKb2BBh2T83KKeNZJHbj-dZdp1--2De1kos81yDRClr90D7EYUALmVIDa2s1kuljMds7ZBendOMdsbFLQHMax4clopzDCWYeS6-cH63QplCkMhbYnTQWCnoPSCncFyKDH_DxNmYL0XWydyJ0OSDg-nUzxbnhXHBXyYm-66LfoxZg-goTYyI', clubCount: 12 },
      { rank: 3, name: 'Trần Thị B', department: 'Phòng Marketing', points: 7920, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpRPo7eIwAVTWlVdiuTwGUtXMod9dzuYerNpd_xSJz3JiEIqc3CKyGkHnO8mMKCX5tVXpsDQ38ksdkMMqJue4ZYguiJXD1NKTN_282D_vOzZ6bvBQoPSdZltAYiZT8XvJlOiFH6OeuIm0K1pxlU-nNth1RsGvxoq9mhoaOtIkkwnSSGT8BUHHLctw6v0kKwNk4LhKg9qWo627lFc05yIXJg2l1o5fPpDJZnFQZFnL2x63bf7NFAZ2X10CElYTJq2Q5v2Xxueb8XZcu', clubCount: 3 },
      { rank: 4, name: 'Phạm Minh D', department: 'Phòng Nhân sự', points: 7210, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaZRG9ciZ5tI5Lkas5zvnwtn-1qukQ9ZMuSnsguiXWVz7E6PTJg4ArCY44CfbQBRydFndOHD4h2jGAjgaL3d6hmJTv-U4OlSh12DQR5un7K3N3ttf72hrFKx1qyrJnWDHKTzEb9KKUXrWviB_d_XbNH08zfbBS4lJvctREPkhewmFWIGBxopRGSG1mPRIgFPJYQ5TrnOTzJlsX58Q4hVZJSJCvTVX4J2Ktm9NFmAlmWRyiLg-3qJhP0AnxMa_cikR4Q9gDpEt4jgjk', clubCount: 2 },
      { rank: 5, name: 'Nguyễn Thị E', department: 'Phòng Tài chính', points: 6860, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7SmSgFv8d_mfBf4khn9yP_vQj_c6eSXKW8la2xtAiW9vRB1IO8AOxnk6NiAyYb6X8vfuwI7A9ED4sCue325ruPuwudgCNO5zeMeP6dvDGaRRnHejNWLNqXgPnQgANyNiq3T780bRHahMxqUMQr36VajsZ07Jz7JzbdAAa4ksqJEA7n2Vnu2zckh_ngQPtF9QschZX4HScyRtdPMwUQaFU0RzlCJDNcZQUNRhCP4aX_fkoWUt2K1KjMGx8JZPas7XxxMr5bl3BjXX6', clubCount: 8 },
      { rank: 6, name: 'Bùi Thị G', department: 'Phòng Vận hành', points: 5800, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW8DlxaS_RIAWxYqLEIzrJMAfjsmYrd7RvUN9VtZjdKN4H7lKhxk7TCUy2yqaj-nNX6kwPfn3szmyN4Dn3ZmYHKYcmyx_Nwuhklis7swURiM_9MeDyerPQAaAlJyLV3Ak4nk7xKzusc023n_HMODNDud5Ig6DWRYLaxX01qJ1R_HfyOXAJz7ALuo9weKHhw7eFShiBllzs_DNNgeEPX9CXLq2Y15l-YGoXFHdxHtGiPOfDFEpFnKpzi_zUNTnJQZQmkPkq1vlYbgSu', clubCount: 5 }
    ],
    year: [
      { rank: 1, name: 'Đặng Văn F', department: 'Phòng Công nghệ', points: 31200, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjVLV6uSHNPxyuwcIHs9rFtBaBrrTnseWMcPNm36GZHJiyU7QAGt4wIR8a7tSzrBmocdsBoTKz8dNo6vcU6Qoh97kaqYKb2BBh2T83KKeNZJHbj-dZdp1--2De1kos81yDRClr90D7EYUALmVIDa2s1kuljMds7ZBendOMdsbFLQHMax4clopzDCWYeS6-cH63QplCkMhbYnTQWCnoPSCncFyKDH_DxNmYL0XWydyJ0OSDg-nUzxbnhXHBXyYm-66LfoxZg-goTYyI', clubCount: 12 },
      { rank: 2, name: 'Lê Văn C', department: 'Phòng Kỹ thuật', points: 28430, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG19COR-WbN0qsFKUEyb1NHazfLUkomXBpbnHsHP428C97bLCUTGbg9JHJEQAAsfjNPPTVvtR2Asdli_XU7nB6gSifRXkbUka5S64fypSRS_e0YotxPLdY6I9tsJsGT3EEsNskP_FDfXF6KLZsDJp7vWVCDqvu8YbecAKjsWlz41Y5WxRfHMpeGIJ7oQJbzTlvCHWgxGmxohmAhOrhMkGEFxZqkEgd-HYqMeqK7bTwdx8TFm5FwsyAwBgNWAvm7hWoc4eLdc2nA92m', clubCount: 4 },
      { rank: 3, name: 'Trần Thị B', department: 'Phòng Marketing', points: 24100, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpRPo7eIwAVTWlVdiuTwGUtXMod9dzuYerNpd_xSJz3JiEIqc3CKyGkHnO8mMKCX5tVXpsDQ38ksdkMMqJue4ZYguiJXD1NKTN_282D_vOzZ6bvBQoPSdZltAYiZT8XvJlOiFH6OeuIm0K1pxlU-nNth1RsGvxoq9mhoaOtIkkwnSSGT8BUHHLctw6v0kKwNk4LhKg9qWo627lFc05yIXJg2l1o5fPpDJZnFQZFnL2x63bf7NFAZ2X10CElYTJq2Q5v2Xxueb8XZcu', clubCount: 3 },
      { rank: 4, name: 'Phạm Minh D', department: 'Phòng Nhân sự', points: 21900, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaZRG9ciZ5tI5Lkas5zvnwtn-1qukQ9ZMuSnsguiXWVz7E6PTJg4ArCY44CfbQBRydFndOHD4h2jGAjgaL3d6hmJTv-U4OlSh12DQR5un7K3N3ttf72hrFKx1qyrJnWDHKTzEb9KKUXrWviB_d_XbNH08zfbBS4lJvctREPkhewmFWIGBxopRGSG1mPRIgFPJYQ5TrnOTzJlsX58Q4hVZJSJCvTVX4J2Ktm9NFmAlmWRyiLg-3qJhP0AnxMa_cikR4Q9gDpEt4jgjk', clubCount: 2 },
      { rank: 5, name: 'Nguyễn Thị E', department: 'Phòng Tài chính', points: 19800, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7SmSgFv8d_mfBf4khn9yP_vQj_c6eSXKW8la2xtAiW9vRB1IO8AOxnk6NiAyYb6X8vfuwI7A9ED4sCue325ruPuwudgCNO5zeMeP6dvDGaRRnHejNWLNqXgPnQgANyNiq3T780bRHahMxqUMQr36VajsZ07Jz7JzbdAAa4ksqJEA7n2Vnu2zckh_ngQPtF9QschZX4HScyRtdPMwUQaFU0RzlCJDNcZQUNRhCP4aX_fkoWUt2K1KjMGx8JZPas7XxxMr5bl3BjXX6', clubCount: 8 },
      { rank: 6, name: 'Bùi Thị G', department: 'Phòng Vận hành', points: 15400, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW8DlxaS_RIAWxYqLEIzrJMAfjsmYrd7RvUN9VtZjdKN4H7lKhxk7TCUy2yqaj-nNX6kwPfn3szmyN4Dn3ZmYHKYcmyx_Nwuhklis7swURiM_9MeDyerPQAaAlJyLV3Ak4nk7xKzusc023n_HMODNDud5Ig6DWRYLaxX01qJ1R_HfyOXAJz7ALuo9weKHhw7eFShiBllzs_DNNgeEPX9CXLq2Y15l-YGoXFHdxHtGiPOfDFEpFnKpzi_zUNTnJQZQmkPkq1vlYbgSu', clubCount: 5 }
    ]
  };

  const currentRankings = rankingsData[timeframe];
  const podiumMembers = currentRankings.slice(0, 3);
  const listMembers = currentRankings.slice(3);

  // Filter rankings list based on search bar
  const filteredListMembers = listMembers.filter(m => 
    m.name.toLowerCase().includes(searchMemberQuery.toLowerCase()) || 
    m.department.toLowerCase().includes(searchMemberQuery.toLowerCase())
  );

  const handleRedeem = () => {
    if (userPoints < 1000) {
      onShowNotification('Bạn không đủ điểm tích lũy để quy đổi coupon!');
      return;
    }
    setUserPoints(prev => prev - 1000);
    onShowNotification('Đổi quà thành công! Bạn nhận được Voucher "Café cùng Giám đốc". Mã code đã được gửi về email của bạn!');
  };

  const handleNominateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nominationName.trim()) return;
    onShowNotification(`Đề cử thành viên "${nominationName}" thành công! Ban Quản Trị sẽ xét duyệt đóng góp của họ.`);
    setNominationName('');
    setNominationReason('');
    setShowNominateModal(false);
  };

  return (
    <div id="leaderboard-view" className="space-y-8 animate-fade-in relative">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Bảng xếp hạng</h2>
          <p className="text-body-md text-on-surface-variant">
            Vinh danh những cá nhân xuất sắc nhất trong cộng đồng Mỹ Lan Connect.
          </p>
        </div>
        <div className="flex bg-surface-container-high rounded-xl p-1 gap-1 shrink-0 shadow-inner">
          <button 
            onClick={() => setTimeframe('month')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              timeframe === 'month' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Tháng này
          </button>
          <button 
            onClick={() => setTimeframe('quarter')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              timeframe === 'quarter' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Quý này
          </button>
          <button 
            onClick={() => setTimeframe('year')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              timeframe === 'year' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Năm nay
          </button>
        </div>
      </div>

      {/* Grid Layout: Leaderboard + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Area (Podium & List) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Top Podium Section */}
          <div className="relative grid grid-cols-3 items-end gap-3 pt-12 pb-8 px-4 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl border border-primary/5 min-h-[300px]">
            
            {/* 2nd Place */}
            {podiumMembers[1] && (
              <div className="flex flex-col items-center group transition-transform duration-500 hover:-translate-y-2 select-none">
                <div className="relative mb-6">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-gray-400">
                    <Trophy className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(156,163,175,0.4)]" />
                  </div>
                  <img 
                    referrerPolicy="no-referrer"
                    alt="Silver Medalist" 
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-gray-400/30 border-2 border-gray-400/60 shadow-[0_0_15px_rgba(156,163,175,0.15)]" 
                    src={podiumMembers[1].image} 
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gray-400 text-on-surface-container font-black py-1 px-2.5 rounded-full text-xs shadow-md">
                    #2
                  </div>
                </div>
                <h3 className="font-bold text-sm text-center text-on-surface">{podiumMembers[1].name}</h3>
                <p className="text-[10px] text-on-surface-variant mb-2">{podiumMembers[1].department}</p>
                <div className="bg-surface-container-high px-4 py-1.5 rounded-full border border-outline-variant/30 text-xs font-semibold flex items-center gap-1">
                  <span className="text-primary font-bold">{podiumMembers[1].points.toLocaleString('vi-VN')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-on-surface-variant">Điểm/Points</span>
                </div>
              </div>
            )}

            {/* 1st Place - Center */}
            {podiumMembers[0] && (
              <div className="flex flex-col items-center group transition-transform duration-500 hover:-translate-y-4 select-none">
                <div className="relative mb-8 scale-110">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400">
                    <Trophy className="w-10 h-10 filter drop-shadow-[0_0_12px_rgba(253,224,71,0.5)] animate-pulse" />
                  </div>
                  <img 
                    referrerPolicy="no-referrer"
                    alt="Gold Medalist" 
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-yellow-400 border-2 border-yellow-400/60 shadow-[0_0_25px_rgba(253,224,71,0.25)]" 
                    src={podiumMembers[0].image} 
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-on-primary-container leading-none font-black px-4 py-1.5 rounded-full text-sm shadow-lg whitespace-nowrap">
                    #1 {timeframe === 'month' ? 'Tháng này' : 'Dẫn đầu'}
                  </div>
                </div>
                <h3 className="font-bold text-base text-center text-primary leading-tight mt-2">{podiumMembers[0].name}</h3>
                <p className="text-xs text-on-surface-variant mb-3 font-semibold">{podiumMembers[0].department}</p>
                <div className="bg-primary/20 px-5 py-2 rounded-full border border-primary/30 shadow-[0_0_15px_rgba(173,198,255,0.15)] text-sm font-black flex items-center gap-1.5">
                  <span className="text-primary font-bold text-base">{podiumMembers[0].points.toLocaleString('vi-VN')}</span>
                  <span className="text-[10px] uppercase tracking-wider text-primary/80">Điểm</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {podiumMembers[2] && (
              <div className="flex flex-col items-center group transition-transform duration-500 hover:-translate-y-2 select-none">
                <div className="relative mb-6">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-700">
                    <Trophy className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(194,65,12,0.4)]" />
                  </div>
                  <img 
                    referrerPolicy="no-referrer"
                    alt="Bronze Medalist" 
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-amber-700/30 border-2 border-amber-700/60 shadow-[0_0_15px_rgba(194,65,12,0.15)]" 
                    src={podiumMembers[2].image} 
                  />
                  <div className="absolute -bottom-2 -left-2 bg-amber-700 text-on-surface font-black py-1 px-2.5 rounded-full text-xs shadow-md">
                    #3
                  </div>
                </div>
                <h3 className="font-bold text-sm text-center text-on-surface">{podiumMembers[2].name}</h3>
                <p className="text-[10px] text-on-surface-variant mb-2">{podiumMembers[2].department}</p>
                <div className="bg-surface-container-high px-4 py-1.5 rounded-full border border-outline-variant/30 text-xs font-semibold flex items-center gap-1">
                  <span className="text-primary font-bold">{podiumMembers[2].points.toLocaleString('vi-VN')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-on-surface-variant">Điểm/Points</span>
                </div>
              </div>
            )}

          </div>

          {/* Ranking list detail */}
          <div className="glass-card rounded-3xl overflow-hidden border border-outline-variant/10 shadow-xl">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between sm:items-center bg-surface-variant/20 gap-4">
              <div>
                <h4 className="text-lg font-bold text-on-surface leading-tight">Xếp hạng chi tiết</h4>
                <p className="text-[11px] text-on-surface-variant">Danh sách xuất sắc từ vị trí thứ 4 trở đi</p>
              </div>
              
              {/* Search input for list filter */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input 
                  value={searchMemberQuery}
                  onChange={(e) => setSearchMemberQuery(e.target.value)}
                  className="w-full bg-surface-container-highest/60 border border-outline-variant/20 rounded-xl py-1.5 pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-on-surface-variant/40" 
                  placeholder="Lọc nhanh thành viên..." 
                  type="text"
                />
              </div>
            </div>

            <div className="divide-y divide-outline-variant/5">
              {filteredListMembers.map((member) => (
                <div 
                  key={member.rank}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-surface-variant/20 transition-all cursor-pointer group"
                >
                  <div className="w-8 text-center font-bold text-on-surface-variant">{member.rank}</div>
                  <img 
                    referrerPolicy="no-referrer"
                    alt={member.name} 
                    className="w-12 h-12 rounded-full object-cover border border-outline-variant/10 group-hover:scale-105 transition-transform" 
                    src={member.image} 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-on-surface truncate">{member.name}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">{member.department}</p>
                  </div>
                  <div className="hidden md:flex flex-col items-center px-4 bg-outline-variant/10 rounded-lg py-1">
                    <p className="text-xs font-black text-on-surface">{member.clubCount}</p>
                    <p className="text-[8px] text-on-surface-variant uppercase font-semibold">Câu lạc bộ</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-primary text-base">+{member.points.toLocaleString('vi-VN')}</p>
                    <p className="text-[9px] text-on-surface-variant uppercase tracking-wider">Tích lũy</p>
                  </div>
                </div>
              ))}

              {filteredListMembers.length === 0 && (
                <p className="text-center py-8 text-xs text-on-surface-variant italic">Không tìm thấy thành viên phù hợp với từ khóa.</p>
              )}
            </div>
            
            <div className="p-4 text-center border-t border-outline-variant/5">
              <span className="text-primary text-xs font-semibold hover:underline cursor-pointer">
                Xem thêm toàn bộ bảng xếp hạng (Đang hiển thị Top 6)
              </span>
            </div>
          </div>

        </div>

        {/* Sidebar Space (Rewards & Progress) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Progress & Reward exchange slider */}
          <div className="glass-card rounded-3xl p-6 space-y-6 border border-outline-variant/10 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-on-surface">Tiến trình đổi thưởng</h4>
              <Gift className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-xs text-on-surface-variant">Tích lũy của bạn</p>
                <p className="text-xl font-bold text-primary">
                  {userPoints.toLocaleString('vi-VN')} <span className="text-xs font-normal text-on-surface-variant">Điểm/Pts</span>
                </p>
              </div>
              <div className="h-3 w-full bg-surface-container-highest/60 rounded-full overflow-hidden select-none">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(173,198,255,0.5)]" 
                  style={{ width: `${Math.min((userPoints / 2000) * 100, 100)}%` }}
                ></div>
              </div>
              {userPoints >= 2000 ? (
                <p className="text-[11px] text-tertiary italic">Đủ điểm tích lũy đổi Voucher "Café cùng Giám đốc"!</p>
              ) : (
                <p className="text-[11px] text-on-surface-variant/80 italic">
                  Còn {2000 - userPoints} điểm nữa để nhận voucher "Café cùng Giám đốc"
                </p>
              )}
            </div>

            <button 
              onClick={handleRedeem}
              className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all text-xs cursor-pointer shadow-lg shadow-primary/20"
            >
              Đổi phần thưởng ngay (1,000 Points)
            </button>
          </div>

          {/* Unlocked / Locked badges list */}
          <div className="glass-card rounded-3xl p-6 space-y-6 border border-outline-variant/10 index-20">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-on-surface">Huy hiệu đạt được</h4>
              <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">4 / 12</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Badge 1 */}
              <div className="flex flex-col items-center gap-2 group cursor-pointer" title="Đã mở khóa: Duy trì điểm danh CLB trên 90%">
                <div className="w-14 h-14 rounded-2xl bg-tertiary/10 border border-tertiary/30 flex items-center justify-center transition-all group-hover:bg-tertiary/20 group-hover:scale-105">
                  <CheckCircle className="w-7 h-7 text-tertiary" />
                </div>
                <p className="text-[9px] font-bold text-center leading-tight truncate w-full">Chuyên cần</p>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center gap-2 group cursor-pointer" title="Đã mở khóa: Đóng góp tích cực trong 3 sự kiện">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center transition-all group-hover:bg-primary/20 group-hover:scale-105">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <p className="text-[9px] font-bold text-center leading-tight truncate w-full">Đại sứ văn hóa</p>
              </div>

              {/* Badge 3 */}
              <div className="flex flex-col items-center gap-2 group cursor-pointer" title="Đã mở khóa: Sinh hoạt CLB đều đặn hơn 30 ngày">
                <div className="w-14 h-14 rounded-2xl bg-error/10 border border-error/30 flex items-center justify-center transition-all group-hover:bg-error/25 group-hover:scale-105">
                  <Flame className="w-7 h-7 text-error" />
                </div>
                <p className="text-[9px] font-bold text-center leading-tight truncate w-full">Chiến binh</p>
              </div>

              {/* Locked Badges */}
              <div className="flex flex-col items-center gap-2 opacity-30 grayscale group cursor-not-allowed">
                <div className="w-14 h-14 rounded-2xl bg-surface-variant border border-outline flex items-center justify-center">
                  <Lock className="w-6 h-6 text-on-surface-variant" />
                </div>
                <p className="text-[9px] font-bold text-center leading-tight truncate w-full">Lãnh đạo trẻ</p>
              </div>

              <div className="flex flex-col items-center gap-2 opacity-30 grayscale group cursor-not-allowed">
                <div className="w-14 h-14 rounded-2xl bg-surface-variant border border-outline flex items-center justify-center">
                  <Lock className="w-6 h-6 text-on-surface-variant" />
                </div>
                <p className="text-[9px] font-bold text-center leading-tight truncate w-full">Nhà sáng tạo</p>
              </div>

              <div className="flex flex-col items-center gap-2 opacity-30 grayscale group cursor-not-allowed">
                <div className="w-14 h-14 rounded-2xl bg-surface-variant border border-outline flex items-center justify-center">
                  <Lock className="w-6 h-6 text-on-surface-variant" />
                </div>
                <p className="text-[9px] font-bold text-center leading-tight truncate w-full">Gắn kết đội ngũ</p>
              </div>
            </div>
          </div>

          {/* Point logs list */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border border-outline-variant/10">
            <h4 className="text-base font-bold text-on-surface">Hoạt động gần nhất</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">+50 điểm <span className="font-normal text-on-surface-variant">từ CLB Yoga</span></p>
                  <p className="text-[10px] text-on-surface-variant">2 giờ trước</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0 text-tertiary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Nhận huy hiệu <span className="font-normal text-on-surface-variant">Chiến binh hoạt động</span></p>
                  <p className="text-[10px] text-on-surface-variant">Hôm qua</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Action Modal Trigger for Quick Nominations */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setShowNominateModal(true)}
          className="flex items-center gap-3 bg-primary text-on-primary font-bold px-6 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <Award className="w-5 h-5 text-on-primary-container" />
          <span>Đề cử thành viên</span>
        </button>
      </div>

      {/* Nomination Form Modal */}
      {showNominateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full rounded-2xl p-8 space-y-6 relative border border-primary/20">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Đề cử Thành viên Xuất sắc
              </h3>
            </div>
            
            <form onSubmit={handleNominateSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant block uppercase tracking-wider">Họ và tên thành viên</label>
                <input 
                  value={nominationName}
                  onChange={(e) => setNominationName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn Hải"
                  className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant block uppercase tracking-wider">Lý do đề cử</label>
                <textarea 
                  value={nominationReason}
                  onChange={(e) => setNominationReason(e.target.value)}
                  placeholder="Nêu bật những đóng góp, hoạt động sôi nổi của thành viên..."
                  className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  rows={4}
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/10">
                <button 
                  type="button"
                  onClick={() => setShowNominateModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-variant/30 text-on-surface cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg"
                >
                  Gửi đề cử
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
