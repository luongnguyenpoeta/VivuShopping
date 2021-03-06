import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigator/Navigator'
import { RouteProp } from '@react-navigation/native'
import { NAV_SCREENS } from '../navigator/RouteNames'

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NAV_SCREENS.Details
>
type DetailsScreenRoute = RouteProp<RootStackParamList, NAV_SCREENS.Details>

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: DetailsScreenNavigationProp
  route: DetailsScreenRoute
}

export function DetailsScreen(props: Props) {
  const { route } = props

  return (
    <View style={styles.container}>
      <Text>Details Screen + {route.params?.userId}</Text>
    </View>
  )
}

export type DetailsScreenParams = {
  userId: string
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})
