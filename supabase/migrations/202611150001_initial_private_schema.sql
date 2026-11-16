-- Nero Continuum: initial private data model
-- Apply in Supabase SQL Editor or through Supabase CLI migrations.
-- All user-owned records are isolated by auth.uid(); no client-side service key is required.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(display_name) <= 80),
  preferred_language text not null default 'pt-BR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text check (title is null or char_length(title) <= 160),
  assistant_mode text not null default 'nero' check (assistant_mode in ('nero', 'nyx')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists conversations_user_updated_idx
  on public.conversations (user_id, updated_at desc);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null check (char_length(content) <= 100000),
  agent text check (agent is null or agent in ('nero', 'nyx', 'rafael', 'system')),
  created_at timestamptz not null default now(),
  constraint messages_conversation_user_unique unique (conversation_id, id)
);
create index if not exists messages_conversation_created_idx
  on public.messages (conversation_id, created_at asc);

create table if not exists public.private_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  memory_key text not null check (char_length(memory_key) between 1 and 120),
  memory_value text not null check (char_length(memory_value) <= 20000),
  source_conversation_id uuid references public.conversations(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, memory_key)
);
create index if not exists private_memories_user_updated_idx
  on public.private_memories (user_id, updated_at desc);

create table if not exists public.user_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_label text check (device_label is null or char_length(device_label) <= 100),
  device_type text not null check (device_type in ('phone', 'tablet', 'watch', 'smart_glasses', 'other')),
  platform text check (platform is null or platform in ('android', 'ios', 'web', 'other')),
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, id)
);

create table if not exists public.user_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null check (consent_type in ('voice_processing', 'notifications', 'memory_storage', 'cross_device_sync', 'analytics')),
  granted boolean not null,
  policy_version text not null check (char_length(policy_version) <= 40),
  recorded_at timestamptz not null default now()
);
create index if not exists user_consents_user_type_recorded_idx
  on public.user_consents (user_id, consent_type, recorded_at desc);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists conversations_set_updated_at on public.conversations;
create trigger conversations_set_updated_at before update on public.conversations
for each row execute function public.set_updated_at();
drop trigger if exists private_memories_set_updated_at on public.private_memories;
create trigger private_memories_set_updated_at before update on public.private_memories
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.private_memories enable row level security;
alter table public.user_devices enable row level security;
alter table public.user_consents enable row level security;

create policy profiles_select_own on public.profiles
for select to authenticated using (id = (select auth.uid()));
create policy profiles_insert_own on public.profiles
for insert to authenticated with check (id = (select auth.uid()));
create policy profiles_update_own on public.profiles
for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy conversations_select_own on public.conversations
for select to authenticated using (user_id = (select auth.uid()));
create policy conversations_insert_own on public.conversations
for insert to authenticated with check (user_id = (select auth.uid()));
create policy conversations_update_own on public.conversations
for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy conversations_delete_own on public.conversations
for delete to authenticated using (user_id = (select auth.uid()));

create policy messages_select_own on public.messages
for select to authenticated using (
  user_id = (select auth.uid()) and exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.user_id = (select auth.uid())
  )
);
create policy messages_insert_own on public.messages
for insert to authenticated with check (
  user_id = (select auth.uid()) and exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.user_id = (select auth.uid())
  )
);
create policy messages_delete_own on public.messages
for delete to authenticated using (user_id = (select auth.uid()));

create policy memories_select_own on public.private_memories
for select to authenticated using (user_id = (select auth.uid()));
create policy memories_insert_own on public.private_memories
for insert to authenticated with check (user_id = (select auth.uid()));
create policy memories_update_own on public.private_memories
for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy memories_delete_own on public.private_memories
for delete to authenticated using (user_id = (select auth.uid()));

create policy devices_select_own on public.user_devices
for select to authenticated using (user_id = (select auth.uid()));
create policy devices_insert_own on public.user_devices
for insert to authenticated with check (user_id = (select auth.uid()));
create policy devices_update_own on public.user_devices
for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy devices_delete_own on public.user_devices
for delete to authenticated using (user_id = (select auth.uid()));

create policy consents_select_own on public.user_consents
for select to authenticated using (user_id = (select auth.uid()));
create policy consents_insert_own on public.user_consents
for insert to authenticated with check (user_id = (select auth.uid()));
create policy consents_delete_own on public.user_consents
for delete to authenticated using (user_id = (select auth.uid()));

-- Deliberately do not grant anon access or create public policies.
-- Do not expose service_role / sb_secret keys in the mobile application.
-- AI provider calls and privileged actions must go through authenticated Edge Functions.
-- Rafael is a security policy/guardian concept, not a database superuser or a bypass.
-- Memory content is private per account; this schema does not encrypt message bodies at rest
-- beyond Supabase's platform storage encryption. Add application-level encryption if required.
