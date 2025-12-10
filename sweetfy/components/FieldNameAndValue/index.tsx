import * as React from 'react';
import { StyleSheet, View, Text, TextStyle, ViewStyle } from 'react-native';

type StyleProp<T> = T | T[] | undefined;
type ValueType = string | number;

interface FieldNameAndValueProps {
  name: ValueType;
  value: ValueType | [ValueType] | [ValueType, ValueType];
  nameStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const FieldNameAndValue: React.FC<FieldNameAndValueProps> = ({
  name,
  value,
  nameStyle,
  valueStyle,
  contentStyle,
}) => {
  return (
    <View style={[styles.viewDetails, contentStyle]}>
      <Text style={[styles.text, nameStyle]}>{name}</Text>
      <Text style={[styles.textValue, valueStyle]}>{value} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  text: {
    color: '#5F3124',
    fontFamily: 'Montserrat',
    fontSize: 21,
  },
  textValue: {
    color: '#5F3124',
    fontFamily: 'Montserrat',
    fontSize: 21,
  },
});

export default FieldNameAndValue;
