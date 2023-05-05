import { FlatList } from 'native-base'
import { useCallback, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'

import TableView from './TableView'

const TableListView = ({ tables, navigation }) => {
  const { width } = useWindowDimensions()
  const numColumns = useMemo(() => {
    if (width >= 768) {
      return 4
    } else if (width >= 576) {
      return 3
    } else {
      return 2
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
      data={tables}
      renderItem={render}
      maxToRenderPerBatch={12}
      updateCellsBatchingPeriod={100}
      keyExtractor={(tables) => tables.id}
    />
  )
}

export default TableListView
