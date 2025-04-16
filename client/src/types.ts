import { ReactNode } from "react";

export interface NavigateItemProp {
  children: ReactNode;
  to: string;
}

export interface ProductCardInterface {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}
