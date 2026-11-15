import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
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
import * as Speech from "expo-speech";
import { neroPersona } from "./src/config/persona";
import { askNero } from "./src/services/neroApi";
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
  const [isThinking, setIsThinking] = useState(false);
  const [voiceRepliesEnabled, setVoiceRepliesEnabled] = useState(false);

  useEffect(() => () => {
    Speech.stop();
  }, []);

  function toggleVoiceReplies() {
    setVoiceRepliesEnabled((enabled) => {
      if (enabled) Speech.stop();
      return !enabled;
    });
  }

  async function sendMessage() {
    const text = draft.trim();
    if (!text || isThinking) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text,
      createdAt: new Date()
    };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setDraft("");
    setIsThinking(true);

    try {
      const result = await askNero(conversation);
      setMessages((current) => [
        ...current,
        {
          id: `nero-${Date.now()}`,
          role: "assistant",
          text: result.reply,
          createdAt: new Date(),
          sources: result.sources
        }
      ]);
      if (voiceRepliesEnabled) {
        Speech.stop();
        Speech.speak(result.reply, {
          language: "pt-BR",
          rate: 0.95,
          pitch: 1.0,
          onError: () => Alert.alert(
            "Áudio indisponível",
            "Não foi possível reproduzir a resposta. Verifique as configurações de voz do aparelho."
          )
        });
      }
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Ocorreu um erro inesperado.";
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          text: message,
          createdAt: new Date()
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  function openVoiceInfo() {
    Alert.alert(
      "Voz do Nero",
      "A saída de voz usa a síntese de fala disponível no próprio aparelho. Ela só é ativada quando você liga o botão VOZ. O microfone não é utilizado nesta etapa."
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
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.voiceToggle, voiceRepliesEnabled && styles.voiceToggleOn]}
              onPress={toggleVoiceReplies}
              accessibilityRole="switch"
              accessibilityState={{ checked: voiceRepliesEnabled }}
              accessibilityLabel="Ativar respostas faladas"
            >
              <Text style={[styles.voiceToggleText, voiceRepliesEnabled && styles.voiceToggleTextOn]}>
                VOZ {voiceRepliesEnabled ? "ON" : "OFF"}
              </Text>
            </TouchableOpacity>
            <View style={styles.statusPill}>
              <View style={[styles.statusDot, isThinking && styles.thinkingDot]} />
              <Text style={styles.statusText}>{isThinking ? "PENSANDO" : "PRONTO"}</Text>
            </View>
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
            <Text style={styles.modeValue}>{neroPersona.personality === "hybrid" ? "Hybrid" : "Custom"}</Text>
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
              {!!message.sources?.length && (
                <View style={styles.sourcesBox}>
                  <Text style={styles.sourcesTitle}>FONTES CONSULTADAS</Text>
                  {message.sources.map((source, index) => (
                    <TouchableOpacity
                      key={source.url}
                      onPress={() => Linking.openURL(source.url).catch(() =>
                        Alert.alert("Não foi possível abrir o link", "Verifique a conexão do aparelho.")
                      )}
                      accessibilityRole="link"
                      accessibilityLabel={`Abrir fonte: ${source.title}`}
                      style={styles.sourceLink}
                    >
                      <Text style={styles.sourceNumber}>[{index + 1}]</Text>
                      <Text style={styles.sourceText}>{source.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
          {isThinking && (
            <View style={[styles.bubble, styles.assistantBubble, styles.loadingBubble]}>
              <ActivityIndicator color="#75AFFF" size="small" />
              <Text style={styles.loadingText}>Nero está pensando...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.composer}>
          <TouchableOpacity style={styles.micButton} onPress={openVoiceInfo} accessibilityLabel="Informações sobre voz">
            <Text style={styles.micGlyph}>◉</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder="Converse com o Nero..."
            placeholderTextColor="#7F8AA3"
            multiline
            editable={!isThinking}
          />
          <TouchableOpacity
            style={[styles.sendButton, isThinking && styles.disabledButton]}
            onPress={sendMessage}
            disabled={isThinking || !draft.trim()}
            accessibilityLabel="Enviar mensagem"
          >
            <Text style={styles.sendGlyph}>➤</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>NERO MOBILE · VERSÃO 0.2.1 · {neroPersona.language.toUpperCase()}</Text>
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
  headerActions: { alignItems: "flex-end", gap: 6 },
  voiceToggle: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12,
    borderWidth: 1, borderColor: "#33415C", backgroundColor: "#172238"
  },
  voiceToggleOn: { borderColor: "#328B70", backgroundColor: "#14382F" },
  voiceToggleText: { color: "#A7B4CC", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  voiceToggleTextOn: { color: "#8BE4BD" },
  statusPill: {
    flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10,
    paddingVertical: 6, borderRadius: 20, backgroundColor: "#142B2B"
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#3DDC97" },
  thinkingDot: { backgroundColor: "#F2B84B" },
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
  sourcesBox: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#33415C", gap: 7 },
  sourcesTitle: { color: "#8EAEDE", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  sourceLink: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  sourceNumber: { color: "#75AFFF", fontSize: 11, fontWeight: "700" },
  sourceText: { color: "#9CC5FF", fontSize: 11, lineHeight: 16, flex: 1, textDecorationLine: "underline" },
  loadingBubble: { flexDirection: "row", alignItems: "center", gap: 10 },
  loadingText: { color: "#9AA7BD", fontSize: 12 },
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
  disabledButton: { opacity: 0.45 },
  sendGlyph: { color: "#FFFFFF", fontSize: 19, fontWeight: "700" },
  footer: { color: "#596781", textAlign: "center", fontSize: 8, letterSpacing: 1.4, paddingVertical: 12 }
});
