import {useEffect, useState} from "react";
import {fetchPosts} from "../api/posts.ts";
import {fetchUsers} from "../api/users.ts";
import type {Post} from "../types/post.ts";
import type {User} from "../types/user.ts";
import PostItem from "../components/PostItem.tsx";
import {useStorePosts} from "../store/useStorePosts.ts";

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [showOnlyFavPosts, setShowOnlyFavPosts] = useState<boolean>(false);

    const { favPosts, clearFavPosts, undoClearFavPosts, temporaryFavPosts } = useStorePosts();

    const showPopup = temporaryFavPosts.length > 0;

    const usersMap = new Map<string, User>(users.map((user) => [user.id, user]));

    const favFilteredPosts = showOnlyFavPosts ? posts.filter((post) => favPosts.includes(post.id)) : posts;
    const filteredPosts = selectedUserId ? favFilteredPosts.filter((post) => selectedUserId === post.userId) : favFilteredPosts;

    useEffect(() => {
        const fetchData = async () => {
            const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);
            setPosts(postsData);
            setUsers(usersData);
        };
        fetchData();
    }, []);

    const addUserIdToFilter = (userId: string) => {
        if (userId === selectedUserId) return;
      setSelectedUserId(userId);
    };

    const resetFilterByUser = () => {
        setSelectedUserId('');
    };

    const toggleOnlyFavPosts = () => {
      setShowOnlyFavPosts((prevState) => !prevState);
    };

    return (
      <div className="p-20">
          <h1 className="mb-4">Posts</h1>
          <div className="flex gap-4 align-items-center">
              {selectedUserId && filteredPosts.length > 0 && (
                  <button
                      onClick={resetFilterByUser}
                      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                      User Filter entfernen
                  </button>
              )}
              {(favPosts.length > 0 || showOnlyFavPosts) && (
                  <button
                      onClick={toggleOnlyFavPosts}
                      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                      {showOnlyFavPosts ? 'Alle anzeigen' : 'Favoriten anzeigen'}
                  </button>
              )}
              {showOnlyFavPosts && filteredPosts.length > 0 && (
                  <button
                      onClick={clearFavPosts}
                      className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                      Alle Favoriten entfernen
                  </button>
              )}
              {showPopup && (
                  <div className="absolute bottom-4 right-4 bg-gray-900 text-white rounded-lg shadow-lg px-6 py-4 flex items-center gap-4 animate-fade-in">
                      <span>Alle Favoriten wurden entfernt.</span>
                      <button
                          className="text-black font-semibold px-3 py-1 rounded hover:bg-gray-400"
                          onClick={undoClearFavPosts}
                      >
                          Rückgängig machen
                      </button>
                  </div>
              )}
          </div>
          {filteredPosts.length > 0 ? (
              <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post) => {
                      const user = usersMap.get(post.userId);
                      return (
                          <li key={post.id}>
                              <PostItem data={{ post, user }} onFilterByUser={addUserIdToFilter} />
                          </li>
                      );
                  })}
              </ul>
          ) : <p>Liste ist leer.</p>}
      </div>
    );
};