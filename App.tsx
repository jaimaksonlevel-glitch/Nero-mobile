import React, { useState } from "react";
import {
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
import { neroPersona } from "./src/config/persona";
import type { ChatMessage } from "./src/types/chat";

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Olá! Eu sou o Nero. Posso ajudar com engenharia elétrica, projetos, diagnósticos e também conversar. O que vamos resolver hoje?",
    createdAt: new Date()
  }
];

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text,
      createdAt: new Date()
    };

    setMessages((current) => [...current, userMessage]);
    setDraft("");
  }

  function openVoiceInfo() {
    Alert.alert(
      "Comando de voz",
      "A interface de voz está preparada. O reconhecimento contínuo e a palavra de ativação “Nero” serão ligados na próxima etapa, com as permissões de microfone e o serviço de voz."
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logo}><Text style={styles.logoText}>N</Text></View>
            <View>
              <Text style={styles.brand}>NERO</Text>
              <Text style={styles.subtitle}>ASSISTENTE INTELIGENTE</Text>
            </View>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>PRONTO</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>LEVEL ENGENHARIA</Text>
          <Text style={styles.greeting}>Como posso ajudar?</Text>
          <Text style={styles.heroCopy}>Seu assistente técnico e pessoal, em um só lugar.</Text>
        </View>

        <View style={styles.modeRow}>
          <View style={styles.modeCard}>
            <Text style={styles.modeLabel}>ATIVAÇÃO</Text>
            <Text style={styles.modeValue}>Wake</Text>
          </View>
          <View style={styles.modeCard}>
            <Text style={styles.modeLabel}>PERSONALIDADE</Text>
            <Text style={styles.modeValue}>Hybrid</Text>
          </View>
        </View>

        <ScrollView
          style={styles.messages}
          contentContainerStyle={styles.messageContent}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.bubble,
                message.role === "user" ? styles.userBubble : styles.assistantBubble
              ]}
            >
              <Text style={styles.messageRole}>
                {message.role === "user" ? "VOCÊ" : "NERO"}
              </Text>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.composer}>
          <TouchableOpacity style={styles.micButton} onPress={openVoiceInfo} accessibilityLabel="Ativar voz">
            <Text style={styles.micGlyph}>◉</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder="Converse com o Nero..."
            placeholderTextColor="#7F8AA3"
            multiline
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} accessibilityLabel="Enviar mensagem">
            <Text style={styles.sendGlyph}>➤</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>NERO MOBILE · VERSÃO 0.1.0</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B1020" },
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    minHeight: 72, flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#202A40"
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  logo: {
    width: 42, height: 42, borderRadius: 13, backgroundColor: "#1B6BFF",
    alignItems: "center", justifyContent: "center"
  },
  logoText: { color: "#FFFFFF", fontSize: 25, fontWeight: "800" },
  brand: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", letterSpacing: 2 },
  subtitle: { color: "#8290AA", fontSize: 8, letterSpacing: 1.4, marginTop: 2 },
  statusPill: {
    flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10,
    paddingVertical: 6, borderRadius: 20, backgroundColor: "#142B2B"
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#3DDC97" },
  statusText: { color: "#8BE4BD", fontSize: 9, fontWeight: "700", letterSpacing: 1 },
  hero: { paddingTop: 27, paddingBottom: 18 },
  eyebrow: { color: "#4D9AFF", fontSize: 10, fontWeight: "700", letterSpacing: 2 },
  greeting: { color: "#FFFFFF", fontSize: 27, fontWeight: "700", marginTop: 8 },
  heroCopy: { color: "#9AA7BD", fontSize: 13, marginTop: 6 },
  modeRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  modeCard: {
    flex: 1, padding: 13, borderRadius: 14, backgroundColor: "#121B2E",
    borderWidth: 1, borderColor: "#24314B"
  },
  modeLabel: { color: "#7F8DA8", fontSize: 9, letterSpacing: 1, fontWeight: "700" },
  modeValue: { color: "#DCE8FF", fontSize: 15, fontWeight: "700", marginTop: 5 },
  messages: { flex: 1 },
  messageContent: { gap: 12, paddingBottom: 14 },
  bubble: { maxWidth: "90%", padding: 14, borderRadius: 16 },
  assistantBubble: {
    alignSelf: "flex-start", backgroundColor: "#151F33",
    borderWidth: 1, borderColor: "#263653", borderTopLeftRadius: 5
  },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#174FAE", borderTopRightRadius: 5 },
  messageRole: { color: "#8EAEDE", fontSize: 9, fontWeight: "800", letterSpacing: 1, marginBottom: 6 },
  messageText: { color: "#F2F6FF", fontSize: 14, lineHeight: 21 },
  composer: {
    flexDirection: "row", alignItems: "center", gap: 9, padding: 9,
    backgroundColor: "#141E31", borderRadius: 18, borderWidth: 1, borderColor: "#293852"
  },
  micButton: {
    width: 42, height: 42, borderRadius: 13, backgroundColor: "#1D3761",
    alignItems: "center", justifyContent: "center"
  },
  micGlyph: { color: "#9CC5FF", fontSize: 21 },
  input: { flex: 1, color: "#FFFFFF", fontSize: 14, maxHeight: 90, paddingVertical: 8 },
  sendButton: {
    width: 42, height: 42, borderRadius: 13, backgroundColor: "#1B6BFF",
    alignItems: "center", justifyContent: "center"
  },
  sendGlyph: { color: "#FFFFFF", fontSize: 19, fontWeight: "700" },
  footer: { color: "#596781", textAlign: "center", fontSize: 8, letterSpacing: 1.4, paddingVertical: 12 }
});
