import type { ImageMetadata } from "astro";
import heroKitchen from "../assets/concepts/hero-kitchen.jpg";
import backsplashBefore from "../assets/concepts/backsplash-before.jpg";
import backsplashAfter from "../assets/concepts/backsplash-after.jpg";
import kitchenBefore from "../assets/concepts/kitchen-before.jpg";
import kitchenAfter from "../assets/concepts/kitchen-after.jpg";
import houseExterior from "../assets/concepts/house-exterior.jpg";
import cabinets from "../assets/concepts/cabinets.jpg";
import countertops from "../assets/concepts/countertops.jpg";
import herringbone from "../assets/concepts/herringbone.jpg";
import island from "../assets/concepts/island.jpg";
import stonePatio from "../assets/concepts/stone-patio.jpg";
import landscapedBed from "../assets/concepts/landscaped-bed.jpg";
import outdoorFire from "../assets/concepts/outdoor-fire.jpg";

export const conceptImages: Record<string, ImageMetadata> = {
  "hero-kitchen": heroKitchen,
  "backsplash-before": backsplashBefore,
  "backsplash-after": backsplashAfter,
  "kitchen-before": kitchenBefore,
  "kitchen-after": kitchenAfter,
  "house-exterior": houseExterior,
  cabinets,
  countertops,
  herringbone,
  island,
  "stone-patio": stonePatio,
  "landscaped-bed": landscapedBed,
  "outdoor-fire": outdoorFire,
};
