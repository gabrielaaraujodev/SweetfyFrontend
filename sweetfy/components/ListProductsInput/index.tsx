import { Product } from "../Cards/OrderCard";
import { TextCost } from "../Cards/OrderCard/style";

export type ListProductsInputProps = {
    items: Product[];
}

export const ListProductsInput = ({items}: ListProductsInputProps) => {
    return <TextCost>Piru</TextCost>
}