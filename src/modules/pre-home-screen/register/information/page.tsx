import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

const BRAND_BLUE = "#0D5BFF";
const BG = "#F3F5FB";

export default function RegisterInformationScreen() {
  const { phone: phoneParam } = useLocalSearchParams<{ phone?: string }>();

  const [phone, setPhone] = useState(
    typeof phoneParam === "string" ? phoneParam : ""
  );
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const rules = useMemo(
    () => ({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      digit: /[0-9]/.test(password),
      match: password.length > 0 && password === confirm,
    }),
    [password, confirm]
  );

  const allValid = rules.length && rules.upper && rules.digit && rules.match;

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

          <Text style={styles.sectionTitle}>Đặt mật khẩu mới</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.inputRow}>
              <Text style={styles.leftIcon}>📱</Text>
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

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputRow}>
              <Text style={styles.leftIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Vui lòng nhập mật khẩu"
                placeholderTextColor="#9AA0A6"
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={10}
              >
                <Text style={styles.eye}>{showPassword ? "🙈" : "👁️"}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nhập lại mật khẩu</Text>
            <View style={styles.inputRow}>
              <Text style={styles.leftIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
                placeholder="Vui lòng nhập lại mật khẩu"
                placeholderTextColor="#9AA0A6"
              />
              <Pressable onPress={() => setShowConfirm((v) => !v)} hitSlop={10}>
                <Text style={styles.eye}>{showConfirm ? "🙈" : "👁️"}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.rules}>
            <RuleItem
              label="Mật khẩu từ 8 ký tự trở lên"
              active={rules.length}
            />
            <RuleItem
              label="Mật khẩu chứa ít nhất 1 chữ hoa"
              active={rules.upper}
            />
            <RuleItem label="Mật khẩu chứa ít nhất 1 số" active={rules.digit} />
            <RuleItem
              label="Xác nhận mật khẩu trùng khớp"
              active={rules.match}
            />
          </View>

          <Pressable
            style={[
              styles.submitBtn,
              allValid ? styles.submitEnabled : styles.submitDisabled,
            ]}
            disabled={!allValid}
            onPress={() => {
              /* TODO: submit info */
            }}
          >
            <Text style={styles.submitText}>Xác nhận</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RuleItem({ label, active }: { label: string; active: boolean }) {
  return (
    <View style={styles.ruleRow}>
      <Text
        style={[
          styles.ruleIcon,
          active ? styles.ruleIconActive : styles.ruleIconInactive,
        ]}
      >
        ✔
      </Text>
      <Text
        style={[styles.ruleLabel, active ? styles.ruleLabelActive : undefined]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 12,
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
    gap: 12,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#1B3355",
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: BRAND_BLUE,
  },
  sectionTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: "#1B3355",
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
  leftIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1B3355",
  },
  eye: {
    fontSize: 18,
    color: "#1B3355",
  },
  rules: {
    marginTop: 4,
    gap: 6,
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ruleIcon: {
    fontSize: 16,
    fontWeight: "700",
  },
  ruleIconActive: {
    color: BRAND_BLUE,
  },
  ruleIconInactive: {
    color: "#9AA0A6",
  },
  ruleLabel: {
    fontSize: 16,
    color: "#3D4451",
  },
  ruleLabelActive: {
    color: "#1B3355",
    fontWeight: "700",
  },
  submitBtn: {
    marginTop: 10,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  submitEnabled: {
    backgroundColor: BRAND_BLUE,
  },
  submitDisabled: {
    backgroundColor: "#BFD4FF",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
