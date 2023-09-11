export enum CollectionColors {
  sunset = "bg-gradient-to-r from-red-500 to-orange-500",
  poppy = "bg-gradient-to-r from-rose-400 to-red-500",
  rosebud = "bg-gradient-to-r from-violet-500 to-purple-500",
  snowflake = "bg-gradient-to-r from-indigo-400 to-cyan-400",
  candy = "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500",
  firtree = "bg-gradient-to-r from-emerald-500 to-emerald-900",
  metal = "bg-gradient-to-r from-slate-500 to-slate-800",
  powder = "bg-gradient-to-r from-violet-200 to-pink-200",
  ocean = "bg-gradient-to-r from-teal-400 to-blue-500",
  sunshine = "bg-gradient-to-r from-yellow-300 to-orange-400",
  lavender = "bg-gradient-to-r from-purple-400 to-lavender-500",
  midnight = "bg-gradient-to-r from-indigo-800 to-blue-900",
  grass = "bg-gradient-to-r from-green-400 to-lime-500",
  fire = "bg-gradient-to-r from-red-600 to-yellow-400",
  sky = "bg-gradient-to-r from-blue-300 to-lightblue-400",
  orchid = "bg-gradient-to-r from-magenta-500 to-orchid-600",
  earth = "bg-gradient-to-r from-brown-400 to-green-600",
  coral = "bg-gradient-to-r from-coral-400 to-pink-500",
}

export type CollectionColor = keyof typeof CollectionColors;
