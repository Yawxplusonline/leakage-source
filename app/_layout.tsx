import { Stack } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={styles.outerContainer}>
        <View style={styles.responsiveWrapper}>
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
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#05070D', // Deep backdrop for larger desktop screens
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600, // Optimal mobile phone & tablet view width
    backgroundColor: COLORS.bg,
    ...Platform.select({
      web: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      }
    })
  }
});
