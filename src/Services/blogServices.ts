import { buildApiUrl } from "./apiConfig";

interface CreateBlogData {
  title: string;
  content: string;
  tags: string[];
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function createBlog(
  data: CreateBlogData,
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const response = await fetch(buildApiUrl("/api/blogs"), {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      return {
        success: false,
        error: "You must be logged in to create a blog post.",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

export async function deleteBlog(
  slug: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(buildApiUrl(`/api/blogs/${slug}`), {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (response.status === 204) {
      return { success: true };
    }

    if (response.status === 401) {
      return {
        success: false,
        error: "You must be logged in to delete a blog post.",
      };
    }

    if (response.status === 404) {
      const data = await response.json();
      return { success: false, error: data.error || "Blog not found." };
    }

    return { success: false, error: "An unexpected error occurred." };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
}
