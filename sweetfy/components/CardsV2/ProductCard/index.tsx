import { IProduct } from '@/api/register/types';
import {
  ContainerCardProduct,
  ContainerPrice,
} from '@/components/Cards/ProductCard/style';
import { P_semi, P_medium, Label, H5 } from '@/theme/fontsTheme';
import { theme } from '@/theme/theme';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';

interface IProductCard {
  productData: IProduct;
  selectCardFunction?(): void;
  selected?: boolean;
}

const ProductCard = ({
  productData,
  selectCardFunction,
  selected,
}: IProductCard) => {
  return (
    <ContainerCardProduct
      onPress={selectCardFunction}
      isSelected={selected}
    >
      <H5 colorKey="darkBrown">{productData.name}</H5>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <P_semi
          colorKey="darkBrown"
          style={{ maxWidth: '45%' }}
        >
          Rendimento total
        </P_semi>
        <P_medium colorKey="darkBrown">
          {productData.productRecipes.reduce(
            (acc, item) => acc + item.quantity,
            0
          )}{' '}
          unid.(s)
        </P_medium>
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <P_semi
          colorKey="darkBrown"
          style={{ maxWidth: '45%' }}
        >
          Preço de venda
        </P_semi>

        <P_medium colorKey="darkBrown">R${productData.salePrice}</P_medium>
      </View>

      <ContainerPrice>
        <View style={{ flexDirection: 'row', gap: 2 }}>
          <Icon
            source="arrow-down-circle"
            size={12}
            color={theme.colors.red}
          />
          <Label colorKey="red">R${productData.baseCost}</Label>
        </View>

        <View style={{ flexDirection: 'row', gap: 2 }}>
          <Icon
            source="arrow-up-circle"
            size={12}
            color={theme.colors.green}
          />
          <Label colorKey="green">R${productData.profitAmount}</Label>
          <Label colorKey="green">({productData.profitPercent}%)</Label>
        </View>
      </ContainerPrice>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          flexWrap: 'wrap',
        }}
      >
        {productData.productRecipes.length > 0 &&
          productData.productRecipes.map((productRecipe, index) => (
            <Label
              style={{
                backgroundColor: theme.colors.white,
                padding: 5,
                borderRadius: 7,
                justifyContent: 'center',
              }}
              key={index}
              colorKey="pinkRed"
            >
              {productRecipe.recipeName}
            </Label>
          ))}
      </View>
    </ContainerCardProduct>
  );
};

export default ProductCard;
