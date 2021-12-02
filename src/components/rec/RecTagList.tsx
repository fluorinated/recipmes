import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@constants/colors";
import { FoodCategory } from "@models/FoodCategory";

const RecTagList = (props: any) => {
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

  const isTagSelected = (tag: string) =>
    selectedTags.find((selectedTag) => selectedTag === tag);

  const getTags = (props: any) => {
    let list: [] | FoodCategory[] = [];
    if (props.listType === "food") {
      list = Object.values(FoodCategory);
    }
    return list.map((tag) => (
      <TouchableOpacity
        style={isTagSelected(tag) ? styles.tagSelected : styles.tag}
        onPress={() => onClickTag(tag)}
        key={tag}
      >
        <Text
          style={isTagSelected(tag) ? styles.tagTextSelected : styles.tagText}
        >
          {tag}
        </Text>
      </TouchableOpacity>
    ));
  };
  return (
    <SafeAreaView>
      <ScrollView horizontal={true}>
        <View style={styles.tagList}>{getTags(props)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: `${Colors.neutral6}50`,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.neutral6,
  },
  tagSelected: {
    backgroundColor: Colors.neutral2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: `${Colors.neutral1}80`,
  },
  tagText: {
    color: Colors.neutral1,
  },
  tagTextSelected: {
    color: Colors.white,
  },
  tagList: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 15,
  },
});

export default RecTagList;
