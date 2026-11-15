import { useEffect, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "./supabase";

export function useNeroAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (mounted) {
        setSession(error ? null : data.session);
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession);
        setLoading(false);
      }
    });

    const onAppStateChange = (state: AppStateStatus) => {
      if (state === "active") supabase.auth.startAutoRefresh();
      else supabase.auth.stopAutoRefresh();
    };
    const appStateSubscription = AppState.addEventListener("change", onAppStateChange);

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
      appStateSubscription.remove();
    };
  }, []);

  return { session, loading, configured: isSupabaseConfigured };
}

export async function signInWithPassword(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email: email.trim(), password });
}

export async function signUpWithPassword(email: string, password: string) {
  return supabase.auth.signUp({ email: email.trim(), password });
}

export async function signOut() {
  return supabase.auth.signOut();
}
