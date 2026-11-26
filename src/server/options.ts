export const projectTypes = [
  { value: "full-kitchen-remodels", label: "Full kitchen remodel" },
  { value: "backsplash-installation", label: "Backsplash installation" },
  { value: "cabinets", label: "Cabinets — new or refacing" },
  { value: "countertops", label: "Countertops" },
  { value: "kitchen-islands-layout", label: "Kitchen island or layout change" },
  { value: "lighting-finishing", label: "Lighting and finishing" },
  { value: "landscape-design-installation", label: "Landscape design & installation" },
  { value: "trees-shrubs-roses", label: "Trees, shrubs, roses & planting" },
  { value: "limestone-walls-stonework", label: "Limestone walls & stonework" },
  { value: "patios-hardscaping-outdoor-living", label: "Patio, hardscape & outdoor living" },
  { value: "fire-features", label: "Fire feature or fire deck" },
  { value: "specialty-stone-water", label: "Specialty pebble, stone or water feature" },
  { value: "interior-exterior", label: "Interior–exterior / whole property" },
  { value: "unsure", label: "Not sure yet / more than one of these" },
] as const;

export const budgets = [
  { value: "under-5000", label: "Under $5,000" },
  { value: "5000-15000", label: "$5,000 – $15,000" },
  { value: "15000-40000", label: "$15,000 – $40,000" },
  { value: "40000-plus", label: "$40,000 or more" },
  { value: "discuss", label: "I'd rather discuss it" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "either", label: "Either phone or email" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];
export type Budget = (typeof budgets)[number]["value"];
export type ContactMethod = (typeof contactMethods)[number]["value"];

export function projectTypeLabel(value: string): string {
  return projectTypes.find((item) => item.value === value)?.label ?? value;
}

export function budgetLabel(value: string): string {
  return budgets.find((item) => item.value === value)?.label ?? value;
}

export function contactMethodLabel(value: string): string {
  return contactMethods.find((item) => item.value === value)?.label ?? value;
}
