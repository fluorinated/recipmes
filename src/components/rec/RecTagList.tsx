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
  const [list, setList]: [any[] | FoodCategory[], any] = useState(
    props.list || Object.values(FoodCategory)
  );
  const [selectedTags, setSelectedTags]: [string[], any] = useState([]);
  const [isSecondary, setIsSecondary]: [boolean, any] = useState(
    props.style === "secondary"
  );

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

  return (
    <SafeAreaView>
      <ScrollView horizontal={true}>
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
          {list.map((tag) => (
            <TouchableOpacity
              style={[
                isTagSelected(tag) ? styles.tagSelected : styles.tag,
                isSecondary ? styles.tagSecondary : {},
              ]}
              onPress={() => onClickTag(tag)}
              key={tag}
              disabled={isSecondary}
            >
              <Text
                style={[
                  isSecondary ? styles.tagTextSecondary : styles.tagText,
                  isTagSelected(tag) ? styles.tagTextSelected : {},
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: `${Colors.white}80`,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: `${Colors.neutral4}90`,
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
    borderColor: "transparent",
  },
  tagSecondary: {
    backgroundColor: `${Colors.white}40`,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: `${Colors.neutral5}90`,
  },
  tagText: {
    color: Colors.neutral2,
    fontSize: 13,
  },
  tagTextSecondary: {
    color: Colors.neutral1,
    fontSize: 13,
  },
  tagTextSelected: {
    color: Colors.white,
  },
  tagList: {
    flex: 1,
    flexDirection: "row",
  },
});

export default RecTagList;
