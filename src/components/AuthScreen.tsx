import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { signInWithPassword, signUpWithPassword } from "../services/auth";

export function AuthScreen({ configured }: { configured: boolean }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    setMessage("");
    if (!email.trim() || password.length < 8) {
      setMessage("Informe seu e-mail e uma senha com pelo menos 8 caracteres.");
      return;
    }
    setBusy(true);
    try {
      const result = mode === "login"
        ? await signInWithPassword(email, password)
        : await signUpWithPassword(email, password);
      if (result.error) throw result.error;
      if (mode === "signup" && !result.data.session) {
        setMessage("Conta criada. Confirme seu e-mail pelo link enviado para concluir o cadastro.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível autenticar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.logo}><Text style={styles.logoText}>N</Text></View>
        <Text style={styles.brand}>NERO</Text>
        <Text style={styles.subtitle}>CONTINUIDADE. INTELIGÊNCIA. CONFIANÇA.</Text>
        <Text style={styles.heading}>{mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}</Text>
        {!configured ? (
          <Text style={styles.notice}>A autenticação ainda aguarda a configuração do projeto Supabase. Nenhuma senha será solicitada até a conexão estar pronta.</Text>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Seu e-mail"
              placeholderTextColor="#7F8AA3"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!busy}
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Senha (mínimo 8 caracteres)"
              placeholderTextColor="#7F8AA3"
              secureTextEntry
              autoCapitalize="none"
              editable={!busy}
            />
            {!!message && <Text style={styles.message}>{message}</Text>}
            <TouchableOpacity style={[styles.button, busy && styles.disabled]} onPress={submit} disabled={busy}>
              {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>{mode === "login" ? "ENTRAR" : "CRIAR CONTA"}</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>
              <Text style={styles.switchText}>{mode === "login" ? "Ainda não tem conta? Criar conta" : "Já tem conta? Entrar"}</Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.footer}>Sua conta e seus dados pertencem a você.</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B1020" },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 28 },
  logo: { alignSelf: "center", width: 64, height: 64, borderRadius: 20, backgroundColor: "#1B6BFF", alignItems: "center", justifyContent: "center" },
  logoText: { color: "#FFFFFF", fontSize: 38, fontWeight: "800" },
  brand: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", letterSpacing: 5, textAlign: "center", marginTop: 14 },
  subtitle: { color: "#8290AA", fontSize: 9, letterSpacing: 1.5, textAlign: "center", marginTop: 6, marginBottom: 42 },
  heading: { color: "#FFFFFF", fontSize: 23, fontWeight: "700", marginBottom: 20 },
  input: { color: "#FFFFFF", backgroundColor: "#151F33", borderColor: "#263653", borderWidth: 1, borderRadius: 12, padding: 15, marginBottom: 12, fontSize: 15 },
  button: { backgroundColor: "#1B6BFF", borderRadius: 12, padding: 16, alignItems: "center", marginTop: 6 },
  disabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  switchText: { color: "#9CC5FF", textAlign: "center", marginTop: 20, fontSize: 13 },
  message: { color: "#F2B84B", fontSize: 12, lineHeight: 18, marginBottom: 10 },
  notice: { color: "#AAB7CE", backgroundColor: "#151F33", borderRadius: 12, padding: 16, lineHeight: 21 },
  footer: { color: "#65738D", fontSize: 11, textAlign: "center", marginTop: 44 }
});
