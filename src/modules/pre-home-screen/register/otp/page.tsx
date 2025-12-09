import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import auth from "@react-native-firebase/auth";
import { router, useLocalSearchParams } from "expo-router";

const BRAND_BLUE = "#0D5BFF";
const BG = "#F3F5FB";

export default function RegisterOtpScreen() {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const { phone: phoneParam, verificationId: verificationIdParam } =
    useLocalSearchParams<{ phone?: string; verificationId?: string }>();

  const phone = typeof phoneParam === "string" ? phoneParam : "";
  const [verificationId, setVerificationId] = useState<string>(
    typeof verificationIdParam === "string" ? verificationIdParam : ""
  );

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formattedTime = useMemo(() => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [seconds]);

  const handleResend = async () => {
    if (!phone || resending) return;
    setResending(true);
    setError(null);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setVerificationId(confirmation.verificationId ?? "");
      setSeconds(60);
    } catch (err) {
      console.error(err);
      setError("Gửi lại OTP thất bại. Vui lòng thử lại.");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6 || !verificationId || verifying) return;
    setVerifying(true);
    setError(null);
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth().signInWithCredential(credential);
      router.push({
        pathname: "/pre-home/register/information",
        params: { phone },
      });
    } catch (err) {
      console.error(err);
      setError("Mã OTP không hợp lệ hoặc đã hết hạn.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <Text style={styles.sectionTitle}>Nhập mã OTP</Text>
        <Text style={styles.description}>
          Nhập mã OTP được gửi qua số điện thoại của bạn
        </Text>
        {phone ? (
          <Text style={styles.phoneText}>Số điện thoại: {phone}</Text>
        ) : null}

        <View style={styles.otpRow}>
          <TextInput
            value={otp}
            onChangeText={(val) =>
              setOtp(val.replace(/[^0-9]/g, "").slice(0, 6))
            }
            keyboardType="number-pad"
            maxLength={6}
            placeholder="000000"
            placeholderTextColor="#9AA0A6"
            style={styles.otpInput}
          />
          <Pressable
            style={[
              styles.submitBtn,
              otp.length === 6 && verificationId
                ? styles.submitEnabled
                : styles.submitDisabled,
            ]}
            onPress={handleSubmit}
            disabled={otp.length !== 6 || !verificationId || verifying}
          >
            <Text style={styles.submitText}>
              {verifying ? "Đang xác nhận..." : "Xác nhận"}
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={handleResend} hitSlop={8} style={styles.resendWrap}>
          <Text style={styles.resendText}>
            {resending ? "Đang gửi lại..." : "Không nhận được mã?"}
          </Text>
        </Pressable>

        <Text style={styles.timer}>{formattedTime}</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </SafeAreaView>
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
    marginTop: 8,
    fontSize: 18,
    fontWeight: "700",
    color: "#1B3355",
  },
  description: {
    fontSize: 16,
    color: "#3D4451",
    lineHeight: 22,
  },
  phoneText: {
    fontSize: 15,
    color: "#1B3355",
  },
  otpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  otpInput: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F4F6FA",
    borderWidth: 1,
    borderColor: "#D9DFEA",
    paddingHorizontal: 18,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 4,
    color: "#1B3355",
  },
  submitBtn: {
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
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
  resendWrap: {
    marginTop: 6,
  },
  resendText: {
    fontSize: 16,
    color: "#1B3355",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  timer: {
    marginTop: 4,
    fontSize: 26,
    fontWeight: "800",
    color: BRAND_BLUE,
    textAlign: "center",
  },
  errorText: {
    marginTop: 8,
    color: "#E53935",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
