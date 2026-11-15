import "react-native-url-polyfill/auto";
import { Platform } from "react-native";
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

const CHUNK_SIZE = 1500;
const memoryStorage = new Map<string, string>();

// SecureStore values are kept small to avoid platform-specific item-size limits.
// Native session JSON is split into encrypted OS-keystore entries.
const secureSessionStorage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") return memoryStorage.get(key) ?? null;
    const metadata = await SecureStore.getItemAsync(`${key}.meta`);
    if (!metadata) return null;
    const count = Number(metadata);
    if (!Number.isInteger(count) || count < 1 || count > 32) {
      await this.removeItem(key);
      return null;
    }
    const chunks = await Promise.all(
      Array.from({ length: count }, (_, index) =>
        SecureStore.getItemAsync(`${key}.chunk.${index}`)
      )
    );
    if (chunks.some((chunk) => chunk === null)) {
      await this.removeItem(key);
      return null;
    }
    return chunks.join("");
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      memoryStorage.set(key, value);
      return;
    }
    const count = Math.ceil(value.length / CHUNK_SIZE);
    if (count < 1 || count > 32) throw new Error("Supabase session exceeds secure storage capacity.");
    const previous = Number(await SecureStore.getItemAsync(`${key}.meta`) || "0");
    for (let index = 0; index < count; index += 1) {
      await SecureStore.setItemAsync(
        `${key}.chunk.${index}`,
        value.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE)
      );
    }
    await SecureStore.setItemAsync(`${key}.meta`, String(count));
    for (let index = count; index < previous; index += 1) {
      await SecureStore.deleteItemAsync(`${key}.chunk.${index}`);
    }
  },
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      memoryStorage.delete(key);
      return;
    }
    const count = Number(await SecureStore.getItemAsync(`${key}.meta`) || "0");
    await SecureStore.deleteItemAsync(`${key}.meta`);
    for (let index = 0; index < Math.min(Math.max(count, 0), 32); index += 1) {
      await SecureStore.deleteItemAsync(`${key}.chunk.${index}`);
    }
  }
};

export const supabase = createClient(
  supabaseUrl || "https://not-configured.supabase.co",
  supabasePublishableKey || "not-configured",
  {
    auth: {
      storage: secureSessionStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  }
);
