import { useGetMenuQuery } from 'api/menuAPi'
import { Button, HStack, ScrollView } from 'native-base'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

const SelectOrder = ({ route, navigation }) => {
  const {
    data: menus,
    isSuccess,
    isFetching,
    isLoading,
    isError,
    error,
  } = useGetMenuQuery({
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const [selectedGroup, setSelectedGroup] = useState()
  const [selectedMenu, setSelectedMenu] = useState()

  const handleGroupChange = (group) => {
    console.log('group:', group.group_menu)
    setSelectedGroup(group.group_menu)
    setSelectedMenu(group.menus)
  }

  useEffect(() => {
    navigation.setOptions({
      title: 'Select Order',
    })
  }, [navigation])
  return (
    <View>
      <Text>Order Screen</Text>
      <Text>Table : {route.params.tableName}</Text>
      <Text>Guest : {route.params.guestNo}</Text>
      <Text>ID : {route.params.tableId}</Text>

      <ScrollView
        rounded='full'
        width={'100%'}
        className='h-fit'
        horizontal={true}
        alwaysBounceHorizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <HStack rounded='full' space={3}>
          <Button.Group variant='solid' rounded='full' space={3}>
            {isSuccess &&
              menus.map((menu, index) => (
                <Button
                  key={index}
                  variant={
                    selectedGroup === menu.group_menu ? 'solid' : 'ghost'
                  }
                  colorScheme='primary'
                  rounded='full'
                  onPress={() => handleGroupChange(menu)}
                >
                  {`${menu.group_menu}`}
                </Button>
              ))}
          </Button.Group>
        </HStack>
      </ScrollView>
    </View>
  )
}

export default SelectOrder
