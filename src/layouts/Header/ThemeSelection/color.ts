export type ColorIcon = {
  description: string;
  photo: string;
  background: string;
  range: string;
  colorIcon?: string;
  sentIcon?: string;
  boxShadow?: string;
};
export const colorIcons: ColorIcon[] = [
  {
    description: "White",
    photo: "/src/assets/img/imgColor/white.svg",
    background: "white",
    range: "lightgrey",
    colorIcon: "var(--Gray-6, #7E7E7E)",
    sentIcon: "/src/assets/img/sent-gray.svg",
    boxShadow: '0 0 15px rgba(92, 92, 92, 0.56)'
  },
  {
    description: "Black",
    photo: "/src/assets/img/imgColor/black.svg",
    background: "black",
    range: "white",
    colorIcon: "white",
    sentIcon: "/src/assets/img/sent-white.svg",
    boxShadow: '0 0 15px rgb(255, 253, 253)'
  },
  {
    description: "Gray",
    photo: "/src/assets/img/imgColor/gray.svg",
    background: "var(--Gray-3, #D7D7D7)",
    range: "white",
    colorIcon: "black",
    sentIcon: "/src/assets/img/sent-black.svg",
    boxShadow: '0 0 15px rgba(92, 92, 92, 0.56)'
  },
  {
    description: "Higgs",
    photo: "/src/assets/img/imgColor/higgs.svg",
    background: "black",
    range: "white",
    colorIcon: "white",
    sentIcon: "/src/assets/img/sent-gold.svg",
    boxShadow: '0 0 15px rgb(255, 253, 253)'
  },
];
