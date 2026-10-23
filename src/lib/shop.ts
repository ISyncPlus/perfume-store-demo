import catalog from '@/data/catalog.json';
export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    currency: string;
    inStock: boolean;
    purchasable: boolean;
    url: string;
    image: string;
    images: string[];
    description: string;
    shortDescription: string;
    notes: {
        top: string[];
        heart: string[];
        base: string[];
    };
    categories: string[];
    tags: string[];
}
const displayImages: Record<string, string> = { 'khamrah': '/assets/khamrah-cutout.png', 'fakhar-lattafa-men': '/assets/fakhar-black-cutout.png', 'fakhar-lattafa-women': '/assets/fakhar-rose-cutout.png' };
export const products = (catalog as unknown as Product[]).map(p => ({ ...p, image: displayImages[p.slug] ?? p.image }));
export const money = (value: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
export const findProduct = (slug: string) => products.find(p => p.slug === slug)!;
export const curatedSlugs = ['khamrah', 'fakhar-lattafa-men', 'fakhar-lattafa-women', 'yara-tous-2', 'angham', 'nebras', 'eclaire', 'yara'];
export const curated = curatedSlugs.map(findProduct).filter(Boolean);
export const moodWords: Record<string, string[]> = { All: [], Warm: ['amber', 'vanilla', 'cinnamon', 'tonka', 'khamrah', 'cacao'], Floral: ['rose', 'jasmine', 'tuberose', 'flower', 'blossom'], Fresh: ['citrus', 'marine', 'bergamot', 'lemon', 'mint'], Woody: ['wood', 'oud', 'patchouli', 'vetiver', 'moss'] };
export function matchesMood(p: Product, mood: string) { const words = moodWords[mood] ?? []; const text = [p.name, p.shortDescription, p.description, ...p.notes.top, ...p.notes.heart, ...p.notes.base].join(' ').toLowerCase(); return !words.length || words.some(w => text.includes(w)); }
export interface BagLine {
    id: number;
    quantity: number;
}
export function readBag(value: string | null): BagLine[] { try {
    const data: unknown = JSON.parse(value ?? '[]');
    if (!Array.isArray(data))
        return [];
    const seen = new Set<number>();
    return data.filter((line): line is BagLine => { if (!line || typeof line !== 'object')
        return false; const { id, quantity } = line; if (!Number.isInteger(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 10 || seen.has(id) || !products.some(p => p.id === id && p.inStock && p.purchasable))
        return false; seen.add(id); return true; }).map(({ id, quantity }) => ({ id, quantity }));
}
catch {
    return [];
} }
export function addToBag(bag: BagLine[], product: Product): BagLine[] { if (!product.inStock || !product.purchasable)
    return bag; const existing = bag.find(l => l.id === product.id); return existing ? bag.map(l => l.id === product.id ? { ...l, quantity: Math.min(10, l.quantity + 1) } : l) : [...bag, { id: product.id, quantity: 1 }]; }
export function bagTotal(bag: BagLine[]) { return bag.reduce((sum, l) => sum + (products.find(p => p.id === l.id)?.price ?? 0) * l.quantity, 0); }
export function orderEmail(bag: BagLine[]) { const lines = bag.map(l => { const p = products.find(p => p.id === l.id)!; return `${p.name} × ${l.quantity} — ${money(p.price * l.quantity)}\n${p.url}`; }); return `mailto:support@lattafang.com?subject=${encodeURIComponent('Fragrance availability and order enquiry')}&body=${encodeURIComponent(`Hello Lattafa Nigeria,\n\nPlease confirm availability and the current total for:\n\n${lines.join('\n\n')}\n\nCatalog subtotal: ${money(bagTotal(bag))}\nPlease let me know the delivery options and how to complete my order.\n\nThank you.`)}`; }
