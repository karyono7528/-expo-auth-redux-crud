import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import Button from './Button';

export default function PostCardItem({ title, author, onEdit, onDelete }) {

  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>Author: {author}</Text>
        </View>
        <View style={styles.rowView}>
          <Button
            onPress={onEdit}
            icon="edit" 
            color="purple"           
            style={{ marginHorizontal: 16 }} />
          <Button onPress={onDelete} color="tomato"  icon='trash-2' />
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8
  },
  title: {
    fontSize: 18,
  },
})