import { ReactNode } from "react";

export interface NavigateItemProp {
  children: ReactNode;
  to: string;
}

export interface ProductCardInterface {
  title: string;
  price: number;
  imgUrl: string;
}
