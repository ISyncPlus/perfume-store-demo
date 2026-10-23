import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play, Plus } from 'lucide-react';
import type { Product } from '@/lib/shop';
import { money } from '@/lib/shop';
import { Button } from './button';
export interface CoverFlowCarouselProps {
    items: Product[];
    onCtaClick: (product: Product) => void;
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
}
export function CoverFlowCarousel({ items, onCtaClick, autoplay = false, autoplayDelay = 4200, className = '' }: CoverFlowCarouselProps) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(!autoplay);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduced = useReducedMotion();
    const start = useRef<number | null>(null);
    const total = items.length;
    const current = ((index % total) + total) % total;
    const step = (direction: number) => setIndex(i => (i + direction + total) % total);
    const togglePlayback = () => {
        if (paused)
            step(1);
        setPaused(value => !value);
    };
    useEffect(() => { if (paused || reduced || !inView || total < 2)
        return; const timer = window.setInterval(() => { if (document.visibilityState === 'visible')
        setIndex(i => (i + 1) % total); }, autoplayDelay); return () => clearInterval(timer); }, [paused, reduced, inView, total, autoplayDelay]);
    if (!total)
        return null;
    const active = items[current];
    return <div ref={ref} className={`coverflow ${className}`} role="region" aria-roledescription="carousel" aria-label="Fragrance discovery" onKeyDown={e => { if (e.key === 'ArrowRight') {
        e.preventDefault();
        setPaused(true);
        step(1);
    } if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setPaused(true);
        step(-1);
    } }}>
  <div className="coverflow-stage" onTouchStart={e => { start.current = e.touches[0].clientX; }} onTouchEnd={e => { if (start.current === null)
        return; const diff = e.changedTouches[0].clientX - start.current; if (Math.abs(diff) > 45) {
        setPaused(true);
        step(diff < 0 ? 1 : -1);
    } start.current = null; }}>
   {items.map((item, i) => { let offset = (i - current + total) % total; if (offset > total / 2)
        offset -= total; const center = offset === 0; return <motion.button type="button" key={item.id} className={`scent-slide ${center ? 'is-center' : ''}`} tabIndex={center ? 0 : -1} aria-label={center ? `Explore ${item.name}` : `Show ${item.name}`} aria-hidden={Math.abs(offset) > 2} onClick={() => { setPaused(true); center ? onCtaClick(item) : setIndex(i); }} initial={false} animate={{ x: `${offset * 74}%`, scale: center ? 1 : Math.abs(offset) === 1 ? .78 : .57, rotateY: offset * -19, opacity: Math.abs(offset) > 2 ? 0 : Math.abs(offset) === 2 ? .35 : .65 + (center ? .35 : 0) }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 150, damping: 24 }} style={{ zIndex: 10 - Math.abs(offset), pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto' }}><img src={item.slug === 'khamrah' ? '/assets/khamrah-cutout.png' : item.image} alt={item.name} width="500" height="500" loading="lazy" draggable="false"/><span className="slide-plus"><Plus size={22}/></span></motion.button>; })}
  </div>
  <div className="coverflow-bottom"><div className="coverflow-copy" aria-live={paused ? 'polite' : 'off'}><h3>{active.name}</h3><p>{active.notes.heart.slice(0, 3).join(', ') || 'Discover the fragrance'} <span className="price-inline">{money(active.price)}</span></p></div><div className="carousel-controls"><Button variant="secondary" size="icon" aria-label="Previous fragrance" onClick={() => { setPaused(true); step(-1); }}><ArrowLeft size={20}/></Button><span className="carousel-position" aria-label={`${current + 1} of ${total}`}>{current + 1} / {total}</span><Button variant="secondary" size="icon" aria-label="Next fragrance" onClick={() => { setPaused(true); step(1); }}><ArrowRight size={20}/></Button><Button variant="ghost" size="icon" disabled={Boolean(reduced)} aria-label={paused ? 'Play fragrance slideshow' : 'Pause fragrance slideshow'} onClick={togglePlayback}>{paused ? <Play size={16}/> : <Pause size={16}/>}</Button></div></div>
 </div>;
}
export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
