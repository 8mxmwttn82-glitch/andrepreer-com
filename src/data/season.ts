export type SeasonEmphasis = "interior" | "exterior";

/**
 * Home-page emphasis.
 * "interior" leads with kitchens and backsplash (winter).
 * Change this one value to "exterior" in spring. Nav order and the home
 * hero follow it. Service pages themselves do not change.
 */
export const seasonEmphasis: SeasonEmphasis = "exterior";

export function seasonalNav(emphasis: SeasonEmphasis = seasonEmphasis) {
  const groups =
    emphasis === "interior"
      ? [
          { href: "/services/#kitchens", label: "Kitchens" },
          { href: "/services/#exterior", label: "Exterior" },
        ]
      : [{ href: "/services/", label: "Services" }];
  return [
    ...groups,
    { href: "/portfolio/", label: "Work" },
    { href: "/process/", label: "Process" },
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ];
}
