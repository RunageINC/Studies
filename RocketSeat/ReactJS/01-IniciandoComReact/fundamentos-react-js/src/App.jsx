import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import "./global.css";

import { wrapper } from "./App.module.css";

import { posts, comments } from "./seed";

function App() {
  return (
    <>
      <Header />
      <div className={wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            const filteredComments = comments.filter(
              (comment) => comment.postId === post.id
            );

            return (
              <Post
                key={post.id}
                postContent={post}
                comments={filteredComments}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
