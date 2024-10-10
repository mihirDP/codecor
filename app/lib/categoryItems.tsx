import { CaseSensitive, Component, LayoutPanelTop, Shapes } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  map(arg0: (item: any) => import("react").JSX.Element): ReactNode;
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categoryItems: iAppProps = [
  {
    id: 0,
    name: "template",
    title: "Templates",
    image: <LayoutPanelTop />,
  },
  {
    id: 1,
    name: "ui",
    title: "UI",
    image: <Component />,
  },
  {
    id: 2,
    name: "icons",
    title: "Icons",
    image: <Shapes />,
  },
  {
    id: 3,
    name: "fonts",
    title: "Fonts",
    image: <CaseSensitive />,
  },
];
