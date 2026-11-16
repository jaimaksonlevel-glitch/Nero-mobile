import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./src/config/supabase";
import { sendToNero } from "./src/services/continuum";
import type { ChatMessage } from "./src/types/chat";

const initialMessages: ChatMessage[] = [{
  id: "welcome",
  role: "assistant",
  text: "Olá! Eu sou o Nero. Estou conectado ao núcleo da Nero Continuum. Como posso ajudar?",
  createdAt: new Date()
}];

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) Alert.alert("Sessão", error.message);
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn() {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      Alert.alert("Dados necessários", "Informe seu e-mail e sua senha.");
      return;
    }
    setAuthBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    setAuthBusy(false);
    if (error) Alert.alert("Não foi possível entrar", error.message);
  }

  async function signUp() {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || password.length < 8) {
      Alert.alert("Cadastro", "Informe um e-mail válido e uma senha com pelo menos 8 caracteres.");
      return;
    }
    setAuthBusy(true);
    const { data, error } = await supabase.auth.signUp({ email: cleanEmail, password });
    setAuthBusy(false);
    if (error) {
      Alert.alert("Não foi possível criar a conta", error.message);
      return;
    }
    if (!data.session) {
      Alert.alert("Confirme seu e-mail", "A conta foi criada. Confirme o endereço de e-mail e depois entre no Nero.");
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Sessão", error.message);
    setMessages(initialMessages);
    setConversationId(null);
  }

  async function sendMessage() {
    const text = draft.trim();
    if (!text || sending) return;
    const userMessage: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text,
      createdAt: new Date()
    };
    setMessages(current => [...current, userMessage]);
    setDraft("");
    setSending(true);
    try {
      const result = await sendToNero(text, conversationId);
      setConversationId(result.conversationId);
      setMessages(current => [...current, {
        id: String(Date.now()) + "-nero",
        role: "assistant",
        text: result.text,
        createdAt: new Date()
      }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha inesperada ao falar com o backend.";
      setMessages(current => [...current, {
        id: String(Date.now()) + "-error",
        role: "assistant",
        text: "Não consegui concluir essa mensagem. Verifique sua conexão e tente novamente. Detalhe: " + message,
        createdAt: new Date()
      }]);
    } finally {
      setSending(false);
    }
  }

  if (checkingSession) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4D9AFF" />
          <Text style={styles.loadingText}>Verificando sua sessão...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <KeyboardAvoidingView style={styles.authContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.logo}><Text style={styles.logoText}>N</Text></View>
          <Text style={styles.brand}>NERO CONTINUUM</Text>
          <Text style={styles.authSubtitle}>Entre para acessar seu assistente pessoal.</Text>
          <TextInput
            style={styles.authInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Seu e-mail"
            placeholderTextColor="#7F8AA3"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <TextInput
            style={styles.authInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Sua senha"
            placeholderTextColor="#7F8AA3"
            secureTextEntry
            autoComplete="password"
          />
          <TouchableOpacity style={styles.primaryButton} onPress={signIn} disabled={authBusy}>
            {authBusy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Entrar</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={signUp} disabled={authBusy}>
            <Text style={styles.secondaryButtonText}>Criar conta alpha</Text>
          </TouchableOpacity>
          <Text style={styles.authFootnote}>Sua sessão é armazenada com segurança no dispositivo. Nunca compartilhe sua senha ou códigos de acesso.</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoSmall}><Text style={styles.logoText}>N</Text></View>
            <View>
              <Text style={styles.brand}>NERO</Text>
              <Text style={styles.subtitle}>CONTINUUM · ALPHA</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutText}>SAIR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>ASSISTENTE UNIVERSAL</Text>
          <Text style={styles.greeting}>Como posso ajudar?</Text>
          <Text style={styles.heroCopy}>Técnico quando necessário. Natural em qualquer conversa.</Text>
        </View>

        <View style={styles.modeRow}>
          <View style={styles.modeCard}>
            <Text style={styles.modeLabel}>AGENTE</Text>
            <Text style={styles.modeValue}>Nero</Text>
          </View>
          <View style={styles.modeCard}>
            <Text style={styles.modeLabel}>CONEXÃO</Text>
            <Text style={styles.modeValue}>Backend seguro</Text>
          </View>
        </View>

        <ScrollView style={styles.messages} contentContainerStyle={styles.messageContent} keyboardShouldPersistTaps="handled">
          {messages.map(message => (
            <View key={message.id} style={[styles.bubble, message.role === "user" ? styles.userBubble : styles.assistantBubble]}>
              <Text style={styles.messageRole}>{message.role === "user" ? "VOCÊ" : "NERO"}</Text>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
          {sending && (
            <View style={[styles.bubble, styles.assistantBubble, styles.thinkingBubble]}>
              <ActivityIndicator size="small" color="#9CC5FF" />
              <Text style={styles.thinkingText}>Nero está pensando...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder="Converse com o Nero..."
            placeholderTextColor="#7F8AA3"
            multiline
            editable={!sending}
          />
          <TouchableOpacity style={[styles.sendButton, sending && styles.disabledButton]} onPress={sendMessage} disabled={sending || !draft.trim()}>
            <Text style={styles.sendGlyph}>➤</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>ALPHA PRIVADA · {session.user.email ?? "USUÁRIO AUTENTICADO"}</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B1020" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { color: "#9AA7BD", marginTop: 14 },
  authContainer: { flex: 1, justifyContent: "center", paddingHorizontal: 28 },
  logo: { width: 62, height: 62, borderRadius: 18, backgroundColor: "#1B6BFF", alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 18 },
  logoText: { color: "#FFFFFF", fontSize: 29, fontWeight: "800" },
  brand: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", letterSpacing: 2, textAlign: "center" },
  authSubtitle: { color: "#9AA7BD", textAlign: "center", marginTop: 10, marginBottom: 28, fontSize: 14 },
  authInput: { backgroundColor: "#141E31", borderWidth: 1, borderColor: "#293852", borderRadius: 13, color: "#FFFFFF", padding: 15, marginBottom: 12, fontSize: 15 },
  primaryButton: { backgroundColor: "#1B6BFF", borderRadius: 13, minHeight: 50, alignItems: "center", justifyContent: "center", marginTop: 8 },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 15 },
  secondaryButton: { alignItems: "center", padding: 16 },
  secondaryButtonText: { color: "#9CC5FF", fontWeight: "700" },
  authFootnote: { color: "#687792", fontSize: 11, textAlign: "center", lineHeight: 17, marginTop: 22 },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { minHeight: 72, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#202A40" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  logoSmall: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#1B6BFF", alignItems: "center", justifyContent: "center" },
  subtitle: { color: "#8290AA", fontSize: 8, letterSpacing: 1.4, marginTop: 2 },
  logoutButton: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 10, backgroundColor: "#18243A" },
  logoutText: { color: "#A9B9D4", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  hero: { paddingTop: 27, paddingBottom: 18 },
  eyebrow: { color: "#4D9AFF", fontSize: 10, fontWeight: "700", letterSpacing: 2 },
  greeting: { color: "#FFFFFF", fontSize: 27, fontWeight: "700", marginTop: 8 },
  heroCopy: { color: "#9AA7BD", fontSize: 13, marginTop: 6 },
  modeRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  modeCard: { flex: 1, padding: 13, borderRadius: 14, backgroundColor: "#121B2E", borderWidth: 1, borderColor: "#24314B" },
  modeLabel: { color: "#7F8DA8", fontSize: 9, letterSpacing: 1, fontWeight: "700" },
  modeValue: { color: "#DCE8FF", fontSize: 15, fontWeight: "700", marginTop: 5 },
  messages: { flex: 1 },
  messageContent: { gap: 12, paddingBottom: 14 },
  bubble: { maxWidth: "90%", padding: 14, borderRadius: 16 },
  assistantBubble: { alignSelf: "flex-start", backgroundColor: "#151F33", borderWidth: 1, borderColor: "#263653", borderTopLeftRadius: 5 },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#174FAE", borderTopRightRadius: 5 },
  messageRole: { color: "#8EAEDE", fontSize: 9, fontWeight: "800", letterSpacing: 1, marginBottom: 6 },
  messageText: { color: "#F2F6FF", fontSize: 14, lineHeight: 21 },
  thinkingBubble: { flexDirection: "row", alignItems: "center", gap: 9 },
  thinkingText: { color: "#AFC4E8", fontSize: 12 },
  composer: { flexDirection: "row", alignItems: "center", gap: 9, padding: 9, backgroundColor: "#141E31", borderRadius: 18, borderWidth: 1, borderColor: "#293852" },
  input: { flex: 1, color: "#FFFFFF", fontSize: 14, maxHeight: 90, paddingVertical: 8, paddingHorizontal: 5 },
  sendButton: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#1B6BFF", alignItems: "center", justifyContent: "center" },
  disabledButton: { opacity: 0.45 },
  sendGlyph: { color: "#FFFFFF", fontSize: 19, fontWeight: "700" },
  footer: { color: "#596781", textAlign: "center", fontSize: 8, letterSpacing: 1.1, paddingVertical: 12 }
});
