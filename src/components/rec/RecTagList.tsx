import { Colors } from '@constants/colors';
import { FoodCategory } from '@models/FoodCategory';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RecTagList = (props: any) => {
  const [list, setList]: [any[] | FoodCategory[], any] = useState(
    props.list ?? Object.values(FoodCategory)
  );
  const [selectedTags, setSelectedTags]: [string[], any] = useState([]);

  useEffect(() => {
    props.selectedTags(selectedTags);
  });

  const selectTag = (tag: string): void => {
    console.log("hi");
    if (isTagSelected(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isTagSelected = (tag: string): boolean =>
    !!selectedTags.find((selectedTag) => selectedTag === tag);

  const PrimaryTags = () => (
    <View
      style={[
        styles.tagList,
        {
          marginTop: props.marginTop,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
        },
      ]}
    >
      {list.map((tag, i) => (
        <TouchableOpacity
          style={[
            styles.tag,
            props.dark && !isTagSelected(tag)
              ? { backgroundColor: Colors.neutral6 }
              : { backgroundColor: Colors.neutral7 },
            isTagSelected(tag) && styles.tagSelected,
          ]}
          onPressIn={() => selectTag(tag)}
          key={i}
        >
          <Text
            style={[
              styles.tagText,
              isTagSelected(tag) && styles.tagTextSelected,
            ]}
          >
            {tag}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const SecondaryTags = () => (
    <View
      style={[
        styles.tagList,
        {
          marginTop: props.marginTop,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
          width: props.width,
        },
        styles.tagListSecondary,
      ]}
    >
      {list.map((tag, i) => (
        <View style={[styles.tag, styles.tagSecondary]} key={i}>
          <Text
            style={[
              styles.tagTextSecondary,
              isTagSelected(tag) && styles.tagTextSelected,
            ]}
          >
            {tag}
          </Text>
        </View>
      ))}
    </View>
  );

  return props.style === "secondary" ? (
    <SecondaryTags />
  ) : (
    <SafeAreaView>
      <ScrollView horizontal={true}>
        <PrimaryTags />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginVertical: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  tagSelected: {
    backgroundColor: Colors.pink4,
    borderColor: "transparent",
  },
  tagSecondary: {
    backgroundColor: Colors.neutral7,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginVertical: 2,
  },
  tagText: {
    color: Colors.neutral1,
    fontSize: 14,
  },
  tagTextSecondary: {
    color: Colors.neutral3,
    fontSize: 13,
  },
  tagTextSelected: {
    color: Colors.neutral1,
  },
  tagList: {
    flex: 1,
    flexDirection: "row",
  },
  tagListSecondary: {
    flexWrap: "wrap",
  },
});

export default RecTagList;
