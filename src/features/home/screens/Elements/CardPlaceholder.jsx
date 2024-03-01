import React from 'react'
import {
  Skeleton,
  VStack,
  HStack,
  Center,
  View,
  NativeBaseProvider,
} from 'native-base'

const Card = () => {
  return (
    <Center w="100%">
      <HStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={4}
        rounded="lg"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="2"
      >
        <Skeleton w={100} h="100" rounded="full" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton h="26" rounded="md" startColor="primary.300" />
          <Skeleton.Text lines={2} />
          <HStack space="2" alignItems="center">
            <Skeleton h="3" w={70} rounded="full" startColor="indigo.300" />
            <Skeleton size="6" rounded="full" />
          </HStack>
        </VStack>
      </HStack>
    </Center>
  )
}

const CardPlaceholder = () => {
  return (
    <View>
      <Center h="100%">
        <Card />
      </Center>
    </View>
  )
}
export default CardPlaceholder
