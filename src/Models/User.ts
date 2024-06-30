import Blog from "./Blog";

interface User{
    id: number;
    name: string;
    email: string;
    dateOfBirth: string;
    blogs: Array<Blog>;
}

export default User;