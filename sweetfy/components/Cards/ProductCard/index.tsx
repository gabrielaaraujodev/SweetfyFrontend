import { View, Image, ViewStyle, TouchableOpacity } from 'react-native';
import ListIngredientesInput from './ItemsCard/index';
import { Icon } from 'react-native-paper';
import FieldNameAndValue from '../../FieldNameAndValue';
import {
  ContainerWithCheckBox,
  ContainerCard,
  ViewCard,
  TitleCard,
  ContainerPrice,
  ViewPrice,
  TextCost,
  TextProfit,
} from './style';

export interface ProductIngredient {
  ingredientId: number;
  quantity: number;
  unit: string;
}

export interface ProductRecipe {
  recipeId: number;
  quantity: number;
}

export interface ProductService {
  serviceId: number;
  quantity: number;
}

export interface ProductData {
  productId: number;
  name: string;
  preparation: string;
  salePrice: number;
  profitPercent: number;
  productIngredients: ProductIngredient[];
  productRecipes: ProductRecipe[];
  productServices: ProductService[];
  totalCost: number;
  totalProfit: number;
}

interface CardProductProps {
  id: number;
  data: ProductData;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

const CardProduct: React.FC<CardProductProps> = ({
  id,
  showCheckBox,
  checkBoxSelected,
  functionButtonSelected,
  data,
  cardStyle,
}) => {
  const ControllerCheckBox = () => {
    if (!showCheckBox || !functionButtonSelected) {
      return null;
    }

    const iconName = checkBoxSelected
      ? 'checkbox-marked'
      : 'checkbox-blank-outline';

    return (
      <TouchableOpacity onPress={() => functionButtonSelected(id)}>
        <Icon
          source={iconName}
          size={24}
          color="#880741"
        />
      </TouchableOpacity>
    );
  };

  return (
    <ContainerWithCheckBox>
      {ControllerCheckBox()}

      <ContainerCard>
        <ViewCard>
          <TitleCard>{data.name}</TitleCard>

          <View>
            <FieldNameAndValue
              name="Preço de venda:"
              value={data.salePrice}
            />
          </View>
          <ContainerPrice>
            <ViewPrice>
              <TextCost> Custo </TextCost>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('../../../assets/icons/scrollDown.png')}
                />
                <TextCost> {data.totalCost} </TextCost>
              </View>
            </ViewPrice>

            <ViewPrice>
              <TextProfit> Lucro </TextProfit>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('../../../assets/icons/scrollUp.png')}
                />
                <TextProfit> {data.totalProfit} </TextProfit>
              </View>
            </ViewPrice>
          </ContainerPrice>

          <View>
            <ListIngredientesInput items={data.productRecipes} />
          </View>
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardProduct;
