import React, {
  useEffect,
  useState,
  useMemo,
  useReducer,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'

import { useUserContext } from '../../../../context/UserContext'
import { useSignOut } from '../../../../hooks/use-sign-out'
import {
  Input,
  VStack,
  Center,
  Heading,
  Button,
  Text,
  HStack,
  IconButton,
  Icon,
  ScrollView,
  NativeBaseProvider,
  View,
} from 'native-base'

import NetInfo, { useNetInfo } from '@react-native-community/netinfo'

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import Placeholder from '../Elements/Placeholder'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { getWishListDataByEmail } from './use-wish'
import CardPlaceholder from '../Elements/CardPlaceholder'
import WishCard from '../Elements/WishCard'

const backgroundImage = require('../../../../../assets/bg_.jpg')

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
}

export const WishScreen = ({ navigation }) => {
  const [connectionStatus, setConnectionStatus] = useState(false)
  const [jsonData, setJsonData] = useState([])
  const { user } = useUserContext()
  const [signOut, { isLoading }] = useSignOut()
  const [loading, setLoading] = useState(false)
  const [get, setGet] = useState(true)
  const [error, setError] = useState('')

  const handlePressIn = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handlePressOut = useCallback(() => {
    setIsHovered(false)
  }, [])

  const handleCustomPress = useCallback(
    (product) => {
      navigation.navigate('LayarLain', { ...product })
    },
    [navigation]
  )
  const requestData = {
    email: user.email,
    uid: user.uid,
  }

  async function getResult(email) {
    const result = await getWishListDataByEmail(email)

    return result
  }

  const getdata = () => {
    getResult(user.email)
      .then((result) => {
        setJsonData(result.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('wishData')

        return jsonValue != null ? JSON.parse(jsonValue) : null
      } catch (error) {
        console.error(error)
      }
    }

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)

        await AsyncStorage.setItem('wishData', jsonValue)
      } catch (error) {
        console.error(error)
      }
    }

    const getResult = async (email) => {
      const result = await getWishListDataByEmail(email)

      return result
    }

    setLoading(true)

    getData()
      .then((result) => {
        NetInfo.fetch().then((state) => {
          if (!state.isConnected) {
            console.log(connectionStatus)
            console.log('get from storage')
            setJsonData(result)
            setLoading(false)
          } else if (state.isConnected) {
            console.log('get from fetch')
            getResult(user.email)
              .then((result) => {
                storeData(result.data)
                setJsonData(result.data)
                setLoading(false)
              })
              .catch((error) => {
                console.error(error)
              })
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [user.email])

  const renderData = (jsonData) => {
    console.log(jsonData)
    return jsonData.map((item, index) => {
      const { ProductName, wishListUser } = item
      const {
        price,
        discount,
        CustomerEmail,
        stock,
        NameShop,
        brand,
        rating,
        TypeProduct,
        emailShopOwner,
        Base64ImageData,
        imageList,
      } = wishListUser[0]

      return (
        <WishCard
          key={index}
          imageSource={Base64ImageData}
          nameShop={NameShop}
          title={ProductName}
          price={price}
          rate={rating}
          stock={stock}
          discountPercentage={discount}
        />
      )
    })
  }

  const renderedData = useCallback(() => renderData(jsonData), [jsonData])

  const userName = user.email.split('@')[0]

  const handlePress = () => {}

  return (
    <Center flex={1}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1, width: 360, height: 820 }}
      >
        <VStack space={4} alignItems="center" w="100%">
          {/* Ganti user.email dengan userName */}
          {/* <Heading>Hello, {userName}</Heading>*/}
          <View
            w="100%"
            h="100%"
            display="column"
            marginTop="13%"
            bg="rgba(255,255,255, .6)"
            borderWidth={2}
            borderColor="#fff"
            borderLeftRadius={30}
            borderRightRadius={30}
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              overflow: 'hidden',
            }}
          >
            <HStack
              alignItems="center"
              space={120}
              w="100%"
              h={6}
              style={{ marginLeft: '3%', marginTop: '5%' }}
            >
              <HStack space={3} alignItems="center">
                <IconButton
                  size={8}
                  width={10}
                  height={10}
                  borderRadius={50}
                  icon={
                    <Icon
                      size={7}
                      color="#000"
                      as={MaterialCommunityIcons}
                      name="arrow-left"
                    />
                  }
                  onPress={() => navigation.goBack()}
                />
                <Text fontSize={17} color="#000" fontWeight="bold">
                  Wish List
                </Text>
                <Text fontSize={17} color="#000" fontWeight="bold">
                  {connectionStatus}
                </Text>
              </HStack>
              <HStack space={2}>
                <IconButton
                  size={8}
                  width={10}
                  height={10}
                  borderRadius={50}
                  icon={
                    <Icon
                      size={7}
                      color="#000"
                      as={MaterialCommunityIcons}
                      name="cart"
                    />
                  }
                  onPress={() => getdata()}
                />
                <IconButton
                  size={8}
                  width={10}
                  height={10}
                  borderRadius={50}
                  onPress={() => navigation.navigate('Menu')}
                  icon={
                    <Icon
                      size={7}
                      color="#000"
                      as={MaterialIcons}
                      name="menu"
                    />
                  }
                />
              </HStack>
            </HStack>
            <View bg="rgba(255,255,255, 0)" w="100%" h="100%" top={5}>
              <ScrollView>
                <VStack
                  space={2}
                  display="column"
                  alignItems="center"
                  justifyContent="center"
                  marginBottom={160}
                  style={{
                    position: 'relative',
                    w: '100%',
                    h: '100%',
                  }}
                >
                  {jsonData && jsonData.length > 0
                    ? renderedData()
                    : [1, 2, 3, 4].map((item) => (
                        <View key={item} w="100%" h={150} overflow="hidden">
                          <CardPlaceholder />
                        </View>
                      ))}
                </VStack>
              </ScrollView>
            </View>
          </View>
        </VStack>
      </ImageBackground>
    </Center>
  )
}

WishScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
