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

export default function RegisterScreen() {
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const canSubmit = phone.length >= 8 && agree;

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

          <Text style={styles.subtitle}>
            Đăng ký tài khoản bằng số điện thoại
          </Text>

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
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#9AA0A6"
              />
            </View>
          </View>

          <Pressable
            style={styles.checkboxRow}
            onPress={() => setAgree((v) => !v)}
            hitSlop={8}
          >
            <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
              {agree ? (
                <Ionicons name="checkmark" size={18} color="#fff" />
              ) : null}
            </View>
            <Text style={styles.termsText}>
              Bằng việc đăng ký tài khoản tại UMC Care, tôi đã đọc và đồng ý với
              các <Text style={styles.linkText}>điều khoản sử dụng.</Text>
            </Text>
          </Pressable>

          <Pressable
            disabled={!canSubmit}
            style={[styles.primaryBtn, !canSubmit && styles.btnDisabled]}
            onPress={() => router.push("/pre-home/register/otp")}
          >
            <Text style={styles.primaryText}>Đăng ký tài khoản</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push("/pre-home/login")}
          >
            <Text style={styles.secondaryText}>Đăng nhập</Text>
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
    marginTop: 28,
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
    alignItems: "flex-start",
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
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  termsText: {
    flex: 1,
    fontSize: 16,
    color: "#1B3355",
    lineHeight: 22,
  },
  linkText: {
    color: BRAND_BLUE,
    fontWeight: "700",
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
