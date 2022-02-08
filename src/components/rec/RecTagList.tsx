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
  }, [selectedTags]);

  const onClickTag = (tag: string) => {
    if (isTagSelected(tag)) {
      const newSelectedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
      setSelectedTags(newSelectedTags);
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
          style={[styles.tag, isTagSelected(tag) && styles.tagSelected]}
          onPress={() => onClickTag(tag)}
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
    backgroundColor: Colors.white,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginVertical: 10,
    marginRight: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.neutral5,
  },
  tagSelected: {
    backgroundColor: Colors.neutral2,
    borderColor: "transparent",
  },
  tagSecondary: {
    backgroundColor: Colors.white,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.neutral7,
    shadowColor: Colors.neutral4,
    shadowOpacity: 0.3,
    shadowRadius: 0.25,
    shadowOffset: {
      width: -0.5,
      height: 0.5,
    },
    marginVertical: 2,
  },
  tagText: {
    color: Colors.neutral2,
    fontSize: 14,
  },
  tagTextSecondary: {
    color: Colors.neutral3,
    fontSize: 13,
  },
  tagTextSelected: {
    color: Colors.white,
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
