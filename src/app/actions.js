"use server";

import { toggleCarLike as serviceToggleCarLike } from "@/services/carService";
import { revalidatePath } from "next/cache";

export async function toggleCarLikeAction(id, newLikedStatus) {
  try {
    const result = await serviceToggleCarLike(id, newLikedStatus);
    // Revalidate paths so the UI updates
    revalidatePath("/");
    revalidatePath("/cars");
    return { success: true, data: result };
  } catch (error) {
    console.error("Server Action Error:", error.response?.data || error.message);
    return { success: false, error: "Failed to update", details: error.response?.data };
  }
}
