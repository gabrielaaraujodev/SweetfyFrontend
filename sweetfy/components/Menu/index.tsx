import { theme } from '../../theme/theme';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import * as React from 'react';
import { Image } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MenuComponent = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = (newState: { open: boolean }) => setState(newState);

  const { open } = state;

  const isFocused = useIsFocused();

  const actionsStyle = {
    color: theme.colors.white,
    style: { backgroundColor: theme.colors.brown, padding: 6 },
  };

  const actionLabelStyle = {
    ...theme.typography.p_medium,
    backgroundColor: theme.colors.brown,
    color: theme.colors.inputWhite,
    padding: 6,
    borderRadius: 8,
    minWidth: 150,
    textAlign: 'center',
  };

  const { bottom: bottomInset } = useSafeAreaInsets();
  return (
    <Portal>
      <FAB.Group
        backdropColor="transparent"
        color={theme.colors.white}
        style={{
          position: 'absolute',
          bottom: bottomInset + 50,
        }}
        fabStyle={{ backgroundColor: theme.colors.brown }}
        open={open}
        visible={isFocused}
        icon={open ? 'close' : 'plus'}
        label={open ? 'Fechar' : ''}
        actions={[
          {
            ...actionsStyle,
            icon: ({ size }) => (
              <Image
                source={require('../../assets/icons/order.png')}
                style={{ width: size, height: size }}
              />
            ),
            label: 'Cadastrar encomenda',
            labelStyle: { ...actionLabelStyle },
            onPress: () => {
              router.push('/createOrderPage');
            },
          },
          {
            ...actionsStyle,
            icon: ({ size }) => (
              <Image
                source={require('../../assets/icons/product.png')}
                style={{ width: size, height: size }}
              />
            ),
            label: 'Cadastrar produto',
            labelStyle: { ...actionLabelStyle },
            onPress: () => {
              router.push('/createProductPage');
            },
          },
          {
            ...actionsStyle,
            icon: ({ size }) => (
              <Image
                source={require('../../assets/icons/recipe.png')}
                style={{ width: size, height: size }}
              />
            ),
            label: 'Cadastrar receita',
            labelStyle: { ...actionLabelStyle },
            onPress: () => {
              router.push('/createRecipePage');
            },
          },
          {
            ...actionsStyle,
            icon: ({ size }) => (
              <Image
                source={require('../../assets/icons/ingredients.png')}
                style={{ width: size, height: size }}
              />
            ),
            label: 'Cadastrar insumos',
            labelStyle: { ...actionLabelStyle },
            onPress: () => {
              router.push('/createIngredientPage');
            },
          },
          {
            ...actionsStyle,
            icon: ({ size }) => (
              <Image
                source={require('../../assets/icons/service.png')}
                style={{ width: size, height: size }}
              />
            ),
            label: 'Cadastrar serviços',
            labelStyle: { ...actionLabelStyle },
            onPress: () => {
              router.push('/createServicePage');
            },
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

export default MenuComponent;
