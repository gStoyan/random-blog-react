interface CreateBlogData {
  title: string;
  content: string;
  tags: string[];
}

export async function createBlog(
  data: CreateBlogData,
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const response = await fetch(
      "https://randomblog.grancharovstoyan.deno.net/api/blogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
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
    const response = await fetch(
      `https://randomblog.grancharovstoyan.deno.net/api/blogs/${slug}`,
      {
        method: "DELETE",
      },
    );

    if (response.status === 204) {
      return { success: true };
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
