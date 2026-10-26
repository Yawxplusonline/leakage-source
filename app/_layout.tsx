import { Stack } from 'expo-router';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

export default function RootLayout() {
  const { width } = useWindowDimensions();

  // On mobile screens (width < 640), occupy 100% full screen fluid width.
  // On tablets or desktop monitors, center the app with a modern card framing.
  const isMobile = width < 640;

  return (
    <SafeAreaProvider>
      <View style={styles.outerContainer}>
        <SafeAreaView
          style={[
            styles.responsiveWrapper,
            isMobile ? styles.mobileFullWidth : styles.desktopCentered
          ]}
          edges={['top', 'bottom', 'left', 'right']}
        >
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: COLORS.bg },
              headerTintColor: COLORS.textWhite,
              headerTitleStyle: { fontWeight: 'bold' },
              contentStyle: { backgroundColor: COLORS.bg },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="subject/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="admin/index" options={{ title: 'Admin & Reviewer Portal', headerShown: false }} />
            <Stack.Screen name="student/index" options={{ title: 'Student Practice Portal', headerShown: false }} />
            <Stack.Screen name="history/index" options={{ title: 'My Learning History', headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#05070D',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  responsiveWrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.bg,
  },
  mobileFullWidth: {
    width: '100%',
    maxWidth: '100%',
  },
  desktopCentered: {
    width: '100%',
    maxWidth: 580,
    ...Platform.select({
      web: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 20,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: COLORS.surfaceBorder,
      }
    })
  }
});
