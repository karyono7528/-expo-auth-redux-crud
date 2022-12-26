import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

export default function Button({ onPress, style, icon, color }) {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Feather name={icon} color={color} size={24} />
        </TouchableOpacity>
    )
}
