interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default Blog;
