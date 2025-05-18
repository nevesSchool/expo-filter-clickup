import { useState } from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import Svg, { RadialGradient, Stop, Rect } from 'react-native-svg';

import { Filter, FilterProps } from '@/components/filter';
import { s } from './styles';

const FILTERS: FilterProps[] = [
  { name: "My Work", icon: "schedule", colors: ["#FF8C00", "#FF0080"] },
  { name: "Recent", icon: "history", colors: ["#6A5ACD", "#00FFFF"] },
  { name: "Favorites", icon: "star", colors: ["#FF4500", "#FFD700"] },
  { name: "Spaces", icon: "splitscreen", colors: ["#32CD32", "#008080"] },
  { name: "Docs", icon: "description", colors: ["#FF1493", "#9400D3"] },
  { name: "Dashboard", icon: "dashboard", colors: ["#1E90FF", "#00FA9A"] },
]

export function Home() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [centerX, setCenterX] = useState("3.97%");
  const dimensions = useWindowDimensions();

  function handleItemPress(item: FilterProps, event: any) {
    const locationX = event.nativeEvent.locationX;
    const percentage = (locationX / dimensions.width) * 100;

    setCenterX(`${percentage}%`);
    setFilter(item);
  }

  return (
    <View style={s.container}>
      <Svg height="100%" width="100%" style={s.gradient}>
        <RadialGradient id="gradient" cx={centerX} cy="50%" rx="60%" ry="60%">
          <Stop offset="70%" stopColor={filter.colors[0]} stopOpacity={0.3} />
          <Stop offset="100%" stopColor="transparent" stopOpacity={0.1} />
        </RadialGradient>

        <Rect width="100%" height="100%" fill="url(#gradient)" />
      </Svg>

      <FlatList 
        data={FILTERS}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Filter 
            name={item.name}
            icon={item.icon}
            colors={item.colors}
            isSelected={filter.name === item.name}
            onPress={(event) => handleItemPress(item, event)}
          />
        )} 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.list}
        contentContainerStyle={s.listContent}
      />

      <View style={s.content} />
    </View>
  )
}