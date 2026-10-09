export type JuiceLayout = "capsule" | "sunburst" | "arch";

export type Juice = {
  slug: string;
  name: string;
  personality: string;
  blurb: string;
  description: string;
  ingredients: string[];
  size: string;
  price: number;
  image: string;
  overlap: string;
  overlapAlt: string;
  layout: JuiceLayout;
};

export type IngredientShape = "specimen" | "arch" | "window-leaf" | "window-capsule" | "window-segment" | "collage";

export type Ingredient = {
  id: string;
  index: string;
  name: string;
  descriptor: string;
  note: string;
  body: string;
  image: string;
  macro: string;
  shape: IngredientShape;
  usedIn: string[];
};

export type Article = {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
};

export type Note = {
  id: string;
  quote: string;
  name: string;
  image: string;
};

export const PRICE_NOTE = "Placeholder price in rupees — not a confirmed shop price.";
export const RECIPE_NOTE =
  "Concept recipes for this Indian press. Check every ingredient, allergen, and shelf life before a real bottle is sold.";
export const DELIVERY_NOTE =
  "Sketched for Mumbai, Bengaluru, Delhi, and Hyderabad. This demo does not deliver, and it does not take UPI, cards, or cash.";
export const STORAGE_NOTE =
  "Keep cold once opened — that is the only honest note we will print. Shelf life in an Indian summer is not verified here.";
export const ALLERGEN_NOTE =
  "These concept blends list no added dairy, gluten, or nuts. That is not a lab-checked allergen panel. Confirm it before any real production in India.";

export const juices: Juice[] = [
  {
    slug: "green-ritual",
    name: "Green Ritual",
    personality: "Fresh, crisp, like a cool kheera morning.",
    blurb: "Kheera, green apple, palak, nimbu, and adrak — a clean green with a quiet bite.",
    description:
      "A cold-pressed green meant to taste like the sabzi mandi, not a powder. Kheera keeps it long and cool, apple brings a crisp sweetness, and adrak stays in the background.",
    ingredients: ["Cucumber (kheera)", "Green apple (seb)", "Spinach (palak)", "Lemon (nimbu)", "Ginger (adrak)"],
    size: "250 ml",
    price: 249,
    image: "/images/bottle-green.jpg",
    overlap: "/images/cut-green.jpg",
    overlapAlt: "/images/apple.jpg",
    layout: "capsule",
  },
  {
    slug: "citrus-glow",
    name: "Citrus Glow",
    personality: "Bright, sunny, mosambi-and-haldi.",
    blurb: "Santara, pineapple, nimbu, haldi, and gajar — sunny, with a warm Indian edge.",
    description:
      "A brighter bottle for late morning, the hour after chai. Orange and pineapple lead, nimbu sharpens the finish, and haldi with gajar keeps the colour honest.",
    ingredients: ["Orange (santara)", "Pineapple", "Lemon (nimbu)", "Turmeric (haldi)", "Carrot (gajar)"],
    size: "250 ml",
    price: 279,
    image: "/images/bottle-citrus.jpg",
    overlap: "/images/cut-citrus.jpg",
    overlapAlt: "/images/citrus.jpg",
    layout: "sunburst",
  },
  {
    slug: "ruby-reset",
    name: "Ruby Reset",
    personality: "Juicy, vivid, tarbooz-first.",
    blurb: "Tarbooz, strawberry, apple, pudina, and nimbu — juicy without the sherbet syrup.",
    description:
      "The reddest of the three, and the most straightforward. Tarbooz carries it the way a summer slice should, strawberry rounds the middle, and pudina with nimbu keep it from sitting heavy.",
    ingredients: ["Watermelon (tarbooz)", "Strawberry", "Apple", "Mint (pudina)", "Lemon (nimbu)"],
    size: "250 ml",
    price: 259,
    image: "/images/bottle-ruby.jpg",
    overlap: "/images/cut-ruby.jpg",
    overlapAlt: "/images/watermelon.jpg",
    layout: "arch",
  },
];

export const ingredients: Ingredient[] = [
  {
    id: "green-apple",
    index: "01",
    name: "Green Apple",
    descriptor: "Crisp. Bright. Seb.",
    note: "The clean sweet note in Green Ritual, and a lift in Ruby Reset.",
    body: "Seb, when a blend needs sweetness that still tastes like fruit. Skin-on character, not a mithai finish. You should know it from the first sip.",
    image: "/images/apple.jpg",
    macro: "/images/cut-green.jpg",
    shape: "specimen",
    usedIn: ["green-ritual", "ruby-reset"],
  },
  {
    id: "cucumber",
    index: "02",
    name: "Cucumber",
    descriptor: "Cool. Clean. Kheera.",
    note: "Lengthens Green Ritual and keeps the bottle light.",
    body: "Kheera is there for length and temperature, the way it is in a summer salad. It makes the green blend feel like something you would actually drink with lunch.",
    image: "/images/cucumber.jpg",
    macro: "/images/spinach.jpg",
    shape: "window-leaf",
    usedIn: ["green-ritual"],
  },
  {
    id: "avocado",
    index: "03",
    name: "Avocado",
    descriptor: "Soft. Plush. Testing.",
    note: "In the kitchen trials. Not in the three signature bottles.",
    body: "Makhanphal is on the bench for texture, not for the current signatures. If it earns a place, it will be a limited blend — not slipped quietly into the daily three.",
    image: "/images/avocado.jpg",
    macro: "/images/cut-green.jpg",
    shape: "collage",
    usedIn: [],
  },
  {
    id: "spinach",
    index: "04",
    name: "Spinach",
    descriptor: "Leafy. Steady. Palak.",
    note: "Colour and quiet greens inside Green Ritual.",
    body: "Palak is used for the leaf, not as a disguise. The amount stays low enough that seb and kheera still lead the glass.",
    image: "/images/spinach.jpg",
    macro: "/images/cut-green.jpg",
    shape: "window-capsule",
    usedIn: ["green-ritual"],
  },
  {
    id: "citrus",
    index: "05",
    name: "Citrus",
    descriptor: "Bright. Sunny. Nimbu.",
    note: "Santara, nimbu, and a little pineapple across the range.",
    body: "Citrus is the house sharpener. Santara leads Citrus Glow. Nimbu appears, more quietly, in all three signatures — the same lemon you would squeeze over a plate.",
    image: "/images/citrus.jpg",
    macro: "/images/cut-citrus.jpg",
    shape: "window-segment",
    usedIn: ["citrus-glow", "green-ritual", "ruby-reset"],
  },
  {
    id: "watermelon",
    index: "06",
    name: "Watermelon",
    descriptor: "Juicy. Vivid. Tarbooz.",
    note: "The heart of Ruby Reset.",
    body: "Tarbooz only works if it tastes like the slice from a summer cart. The blend stays short so strawberry and pudina support it instead of covering it.",
    image: "/images/watermelon.jpg",
    macro: "/images/cut-ruby.jpg",
    shape: "arch",
    usedIn: ["ruby-reset"],
  },
];

export const articles: Article[] = [
  {
    slug: "pressed-not-performed",
    kicker: "Notebook 01",
    title: "Pressed, not performed.",
    excerpt: "Cold-pressed is a method, not a personality. Here is what we mean by it on an Indian morning — and what we refuse to imply.",
    image: "/images/moss.jpg",
    body: [
      "Cold-pressed, for us, means the fruit is crushed and pressed without heat as a shortcut to yield. It is a kitchen choice. It is not a promise that a bottle will fix the week between meetings.",
      "The juice should taste like ingredients you can name at the market: kheera, palak, nimbu, tarbooz. If a blend only works once it is perfumed, sweetened, or tinted, it does not belong in the range.",
      "We would rather print a short recipe than a long claim. The three signatures on this site are concept recipes. Before anything is sold in Mumbai, Bengaluru, Delhi, or Hyderabad, the lists, the allergens, and the shelf life have to be checked in a real kitchen — not in a layout.",
    ],
  },
  {
    slug: "the-green-we-kept",
    kicker: "Notebook 02",
    title: "The green we kept.",
    excerpt: "Why kheera and seb stayed, and why the bottle is not a salad in disguise.",
    image: "/images/apple.jpg",
    body: [
      "Green juice in India often tastes like a task you owe your morning. Green Ritual is meant to taste like a cold piece of fruit that happens to be green.",
      "Kheera makes the drink longer. Seb keeps the sweetness recognisable. Palak is present, then nimbu and adrak draw a thin line under it. Nothing in the bottle is there to hide something else.",
      "Avocado is intentionally absent. We like it, and we are still testing whether it makes the drink better or just thicker in the heat. Until that is obvious, it stays out.",
    ],
  },
  {
    slug: "leave-it-out",
    kicker: "Notebook 03",
    title: "Leave it out.",
    excerpt: "A short argument for fewer ingredients, and for saying so on the label in plain language.",
    image: "/images/paper.jpg",
    body: [
      "The easiest way to make a juice taste finished is to add something. Sugar. A flavour. A colour. We would rather stop early, the way a good home cook stops when the nimbu is enough.",
      "Nothing unnecessary is not a slogan pasted over a complicated recipe. It is the edit: if an ingredient does not earn its place in the glass, it does not get a line on the label.",
      "That is also why this site separates the press from the sale. The cart is a working demonstration on your device. It does not check out, ship, or take UPI. When the recipes are real, the labels will say so plainly.",
    ],
  },
];

export const notes: Note[] = [
  {
    id: "n1",
    quote: "A placeholder line for the green bottle — crisp, not grassy, easy to finish before the local arrives.",
    name: "Placeholder · Meera, Bandra — not a verified review",
    image: "/images/apple.jpg",
  },
  {
    id: "n2",
    quote: "Placeholder note for the citrus blend: sunny, with enough nimbu to keep it awake after chai.",
    name: "Placeholder · Arjun, Indiranagar — not a verified review",
    image: "/images/citrus.jpg",
  },
  {
    id: "n3",
    quote: "Placeholder note for the ruby blend: tarbooz first, pudina as a finish, not a costume.",
    name: "Placeholder · Kavya, Jubilee Hills — not a verified review",
    image: "/images/watermelon.jpg",
  },
  {
    id: "n4",
    quote: "Placeholder line about the habit, not a miracle: one bottle, most mornings, no ceremony.",
    name: "Placeholder · Rohan, GK — not a verified review",
    image: "/images/cucumber.jpg",
  },
];

export const ticker = [
  "Seb",
  "Kheera",
  "Palak",
  "Nimbu",
  "Adrak",
  "Santara",
  "Haldi",
  "Gajar",
  "Tarbooz",
  "Pudina",
];

export const faqs = [
  {
    q: "Do you deliver?",
    a: "Not from this demo. The press is drawn for Mumbai, Bengaluru, Delhi, and Hyderabad. No pin code is served, and the cart never sends an order.",
  },
  {
    q: "Can I pay with UPI?",
    a: "No. This demonstration does not take UPI, cards, netbanking, or cash. The total in rupees is a placeholder.",
  },
  {
    q: "Are the recipes final?",
    a: "No. Green Ritual, Citrus Glow, and Ruby Reset are concept recipes. Verify every ingredient before selling a bottle in India.",
  },
  {
    q: "How should a bottle be kept in the heat?",
    a: "Cold, once opened. We are not printing a shelf-life number for an Indian summer until it has been tested.",
  },
  {
    q: "Are there allergens?",
    a: "The concept blends list no added dairy, gluten, or nuts. That is not a lab-verified panel. Confirm it before any real production.",
  },
  {
    q: "Is the newsletter real?",
    a: "The form saves your note in this browser only. It does not join a mailing list or send a WhatsApp message.",
  },
];

export function getJuice(slug: string) {
  return juices.find((juice) => juice.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
