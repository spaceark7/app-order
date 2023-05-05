import { FlatList } from 'native-base'
import { useCallback, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'

import TableView from './TableView'

const MenuListView = ({ menus, navigation }) => {
  const { width } = useWindowDimensions()
  const numColumns = useMemo(() => {
    if (width >= 768) {
      return 2
    } else {
      return 1
    }
  }, [width])
  const itemWidth = width / numColumns - 32
  const render = useCallback(
    ({ item }) => (
      <TableView key={item.id} table={item} itemWidth={itemWidth} />
    ),
    [itemWidth]
  )

  return (
    <FlatList
      numColumns={numColumns}
      data={menus}
      renderItem={render}
      maxToRenderPerBatch={12}
      updateCellsBatchingPeriod={100}
      keyExtractor={(menus) => menus.group_name}
    />
  )
}

export default MenuListView
