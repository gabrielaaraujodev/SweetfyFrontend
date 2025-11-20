import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { theme } from '@/theme/theme';
import { StyledAppBar } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomTabBar = ({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <StyledAppBar
      mode="center-aligned"
      style={{ paddingBottom: bottomInset, height: bottomInset + 45 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { tabBarIcon } = options;

        const isFocused = state.index === index;
        const iconNode = tabBarIcon
          ? tabBarIcon({
              focused: isFocused,
              size: 32,
              color: 'white',
            })
          : null;

        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        return (
          <Appbar.Action
            style={{
              backgroundColor: theme.colors.yellow,
              bottom: route.name === 'index' ? 15 : 5,
              borderColor: theme.colors.brown,
              borderWidth: isFocused ? 2 : 0,
            }}
            size={32}
            key={route.key}
            icon={() => iconNode}
            color={isFocused ? theme.colors.brown : theme.colors.yellow}
            onPress={onPress}
          />
        );
      })}
    </StyledAppBar>
  );
};
