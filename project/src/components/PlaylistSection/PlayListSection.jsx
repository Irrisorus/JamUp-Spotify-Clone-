import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  ChevronLeft, ChevronRight } from 'lucide-react';
import PlaylistSlide from './PlayLIstSlide';
import 'swiper/css';
import "./PlayListSection.css";




function PlaylistSection({ title, items, slidesPerView = 6 }) {
  const swiperRef = useRef();
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const updateNavigationState = () => { 
    if (swiperRef.current) {
      setShowPrevButton(!swiperRef.current.isBeginning);
      setShowNextButton(!swiperRef.current.isEnd);
    }
  };

  return (
    <div className="playlist-section">
      <h2 className="section-title">{title}</h2>
      {showPrevButton && (
        <div 
          className="nav-button prev"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft size={24} />
        </div>
      )}
      {showNextButton && (
        <div 
          className="nav-button next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight size={24} />
        </div>
      )}
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onAfterInit={updateNavigationState}
        onSlideChange={updateNavigationState}
        onBreakpoint={updateNavigationState}
        onResize={updateNavigationState}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        className="playlist-container"
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: slidesPerView, spaceBetween: 20 },
        }}
      >
        {items.map((playlist) => (
          <SwiperSlide key={playlist.id}>
            <PlaylistSlide {...playlist} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PlaylistSection