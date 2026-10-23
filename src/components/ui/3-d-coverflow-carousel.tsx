import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
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
function wrapOffset(itemIndex: number, position: number, total: number) {
    return ((itemIndex - position + total / 2) % total + total) % total - total / 2;
}
function fadeOpacity(distance: number) {
    if (distance <= 1)
        return 1 - distance * .35;
    if (distance <= 2)
        return .65 - (distance - 1) * .18;
    return Math.max(0, .47 * (1 - (distance - 2) / 1.05));
}
export function CoverFlowCarousel({ items, onCtaClick, autoplay = true, autoplayDelay = 5200, className = '' }: CoverFlowCarouselProps) {
    const [index, setIndex] = useState(0);
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(!autoplay);
    const [isMobile, setIsMobile] = useState(false);
    const [manualMotion, setManualMotion] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.35 });
    const reduced = useReducedMotion();
    const start = useRef<number | null>(null);
    const total = items.length;
    const current = isMobile ? ((index % total) + total) % total : ((Math.round(position) % total) + total) % total;
    const markManualMotion = () => {
        setManualMotion(true);
        window.setTimeout(() => setManualMotion(false), 760);
    };
    const step = (direction: number) => {
        markManualMotion();
        setIndex(i => (i + direction + total) % total);
        setPosition(p => Math.round(p) + direction);
    };
    const focusItem = (itemIndex: number) => {
        setPaused(true);
        markManualMotion();
        if (isMobile) {
            setIndex(itemIndex);
            setPosition(itemIndex);
            return;
        }
        setPosition(value => value + wrapOffset(itemIndex, value, total));
        setIndex(itemIndex);
    };
    useEffect(() => {
        const media = window.matchMedia('(max-width: 600px)');
        const sync = () => setIsMobile(media.matches);
        sync();
        media.addEventListener?.('change', sync);
        return () => media.removeEventListener?.('change', sync);
    }, []);
    useEffect(() => {
        if (paused || reduced || !inView || total < 2)
            return;
        if (isMobile) {
            const timer = window.setInterval(() => setIndex(i => (i + 1) % total), autoplayDelay);
            return () => window.clearInterval(timer);
        }
        let frame = 0;
        let last = performance.now();
        const glide = (now: number) => {
            const elapsed = Math.min(now - last, 64);
            last = now;
            setPosition(value => (value + elapsed * 0.00012) % total);
            frame = window.requestAnimationFrame(glide);
        };
        frame = window.requestAnimationFrame(glide);
        return () => window.cancelAnimationFrame(frame);
    }, [autoplayDelay, inView, isMobile, paused, reduced, total]);
    if (!total)
        return null;
    const active = items[current];
    const displayPosition = isMobile ? current : position;
    return <div ref={ref} className={`coverflow ${className}`} role="region" aria-roledescription="carousel" aria-label="Fragrance discovery" onMouseEnter={() => { if (!isMobile) setPaused(true); }} onMouseLeave={() => { if (!isMobile && autoplay) setPaused(false); }} onKeyDown={e => { if (e.key === 'ArrowRight') {
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
   {items.map((item, i) => { const offset = wrapOffset(i, displayPosition, total); const distance = Math.abs(offset); const center = i === current; const scale = distance < 1 ? 1 - distance * .22 : distance < 2 ? .78 - (distance - 1) * .21 : .57; const opacity = fadeOpacity(distance); const travel = isMobile ? 74 : 105; return <motion.button type="button" key={item.id} className={`scent-slide ${center ? 'is-center' : ''}`} tabIndex={center ? 0 : -1} aria-label={center ? `Explore ${item.name}` : `Show ${item.name}`} aria-hidden={distance > 3} onClick={() => center ? onCtaClick(item) : focusItem(i)} initial={false} animate={{ x: `${offset * travel}%`, scale, rotateY: offset * -19, opacity }} transition={reduced ? { duration: 0 } : { duration: isMobile ? .72 : manualMotion ? .72 : .04, ease: 'easeOut' }} style={{ zIndex: Math.round(10 - distance), pointerEvents: distance > 3 ? 'none' : 'auto' }}><img src={item.image} alt={item.name} width="500" height="500" loading="lazy" draggable="false"/><span className="slide-plus"><Plus size={22}/></span></motion.button>; })}
  </div>
  <div className="coverflow-bottom"><div className="coverflow-copy" aria-live={paused ? 'polite' : 'off'}><AnimatePresence mode="wait" initial={false}><motion.div key={active.id} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }} transition={{ duration: reduced ? 0 : .32, ease: [0.16, 1, 0.3, 1] }}><h3>{active.name}</h3><p>{active.notes.heart.slice(0, 3).join(', ') || 'Discover the fragrance'} <span className="price-inline">{money(active.price)}</span></p></motion.div></AnimatePresence></div><div className="carousel-controls"><Button variant="secondary" size="icon" aria-label="Previous fragrance" onClick={() => { setPaused(true); step(-1); }}><ArrowLeft size={20}/></Button><span className="carousel-position" aria-label={`${current + 1} of ${total}`}>{current + 1} / {total}</span><Button variant="secondary" size="icon" aria-label="Next fragrance" onClick={() => { setPaused(true); step(1); }}><ArrowRight size={20}/></Button><Button className="carousel-play" variant="ghost" size="icon" disabled={Boolean(reduced)} aria-label={paused ? 'Play fragrance slideshow' : 'Pause fragrance slideshow'} onClick={() => { if (paused && isMobile) step(1); setPaused(value => !value); }}>{paused ? <Play size={16}/> : <Pause size={16}/>}</Button></div></div>
 </div>;
}
export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
