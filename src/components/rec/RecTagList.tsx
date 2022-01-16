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
    props.list ?? Object.values(FoodCategory)
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

  const isTagSelected = (tag: string): boolean =>
    !!selectedTags.find((selectedTag) => selectedTag === tag);

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
            isSecondary && styles.tagListSecondary,
          ]}
        >
          {list.map((tag, i) => (
            <TouchableOpacity
              style={[
                styles.tag,
                isTagSelected(tag) && styles.tagSelected,
                isSecondary && styles.tagSecondary,
              ]}
              onPress={() => onClickTag(tag)}
              key={i}
              disabled={isSecondary}
            >
              <Text
                style={[
                  isSecondary ? styles.tagTextSecondary : styles.tagText,
                  isTagSelected(tag) && styles.tagTextSelected,
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
    shadowRadius: 1,
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
    width: 200,
  },
});

export default RecTagList;
