import { DBClientType } from "../../config/dbInstance";
import { SupabaseClient } from "@supabase/supabase-js";

export type AppVariables = {
  dbClient: DBClientType;
  supabaseClient: SupabaseClient;
};
