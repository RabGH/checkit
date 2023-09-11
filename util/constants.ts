export enum CollectionColors {
  Sunset = "bg-gradient-to-r from-red-500 to-orange-500",
  Poppy = "bg-gradient-to-r from-rose-400 to-red-500",
  Rosebud = "bg-gradient-to-r from-violet-500 to-purple-500",
  Snowflake = "bg-gradient-to-r from-indigo-400 to-cyan-400",
  Candy = "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500",
  Firtree = "bg-gradient-to-r from-emerald-500 to-emerald-900",
  Metal = "bg-gradient-to-r from-slate-500 to-slate-800",
  Powder = "bg-gradient-to-r from-violet-200 to-pink-200",
  Ocean = "bg-gradient-to-r from-teal-400 to-blue-500",
  Sunshine = "bg-gradient-to-r from-yellow-300 to-orange-400",
  Lavender = "bg-gradient-to-r from-purple-400 to-lavender-500",
  Midnight = "bg-gradient-to-r from-indigo-800 to-blue-900",
  Grass = "bg-gradient-to-r from-green-400 to-lime-500",
  Fire = "bg-gradient-to-r from-red-600 to-yellow-400",
  Sky = "bg-gradient-to-r from-blue-300 to-lightblue-400",
}

export type CollectionColor = keyof typeof CollectionColors;
