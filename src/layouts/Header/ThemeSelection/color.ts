export type ColorIcon = {
  description: string;
  photo: string;
  background: string;
  range: string;
  colorIcon?: string;
};
export const colorIcons: ColorIcon[] = [
  {
    description: "White",
    photo: "/src/assets/img/imgColor/white.svg",
    background: "white",
    range: "lightgrey",
    colorIcon: "var(--Gray-6, #7E7E7E)",
  },
  {
    description: "Black",
    photo: "/src/assets/img/imgColor/black.svg",
    background: "black",
    range: "white",
    colorIcon: "white",
  },
  {
    description: "Gray",
    photo: "/src/assets/img/imgColor/gray.svg",
    background: "var(--Gray-3, #D7D7D7)",
    range: "white",
    colorIcon: "black"
  },
  {
    description: "Higgs",
    photo: "/src/assets/img/imgColor/higgs.svg",
    background: "black",
    range: "white",
    colorIcon: "white"
  },
];
