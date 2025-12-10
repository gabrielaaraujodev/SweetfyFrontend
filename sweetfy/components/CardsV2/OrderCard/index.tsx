import { IOrder } from '@/api/register/types';
import { ContainerCardOrder } from '@/components/Cards/OrderCard/style';
import { H5, Label, P, P_medium, P_semi } from '@/theme/fontsTheme';
import { theme } from '@/theme/theme';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';

interface IOrderCard {
  orderData: IOrder;
  selectCardFunction?(): void;
  selected?: boolean;
}
const OrderCard = ({ orderData, selected, selectCardFunction }: IOrderCard) => {
  return (
    <ContainerCardOrder
      onPress={selectCardFunction}
      isSelected={selected}
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <H5 colorKey="darkBrown">{orderData.name} </H5>
        <View
          style={{
            backgroundColor: theme.colors.green,
            padding: 5,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
            gap: 5,
          }}
        >
          <Icon
            size={12}
            color={theme.colors.white}
            source="sack-percent"
          />
          <Label colorKey="white">
            {((orderData.profit / orderData.totalCost) * 100).toFixed(2)}%
          </Label>
        </View>
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
          Rendimento total
        </P_semi>
        <P colorKey="darkBrown">{orderData.totalYield} unid.(s)</P>
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
        <P colorKey="darkBrown">R$ {orderData.salePrice}</P>
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
        <P_medium
          colorKey="red"
          style={{ maxWidth: '45%' }}
        >
          Custo total
        </P_medium>
        <P colorKey="red">R$ {orderData.totalCost}</P>
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
        <P_medium
          colorKey="green"
          style={{ maxWidth: '45%' }}
        >
          Lucro total
        </P_medium>
        <P colorKey="green">R$ {orderData.profit}</P>
      </View>

      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          flexWrap: 'wrap',
        }}
      >
        {orderData.orderProducts.length > 0 &&
          orderData.orderProducts.map((orderProduct, index) => (
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
              {orderProduct.quantity} x {orderProduct.productName}
            </Label>
          ))}
      </View>
    </ContainerCardOrder>
  );
};

export default OrderCard;
