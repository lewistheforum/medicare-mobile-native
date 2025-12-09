import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const BRAND_BLUE = "#0D5BFF";
const BG = "#F3F5FB";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = phone.length >= 8 && password.length >= 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.backText}>{"←"} Quay lại</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.logoRow}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>UMC</Text>
            </View>
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.welcome}>Chào mừng đến với</Text>
              <Text style={styles.brand}>UMC CARE</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>Vui lòng đăng nhập để sử dụng</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.inputRow}>
              <Ionicons
                name="phone-portrait-outline"
                size={22}
                color="#1B3355"
              />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(v) => setPhone(v.replace(/[^0-9]/g, ""))}
                keyboardType="phone-pad"
                placeholder="Số điện thoại..."
                placeholderTextColor="#9AA0A6"
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={22} color="#1B3355" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#9AA0A6"
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={10}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#1B3355"
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={styles.checkboxRow}
            onPress={() => setRemember((v) => !v)}
            hitSlop={8}
          >
            <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
              {remember ? (
                <Ionicons name="checkmark" size={18} color="#fff" />
              ) : null}
            </View>
            <Text style={styles.termsText}>Lưu thông tin đăng nhập</Text>
          </Pressable>

          <Pressable
            disabled={!canSubmit}
            style={[styles.primaryBtn, !canSubmit && styles.btnDisabled]}
            onPress={() => {
              /* TODO: login API */
              router.push("/home");
            }}
          >
            <Text style={styles.primaryText}>Đăng nhập</Text>
          </Pressable>

          <Pressable style={styles.linkBtn} onPress={() => {}}>
            <Text style={styles.linkText}>Quên tài khoản hoặc mật khẩu</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push("/pre-home/register")}
          >
            <Text style={styles.secondaryText}>Đăng ký tài khoản mới</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B3355",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#E3EEFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "700",
    color: BRAND_BLUE,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1B3355",
  },
  brand: {
    fontSize: 24,
    fontWeight: "900",
    color: BRAND_BLUE,
  },
  subtitle: {
    fontSize: 16,
    color: "#3D4451",
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B3355",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9DFEA",
    backgroundColor: "#F4F6FA",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1B3355",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#A7B3C8",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  termsText: {
    fontSize: 16,
    color: "#1B3355",
  },
  primaryBtn: {
    marginTop: 4,
    backgroundColor: BRAND_BLUE,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
  btnDisabled: {
    opacity: 0.6,
  },
  linkBtn: {
    alignItems: "center",
  },
  linkText: {
    color: BRAND_BLUE,
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryBtn: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: BRAND_BLUE,
    fontSize: 17,
    fontWeight: "800",
  },
});
