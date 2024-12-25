import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native'

type PropsType = {
  showAddTaskBlock: boolean
  setShowAddTaskBlock: (showAddTaskBlock: boolean) => void
}
export const Header = (props: PropsType) => {
  const { setShowAddTaskBlock, showAddTaskBlock } = props
  return (
    <View style={styles.buttonAndTitleBlock}>
      <TouchableOpacity
        onPress={() => setShowAddTaskBlock(!showAddTaskBlock)}
        style={styles.showBlockButton}
      >
        {showAddTaskBlock ? (
          <Image
            style={styles.showBlockButton}
            source={require('./../assets/free-icon-close-151882.png')}
          />
        ) : (
          <Image style={styles.showBlockButton} source={require('./../assets/showblock.png')} />
        )}
      </TouchableOpacity>
      <Text style={styles.h1}> simple todo </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  showBlockButton: {
    marginTop: 4,
    width: 40,
    height: 40,
    marginRight: 115,
    marginBottom: 10,
  },

  h1: { fontSize: 30, fontWeight: 'bold' },
  buttonAndTitleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
