const UserStatistics = () => {
  return <div>User Statistics</div>;

  // //test data for users
  // // //TODO: replace with actual data
  // const [users, setUsers] = useState<User[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await getAllUsers(); // async function
  //       setUsers(response);
  //     } catch (err: any) {
  //       setError(err.message || "Error fetching users");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  // const userBlogs = getUsersBlogs();
  // const activeUsers = getActiveUsers();
  // function getUsersBlogs() {
  //   let result = users.map((user) => ({
  //     id: user.id,
  //     name: user.name,
  //     blogCount: user.blogs.length,
  //   }));
  //   return result;
  // }
  // function getActiveUsers() {
  //   let result = users.filter((user) => user.blogs.length > 1);
  //   return result;
  // }
  // return (
  //   <div>
  //     <h2>User Statistics</h2>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>User</th>
  //           <th>Blog Count</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {userBlogs.map((user) => (
  //           <tr key={user.id}>
  //             <td>{user.name}</td>
  //             <td>{user.blogCount}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Active Users</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {activeUsers.map((user) => (
  //           <tr key={user.id}>
  //             <td>{user.name}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default UserStatistics;
