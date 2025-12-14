export type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number; // ex: 500 = 5,00 €
  image: string; // chemin public
};

export const products: Product[] = [
  {
    id: "nougat-cacahuetes",
    title: "Nougat de cacahuètes Sénégal",
    description: "Très bon nougat délicieux à base de cacahuètes salé et sucré.",
    priceCents: 500,
    image: "/products/nougat.png",
  },
  {
    id: "mbourake-500g",
    title: "Mbourake pot 500G",
    description: "Très bon produit fait à base de pain, pâte d'arachide et sucre mixé.",
    priceCents: 500,
    image: "/products/mbourake.png",
  },
  {
    id: "poudre-bissap-1kg",
    title: "Poudre de Bissap 1kg",
    description: "Très bon produit pour vos jus de bissap.",
    priceCents: 1500,
    image: "/products/bissap.png",
  },
  {
    id: "pate-ditakh-1kg",
    title: "Pâte de ditakh 1kg",
    description: "Pâte de ditakh fraîche et naturelle pour vos jus de ditakh.",
    priceCents: 2400,
    image: "/products/ditakh.png",
  },

  // 🆕 NOUVEAUX PRODUITS

  {
    id: "araw-1kg",
    title: "Araw 1Kg",
    description:
      "Très bon produit céréale, propre, sans poussière ni cailloux, soigneusement sélectionné.",
    priceCents: 1200,
    image: "/products/araw.png",
  },
  {
    id: "thiakry-1kg",
    title: "Thiakry 1Kg",
    description:
      "Produit céréale de qualité, très propre, sans poussière ni cailloux, prêt à l’utilisation.",
    priceCents: 1200,
    image: "/products/thakry.png",
  },
  {
    id: "couscous-thiere-laalo-1kg",
    title: "Couscous (Thiéré Laalo) 1Kg",
    description:
      "Céréale traditionnelle très propre, sans poussière ni cailloux, idéale pour vos repas.",
    priceCents: 1200,
    image: "/products/couscous.png",
  },
  {
    id: "sirop-tamarin-1l",
    title: "Sirop de Tamarin 1L",
    description:
      "Composition: eau, tamarin et sucre. Utilisation: jusqu’à 6 litres de jus selon le dosage.",
    priceCents: 1300,
    image: "/products/siro_tamarin.png",
  },
  {
    id: "sirop-bissap-rouge-1l",
    title: "Sirop de Bissap Rouge 1L",
    description:
      "Composition: eau, feuilles de bissap rouge et sucre. Utilisation: jusqu’à 6 litres de jus.",
    priceCents: 1300,
    image: "/products/siro_bissap.png",
  },
];
