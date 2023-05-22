import { StatusBar } from 'expo-status-bar'
import { Navigation } from './navigation'
import { useCachedResources } from './hooks'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default () => {
  const isLoaded = useCachedResources()
  const colorScheme = useColorScheme()

  if (isLoaded) {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    )
  } else {
    return null
  }
}

// EAS Build - is a hosted service for building and distributing Expo Go apps, iOS and Android binaries, and web bundles.
