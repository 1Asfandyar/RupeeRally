import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

import FloatingBubbleTabBarItem from '@/feature/main/components/FloatingBubbleTabBarItem';
import { mainTabBarItems } from '@/feature/main/constants/mainTabBar.constants';
import { themeColors } from '@/theme/utilities';

type NavigationRoute = BottomTabBarProps['state']['routes'][number];

const BAR_HEIGHT = 74;

const getMainTabItem = (routeName: string) =>
  mainTabBarItems.find((item) => item.routeName === routeName);

const getOrderedMainRoutes = (routes: NavigationRoute[]) =>
  mainTabBarItems
    .map((item) => routes.find((route) => route.name === item.routeName))
    .filter((route): route is NavigationRoute => Boolean(route));

const getCenteredMainRoutes = (
  routes: NavigationRoute[],
  activeRouteKey: string,
) => {
  const activeRouteIndex = routes.findIndex((route) => route.key === activeRouteKey);

  if (activeRouteIndex === -1 || routes.length < mainTabBarItems.length) {
    return routes;
  }

  return [-2, -1, 0, 1, 2].map((offset) => {
    const routeIndex = (activeRouteIndex + offset + routes.length) % routes.length;

    return routes[routeIndex];
  });
};

const FloatingBubbleTabBar = ({ navigation, state }: BottomTabBarProps) => {
  const activeRoute = state.routes[state.index];
  const orderedRoutes = getOrderedMainRoutes(state.routes);
  const centeredRoutes = getCenteredMainRoutes(orderedRoutes, activeRoute.key);

  const handleTabPress = (route: NavigationRoute, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <View accessibilityRole="tablist" style={styles.container}>
        {centeredRoutes.map((route) => {
          const item = getMainTabItem(route.name);

          if (!item) {
            return null;
          }

          const isFocused = route.key === activeRoute.key;

          return (
            <FloatingBubbleTabBarItem
              key={route.key}
              isFocused={isFocused}
              item={item}
              onPress={() => handleTabPress(route, isFocused)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: themeColors.white,
    borderRadius: BAR_HEIGHT / 2,
    elevation: 12,
    flexDirection: 'row',
    height: BAR_HEIGHT,
    paddingHorizontal: 10,
    shadowColor: themeColors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    width: '100%',
  },
  wrapper: {
    bottom: 18,
    left: 20,
    position: 'absolute',
    right: 20,
  },
});

export default FloatingBubbleTabBar;
