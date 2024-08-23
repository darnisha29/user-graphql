import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

const USERS_QUERY = gql`
  query Query {
    allUsers {
      email
      id
      name
    }
  }
`;

const UserListPage = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p>Error: {error.message}</p></div>;

  const filteredUsers = data.allUsers.filter((user: { name: string }) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-700">User Directory</h1>
        
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search users by name..."
            className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedUsers.map((user: { id: string; name: string; email: string }) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                  <td className="py-4 px-6">{user.id}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            className={`px-5 py-2 rounded-lg shadow-md transition duration-200 ${
              currentPage === 1 ? 'bg-gray-300' : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
          <button
            className={`px-5 py-2 rounded-lg shadow-md transition duration-200 ${
              currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
