import User from "../Models/User";
import useFetch from "../Hooks/useFetch";

const UserStatistics = () => {
    //test data for users
    // //TODO: replace with actual data

    const users: User[] = useFetch("users").data;
    const userBlogs =  getUsersBlogs();
    const activeUsers = getActiveUsers();

    function getUsersBlogs(){
      let result = users.map(user => ({
        id: user.id,
        name: user.name,
        blogCount: user.blogs.length,
    }));
    return result;
    };

    function getActiveUsers(){
      let result = users.filter(user => user.blogs.length > 1);
      return result;
    }

    return (
        <div>
          <h2>User Statistics</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Blog Count</th>
              </tr>
            </thead>
            <tbody>
              {userBlogs.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Active Users</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default UserStatistics;