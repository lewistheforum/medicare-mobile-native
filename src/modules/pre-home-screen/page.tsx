import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const { width } = Dimensions.get("window");

const slides: Slide[] = [
  {
    id: "1",
    title: "Đặt lịch khám bệnh trực tuyến",
    description:
      "Đặt lịch khám bệnh nhanh chóng, không cần phải xếp hàng chờ đợi lấy số",
    image:
      "https://images.unsplash.com/photo-1504817343863-5092a9238033?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Chăm sóc tận tâm",
    description: "Trung tâm Y khoa uy tín, đồng hành cùng sức khỏe của bạn",
    image:
      "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function PreHomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken<Slide>[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <View style={styles.bannerContainer}>
        <Image source={{ uri: item.image }} style={styles.bannerImage} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const dots = useMemo(
    () =>
      slides.map((slide, index) => (
        <View
          key={slide.id}
          style={[
            styles.dot,
            activeIndex === index ? styles.dotActive : styles.dotInactive,
          ]}
        />
      )),
    [activeIndex]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dl8b10yqo/image/upload/v1733633022/umc-logo.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Thấu hiểu nỗi đau - Niềm tin của bạn</Text>
      </View>

      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        snapToInterval={width}
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        contentContainerStyle={styles.carousel}
      />

      <View style={styles.dotsContainer}>{dots}</View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push("/pre-home/login")}
        >
          <Text style={styles.loginText}>Đăng nhập</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.registerButton]}
          onPress={() => router.push("/pre-home/register")}
        >
          <Text style={styles.registerText}>Đăng ký</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    width: 280,
    height: 70,
  },
  tagline: {
    marginTop: 6,
    fontSize: 14,
    color: "#5D6B7E",
    textAlign: "center",
  },
  carousel: {
    paddingVertical: 10,
  },
  slide: {
    width: width - 40,
    alignItems: "center",
  },
  bannerContainer: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#E5F6FF",
    padding: 16,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 320,
    borderRadius: 16,
  },
  title: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#0C1B3A",
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    color: "#465670",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 26,
    backgroundColor: "#1B68FF",
  },
  dotInactive: {
    width: 10,
    backgroundColor: "#C7D0E0",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 26,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#0D5BFF",
  },
  registerButton: {
    backgroundColor: "#0FC6FF",
  },
  loginText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  registerText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
