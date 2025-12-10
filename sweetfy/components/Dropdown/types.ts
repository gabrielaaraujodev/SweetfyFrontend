import { Categoty } from "@/pagesContent/registerItems/products";
import { UnitTypeEnum } from "../../pagesContent/registerItems/types";

export interface IDropdownItem {
  label: string;
  value: string | number;
}

export interface ICustomDropdownItem{
  label: string;
  value: number;
  itemInitialQuantity: number,
  quantityUnit: UnitTypeEnum,
  unitPrice: number,
  category: Categoty,
}
