import { getSupabaseAdmin } from "./supabaseAdmin";

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  nationality: string;
  experience_level: string;
  bio: string;
  avatar_url: string;
  created_at: string;
};

type UserWithHash = UserProfile & { password_hash: string };

export async function createUser(data: {
  email: string;
  password_hash: string;
  full_name: string;
  phone?: string;
  nationality?: string;
  experience_level?: string;
}): Promise<UserProfile> {
  const supabase = getSupabaseAdmin();
  const { data: user, error } = await supabase
    .from("yogmandu_users")
    .insert({ ...data, email: data.email.toLowerCase().trim() })
    .select("id, email, full_name, phone, nationality, experience_level, bio, avatar_url, created_at")
    .single();
  if (error) throw new Error(error.code === "23505" ? "Email already registered." : error.message);
  return user as UserProfile;
}

export async function getUserByEmail(email: string): Promise<UserWithHash | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_users")
    .select("id, email, full_name, phone, nationality, experience_level, bio, avatar_url, created_at, password_hash")
    .eq("email", email.toLowerCase().trim())
    .single();
  if (error || !data) return null;
  return data as UserWithHash;
}

export async function getUserById(id: string): Promise<UserProfile | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_users")
    .select("id, email, full_name, phone, nationality, experience_level, bio, avatar_url, created_at")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data as UserProfile;
}

export async function updateUserProfile(
  id: string,
  updates: Partial<Pick<UserProfile, "full_name" | "phone" | "nationality" | "experience_level" | "bio" | "avatar_url">>
): Promise<UserProfile | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_users")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id, email, full_name, phone, nationality, experience_level, bio, avatar_url, created_at")
    .single();
  if (error || !data) return null;
  return data as UserProfile;
}
