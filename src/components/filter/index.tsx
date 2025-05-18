import { ColorValue, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { s } from "./styles";

export type FilterProps = {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  colors: ColorValue[];
  isSelected?: boolean;
}

type Props = TouchableOpacityProps & FilterProps;

export function Filter({  name, icon, colors, isSelected = false, ...rest }: Props) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <MaterialIcons name={icon} size={24} color={isSelected ? colors[0] : "#000"} />
      <Text style={s.name}>{ name }</Text>
    </TouchableOpacity>
  )
}