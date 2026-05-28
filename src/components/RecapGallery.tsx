/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  Image, Sparkles, Filter, Eye, Calendar, FolderOpen, ZoomIn, 
  Upload, ChevronLeft, ChevronRight, Plus, ArrowRight, X, AlertCircle
} from 'lucide-react';
import { RecapAlbum } from '../types';

interface RecapGalleryProps {
  recapAlbums: RecapAlbum[];
  onAddNewAlbum: (newAlbum: RecapAlbum) => void;
  onShowNotification: (text: string) => void;
}

export default function RecapGallery({
  recapAlbums,
  onAddNewAlbum,
  onShowNotification
}: RecapGalleryProps) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create state for creating a new album
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Thể thao' | 'Workshop' | 'Giải trí' | 'Teambuilding'>('Thể thao');
  const [newPhotosCount, setNewPhotosCount] = useState(50);
  const [newImage, setNewImage] = useState('');

  // Album Lightbox state for previewing pictures inside album
  const [lightboxAlbum, setLightboxAlbum] = useState<RecapAlbum | null>(null);

  // List of mock images used inside the preview lightbox
  const lightboxImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAwYi7_-IVgKzmJFOFIuQ0K4jqerLyQ07yRGMs0UIMqF2LuffR691OBTRKVYWtOTfKqKBsm9sA9TQ2dyknbTIftFoqVFul5I8RiIdT2Ofcw_cfX6g-hzVemfKED0j_8WneXbmHbcS0M9zI_1Yfu1GMhV3sIftdwUkJOLWDyXmsO_GdxZnoOVOBws6n1GF2ZR_3iGXKMUaetebIU6HhSpgQ8_th_1q6JT1TzdAHz9i__5HU0JVNvB77FrenkMmcwgf9aLolskhtjiEc8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBssbKpqwenFy9Dm-WU7Q3UZWny7VWBMV5Ucn9pK3gM_obQaM9mQXn7NtljkAXQ4VehGibRB5rom9cJv0CJf1qYwoNJ2wAjt0c2AYSCLykZBc2h21suWzAJ4qcAUsAaoTare3jWfXDE1DfR6ZlWlTE_I808vUtmXz7pzrm6DJvLHOLYQByU8OBnQG_AuRgxL8MFGfFeBMECKtQ5V4l8nLIb_cKPCCqWHHWdSjYBRgqL6cDI84zbnt_xdQE-dsWiMr0bAkQaRmyrg0w0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD5vwBaxC4ROmh_WQBLIXI9VHU82HUTJpvxaJgJcE5d0ONxqFl-OkqEuutbYs4mSErBAp3uxjmrP4VKCTCakU_g6N9LR5GuXHlje-1FVaDZN6A67lEjbXBexVkUoBrSneRLNEKVBFe93-0z5x2vXSU0Tl78m_81u8cb9Cv3pZ5mk_zB_D6W-ujWMAOBCzyQw1Mji__eC70MHLDV7nqZ90918aBYqPc_k7X6mLf4niXfc5tXwTNVftO8dGVXZJGDDolJUJHUdZFbLIXb',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBg4b09jqKimvyVO482sZr1v_W8yJPyMX8AOAyI-fcEaHtLIuCZccWBj3rGrPW-oblNRp6Com1OnISQHnXTwOI_J3feXSMl4ij6z4y2jal6K39VX8naxPlzo2CIRArC8AgtMO9rUV4umfoZ7LEiCxy9K6BKZnFzsX5rEYIrvWQPOqzdmzUsmN1A1ZXEGtvjptbmuUndY7as8Wf6eiLHojLM6AbD1Gn-zO8XeYfoIADjiGCNW5unhvAsggP-P5j30OcxULvL3c35Ju6w'
  ];

  // Filters logic
  const filteredAlbums = recapAlbums.filter(album => {
    const matchesCategory = selectedCategory === 'Tất cả' || album.category === selectedCategory;
    const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          album.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredAlbum = recapAlbums.find(a => a.isFeatured) || recapAlbums[0];

  const handleCreateAlbum = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Use default random high-quality company event link if not provided
    const imgUrl = newImage.trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcvk1nEKwXu09PZ7IhtXh-bUq8MfKg4x6hdy3GjmxYbtXg-F4LbSTANl-7jS3gkXU70ek2POJVWZUBbXPcjJCgETYVDLgmfdpJHSi9HQRBv9V8hFojZcVqdIe2lNTGK6-AVymFrE8n8KixNFX-QF8IC62f0HRrcKr5a90-Mz_u1ypL1R3DdnH2Tj06N3KyBmaB_vA_06bXcBKb7a3W5FD9x4vkppLZLzNZyOyfn9K_nO9KF7oIqLaYoMgZyPGH0r3NIPFRUNteffIx';

    onAddNewAlbum({
      id: `recap-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      date: 'Hôm nay',
      photosCount: newPhotosCount,
      image: imgUrl,
      views: 12
    });

    onShowNotification(`Tạo album "${newTitle}" thành công!`);
    setNewTitle('');
    setNewImage('');
    setShowUploadModal(false);
  };

  return (
    <div id="recap-gallery-view" className="space-y-8 animate-fade-in relative z-20">
      
      {/* Featured Banner (Bento Style) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Massive expressive image */}
        <div className="lg:col-span-2 relative h-80 rounded-3xl overflow-hidden group shadow-2xl border border-primary/5">
          <img 
            referrerPolicy="no-referrer"
            alt={featuredAlbum.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={featuredAlbum.image} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 space-y-3 w-full">
            <span className="px-3 py-1 bg-primary text-on-primary text-xs rounded-full font-bold uppercase tracking-widest shadow-sm">
              Featured Album / Tiêu điểm
            </span>
            <h2 className="text-3xl font-black text-white leading-tight mt-1">{featuredAlbum.title}</h2>
            
            <div className="flex flex-wrap items-center gap-6 text-on-surface-variant font-medium mt-4">
              <span className="flex items-center gap-2 text-xs"><Calendar className="w-4 h-4 text-primary" /> {featuredAlbum.date}</span>
              <span className="flex items-center gap-2 text-xs"><FolderOpen className="w-4 h-4 text-primary" /> {featuredAlbum.photosCount} Ảnh</span>
              <button 
                onClick={() => setLightboxAlbum(featuredAlbum)}
                className="bg-white/10 hover:bg-white text-white hover:text-black px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shrink-0 ml-auto"
              >
                Xem ngay <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Trending Recap summary panel */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between border border-primary/10">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-tertiary-container/30 rounded-2xl flex items-center justify-center text-tertiary animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Trending Recap</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Những khoảnh khắc đáng nhớ nhất được tương tác và xem nhiều nhất trong tuần qua.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setLightboxAlbum(recapAlbums[1])}>
              <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-outline-variant/10">
                <img referrerPolicy="no-referrer" alt="Workshop" className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkjgKheoixsaRWRQYj7_DUvY9zayohJtXNcW5ulxDi3B_itIbh5J_Og8zjXGTfXHDq75xd9_1ArlpNjOrko5OpUR7QxcZnMPTPiMrOeb9HALa5Eks5v1rfAB4Fncl22uhglu4xE8Jg-kxvO3HIewl6w1E5_O4RUDg-0zaW6QHDINDUE6rd1S8UKXxom0FYc7VQ5kLeqTMH-dfG2poO7tbgEPDVReFk2D7WjzNAXfqAUGZklMYT7YPZ_FFpCDs5pDe6oI_7-oDmB49v" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">Workshop AI Creative</p>
                <p className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mt-0.5"><Eye className="w-3.5 h-3.5 text-primary" /> 42 lượt xem • Hôm nay</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setLightboxAlbum(recapAlbums[2])}>
              <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-outline-variant/10">
                <img referrerPolicy="no-referrer" alt="Meeting" className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkq73NKeNe1-V0IvMCNScj0otIa-yzhTPMka0xNv4yfb3bIyjIg8SFNjO7nn9lwmmK50QtN2TG-qVYlRHHvYJbB52_-f0EPgip3cRi7Z32SVa1MSHtGj2koD_cq37WXnnwME_fZ4CrBYVYMtHlVkECP_OtbZjbADCj489772TclxDHQhTgYraGl4OcgRL58UvMrtaUkQz0o8QcxhYkXCbOuv5veX8W0Nqr9ZP7kFfn4juFVlN2QT_BuSx8pBMifOmg41DUNKaERspK" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">Tea Talk: Kết nối</p>
                <p className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mt-0.5"><Eye className="w-3.5 h-3.5 text-primary" /> 28 lượt xem • 2 ngày trước</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Header & Filter Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/10 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-on-surface">Thư viện ảnh sự kiện</h1>
          <p className="text-sm text-on-surface-variant">Lưu giữ từng khoảnh khắc gắn kết của đại gia đình Mỹ Lan.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Year Filter Choice */}
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Năm:</span>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-on-surface focus:ring-0 cursor-pointer block p-0"
            >
              <option value="2024" className="bg-surface-container block p-1 text-on-surface">2024</option>
              <option value="2023" className="bg-surface-container block p-1 text-on-surface">2023</option>
              <option value="2022" className="bg-surface-container block p-1 text-on-surface">2022</option>
            </select>
          </div>

          {/* Category Filter dropdown */}
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Phân Loại:</span>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-on-surface focus:ring-0 cursor-pointer block p-0"
            >
              <option value="Tất cả" className="bg-surface-container block p-1 text-on-surface">Tất cả</option>
              <option value="Thể thao" className="bg-surface-container block p-1 text-on-surface">Thể thao</option>
              <option value="Workshop" className="bg-surface-container block p-1 text-on-surface">Workshop</option>
              <option value="Teambuilding" className="bg-surface-container block p-1 text-on-surface">Teambuilding</option>
              <option value="Giải trí" className="bg-surface-container block p-1 text-on-surface">Giải trí</option>
            </select>
          </div>

          {/* Search bar inside filtering */}
          <div className="relative w-full sm:w-64">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container border border-outline-variant/20 rounded-xl py-2 pl-4 pr-10 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary w-full placeholder:text-on-surface-variant/40"
              placeholder="Search albums..."
            />
            <Filter className="w-4 h-4 text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {filteredAlbums.map((album) => (
          <article 
            key={album.id} 
            className="group cursor-pointer"
            onClick={() => setLightboxAlbum(album)}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-4 glass-panel border border-outline-variant/20 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_10px_35px_rgba(0,0,0,0.3)] transition-all duration-300">
              <img 
                referrerPolicy="no-referrer"
                alt={album.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src={album.image} 
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-sm">
                <Image className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-white">{album.photosCount}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white text-black p-3 rounded-full shadow-2xl">
                  <ZoomIn className="w-5 h-5 text-surface-dim" />
                </div>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1 block">
                {album.category}
              </span>
              <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                {album.title}
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5">{album.date}</p>
            </div>
          </article>
        ))}

        {/* Add More Album Card Placeholder */}
        <div 
          onClick={() => setShowUploadModal(true)}
          className="aspect-[4/3] rounded-2xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-3 text-on-surface-variant hover:border-primary/55 hover:text-primary transition-all cursor-pointer group bg-surface-container/10"
        >
          <div className="w-12 h-12 rounded-full border border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-on-surface-variant hover:text-primary" />
          </div>
          <span className="text-xs font-bold tracking-wide uppercase">Yêu cầu Recap mới</span>
        </div>
      </section>

      {/* Floating Action Button for Instant Recap Upload */}
      <button 
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group hover:rotate-90 cursor-pointer"
      >
        <Upload className="w-5 h-5" />
      </button>

      {/* Lightbox Album Detail Preview Modal */}
      {lightboxAlbum && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between p-8" id="lightbox-wrapper">
          {/* Lightbox Head */}
          <div className="flex justify-between items-center text-white border-b border-outline-variant/10 pb-4">
            <div>
              <span className="text-[10px] text-primary uppercase font-bold tracking-wider">{lightboxAlbum.category}</span>
              <h3 className="text-xl font-bold">{lightboxAlbum.title}</h3>
              <p className="text-xs text-on-surface-variant">{lightboxAlbum.date} • {lightboxAlbum.photosCount} Ảnh</p>
            </div>
            <button 
              onClick={() => setLightboxAlbum(null)}
              className="p-3 bg-surface-variant rounded-full text-white cursor-pointer hover:bg-red-500 hover:text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image Showcase */}
          <div className="flex items-center justify-center flex-1 py-8 relative">
            <img 
              referrerPolicy="no-referrer"
              src={lightboxAlbum.image} 
              alt="Active selection"
              className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl border border-outline-variant/20 animate-scale-up"
            />
          </div>

          {/* Lightbox Foot Thumbnail Previews */}
          <div className="space-y-4">
            <p className="text-xs text-on-surface-variant font-bold text-center">Album Photos Preview Grid</p>
            <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar py-2">
              {lightboxImages.map((img, idx) => (
                <div key={idx} className="w-24 h-16 rounded-lg overflow-hidden shrink-0 cursor-pointer border border-outline-variant/20 hover:border-primary transition-all">
                  <img referrerPolicy="no-referrer" src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Album Form Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full rounded-3xl p-8 space-y-6 border border-primary/20 animate-scale-up">
            <h3 className="text-xl font-bold text-on-surface flex items-center gap-2 pb-4 border-b border-outline-variant/10">
              <Upload className="w-5 h-5 text-primary animate-bounce" />
              Tải lên Album Recap Mới
            </h3>

            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant block tracking-wider">Tên sự kiện / Album</label>
                <input 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Hội thao bóng đá 2024"
                  className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant block tracking-wider">Chuyên mục</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs font-semibold text-on-surface appearance-none focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="Thể thao">Thể thao</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Teambuilding">Teambuilding</option>
                    <option value="Giải trí">Giải trí</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant block tracking-wider">Số lượng ảnh </label>
                  <input 
                    type="number"
                    value={newPhotosCount}
                    onChange={(e) => setNewPhotosCount(Number(e.target.value))}
                    className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    min={1}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant block tracking-wider">Link ảnh bìa (Tùy chọn URL)</label>
                <input 
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Dán link ảnh https://... hoặc để trống"
                  className="w-full bg-surface-container-highest/60 border border-outline-variant/30 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex gap-2 p-3 bg-primary/10 rounded-xl text-xs text-primary border border-primary/20 items-start">
                <AlertCircle className="w-5 h-5 shrink-0 text-primary" />
                <p>Album mới tạo sẽ hiển thị ngay trong danh sách Thư viện ảnh để các thành viên cùng tương tác.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant/10">
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-variant/30 text-on-surface cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/25"
                >
                  Đăng tải ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
