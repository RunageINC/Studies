import { PARAGRAPH, LINK } from "./elementConstants";

export const posts = [
  {
    id: 1,
    title: "First Post",
    content: [
      {
        type: PARAGRAPH,
        content: "This is the first post content",
      },
      {
        type: LINK,
        content: "Visit our website at https://www.example.com",
      },
    ],
    publishedAt: new Date(),
    author: {
      id: 1,
      name: "John Doe",
      avatarUrl: `https://robohash.org/1`,
      role: "Web Developer",
    },
  },
  {
    id: 2,
    title: "Exploring JavaScript",
    content: [
      {
        type: PARAGRAPH,
        content:
          "JavaScript is a versatile language that powers the web. It can be used for both frontend and backend development.",
      },
      {
        type: LINK,
        content:
          "Learn more about JavaScript at https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
    ],
    publishedAt: new Date("2022-07-08 13:57:00"),
    author: {
      id: 2,
      name: "Jane Smith",
      avatarUrl: `https://robohash.org/2`,
      role: "Full-Stack Developer",
    },
  },
  {
    id: 3,
    title: "Introduction to React",
    content: [
      {
        type: PARAGRAPH,
        content:
          "React is a popular JavaScript library for building user interfaces, especially single-page applications.",
      },
      {
        type: LINK,
        content:
          "Get started with React at https://reactjs.org/docs/getting-started.html",
      },
    ],
    publishedAt: new Date("2022-12-20 08:28:00"),
    author: {
      id: 3,
      name: "Emily Davis",
      avatarUrl: `https://robohash.org/3`,
      role: "Frontend Engineer",
    },
  },
  {
    id: 4,
    title: "Understanding Node.js",
    content: [
      {
        type: PARAGRAPH,
        content:
          "Node.js allows developers to use JavaScript on the server-side to build scalable and high-performance applications.",
      },
      {
        type: LINK,
        content: "Discover more about Node.js at https://nodejs.org/en/docs/",
      },
    ],
    publishedAt: new Date("2024-06-16 00:35:00"),
    author: {
      id: 4,
      name: "Michael Johnson",
      avatarUrl: `https://robohash.org/4`,
      role: "Backend Developer",
    },
  },
  {
    id: 5,
    title: "CSS for Modern Web Design",
    content: [
      {
        type: PARAGRAPH,
        content:
          "CSS is essential for styling websites, providing the ability to create visually appealing and responsive designs.",
      },
      {
        type: LINK,
        content: "Check out CSS resources at https://css-tricks.com/",
      },
    ],
    publishedAt: new Date("2023-03-15 09:35:00"),
    author: {
      id: 5,
      name: "Sophia Lee",
      avatarUrl: `https://robohash.org/5`,
      role: "UI/UX Designer",
    },
  },
];

export const comments = [
  {
    id: 1,
    postId: 1,
    author: {
      name: "User123",
      avatarUrl: `https://robohash.org/6`,
    },
    content: "Great post! I really enjoyed learning about JavaScript.",
    commentedAt: new Date("2022-07-10 15:30:00"),
    likes: 15,
  },
  {
    id: 2,
    postId: 2,
    author: {
      name: "JohnDoe456",
      avatarUrl: `https://robohash.org/7`,
    },
    content:
      "I completely agree with you. JavaScript is a great language for building web applications.",
    commentedAt: new Date("2022-07-12 10:05:00"),
    likes: 22,
  },
  {
    id: 3,
    postId: 3,
    author: {
      name: "JaneSmith789",
      avatarUrl: `https://robohash.org/8`,
    },
    content:
      "I agree with you too. React is a great library for building user interfaces.",
    commentedAt: new Date("2022-07-15 18:45:00"),
    likes: 18,
  },
  {
    id: 4,
    postId: 4,
    author: {
      name: "MikeJohnson007",
      avatarUrl: `https://robohash.org/9`,
    },
    content:
      "I love how React helps with building scalable and maintainable applications.",
    commentedAt: new Date("2022-07-18 09:20:00"),
    likes: 25,
  },
  {
    id: 5,
    postId: 5,
    author: {
      name: "EmilyDavis123",
      avatarUrl: `https://robohash.org/10`,
    },
    content:
      "I agree with you. CSS is essential for creating visually appealing and responsive designs.",
    commentedAt: new Date("2022-07-20 12:35:00"),
    likes: 12,
  },
  {
    id: 6,
    postId: 1,
    author: {
      name: "SarahThompson456",
      avatarUrl: `https://robohash.org/11`,
    },
    content:
      "I completely agree with you. JavaScript is a great language for building web applications.",
    commentedAt: new Date("2022-07-11 17:15:00"),
    likes: 10,
  },
  {
    id: 7,
    postId: 2,
    author: {
      name: "DavidWilliams789",
      avatarUrl: `https://robohash.org/12`,
    },
    content:
      "I agree with you too. React is a great library for building user interfaces.",
    commentedAt: new Date("2022-07-13 11:45:00"),
    likes: 14,
  },
  {
    id: 8,
    postId: 3,
    author: {
      name: "EmmaBrown007",
      avatarUrl: `https://robohash.org/13`,
    },
    content:
      "I love how React helps with building scalable and maintainable applications.",

    commentedAt: new Date("2022-07-16 14:20:00"),
    likes: 16,
  },
  {
    id: 9,
    postId: 4,
    author: {
      name: "OliviaMiller123",
      avatarUrl: `https://robohash.org/14`,
    },
    content:
      "I agree with you. CSS is essential for creating visually appealing and responsive designs.",

    commentedAt: new Date("2022-07-19 09:35:00"),
    likes: 18,
  },
  {
    id: 10,
    postId: 5,
    author: {
      name: "DanielTaylor456",
      avatarUrl: `https://robohash.org/15`,
    },
    content:
      "I completely agree with you. JavaScript is a great language for building web applications.",
    commentedAt: new Date("2022-07-21 12:15:00"),
    likes: 20,
  },
];
