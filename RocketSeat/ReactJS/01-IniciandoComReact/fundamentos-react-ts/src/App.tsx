import { Header } from "./components/Header";

import "./global.css";

import styles from "./App.module.css";

import { posts, comments } from "./seed";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

function App() {
  const { wrapper } = styles;
  return (
    <>
      <Header />
      <div className={wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            const filteredComments = comments.filter(comment => comment.postId === post.id);

            return (
              <Post
                key={post.id}
                postContent={post}
                comments={filteredComments} />
            );
          })}
        </main>
      </div>
    </>
  )
}

export default App;