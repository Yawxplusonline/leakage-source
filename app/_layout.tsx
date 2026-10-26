import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#102A43' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#F2F7FA' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="subject/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="admin/index" options={{ title: 'Admin & Reviewer Portal', headerShown: false }} />
      <Stack.Screen name="student/index" options={{ title: 'Student Practice Portal', headerShown: false }} />
      <Stack.Screen name="history/index" options={{ title: 'My Learning History', headerShown: false }} />
    </Stack>
  );
}
