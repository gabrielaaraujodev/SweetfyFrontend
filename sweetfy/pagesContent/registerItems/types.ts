import { IDropdownItem } from "@/components/Dropdown/types";

export enum UnitTypeEnum {
  Grama = 1,          
  Quilograma = 2,
  Mililitro = 3,
  Litro = 4,
  Unidade = 5,
  ColherDeSopa = 6,
  ColherDeCha = 7,
  Xicara = 8,
  Hora = 9
}

export type pageType = 'create' | 'edit';

export const ingredientRegisterUnitOptions: IDropdownItem[] = [
  { label: 'grama(s) / g', value: UnitTypeEnum.Grama },
  { label: 'quilograma(s) / kg', value: UnitTypeEnum.Quilograma },
  { label: 'mililitro(s) / ml', value: UnitTypeEnum.Mililitro },
  { label: 'litros(s) / L', value: UnitTypeEnum.Litro },
  { label: 'unidade(s) / unid.', value: UnitTypeEnum.Unidade },
  { label: 'colher(es) de sopa', value: UnitTypeEnum.ColherDeSopa },
  { label: 'colher(es) de chá', value: UnitTypeEnum.ColherDeCha },
  { label: 'xícara(s)', value: UnitTypeEnum.Xicara },
];

export const serviceRegisterUnitOptions: IDropdownItem[] = [
  { label: 'unidade', value: UnitTypeEnum.Unidade },
  { label: 'hora trabalhada', value: UnitTypeEnum.Hora },
];

