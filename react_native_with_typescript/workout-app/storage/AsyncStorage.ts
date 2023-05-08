import AsyncStorage from '@react-native-async-storage/async-storage'

const createStorageCall = (implementation: Function) => {
  return async (key: string, value?: unknown) => {
    try {
      return await implementation(key, value)
    } catch (e) {
      console.error(e)
    }
  }
}

export const storeData = createStorageCall(async (key: string, value: unknown) => {
  const stringValue = JSON.stringify(value)
  await AsyncStorage.setItem(key, stringValue)
})

export const getData = createStorageCall(async (key: string) => {
  const stringValue = await AsyncStorage.getItem(key)
  if (stringValue !== null) {
    return JSON.parse(stringValue)
  }
})

export const containsKey = createStorageCall(async (key: string) => {
  const keys = await AsyncStorage.getAllKeys()
  return keys.includes(key)
})

export const removeItem = createStorageCall(async (key: string) => {
  await AsyncStorage.removeItem(key)
})
