import { Lato, Michroma } from "next/font/google";

export const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});
export const michroma = Michroma({
  variable: "--font-lato",
  weight: ["400"],
  subsets: ["latin"],
});
