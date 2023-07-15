# A Beginner's Journey into GraphQL: Exploring the Basics

### **Introduction**

Welcome to your journey into the world of GraphQL! Whether you're a web developer looking to enhance your API development skills or just curious about this exciting technology, this beginner-friendly guide will walk you through the basics of GraphQL and help you understand its core concepts.

### **What is GraphQL?**

At its core, GraphQL is a query language and runtime for APIs. It was developed by Facebook and released publicly in 2015. Unlike traditional REST APIs, GraphQL offers a more flexible and efficient approach to fetching and manipulating data from a server.

### **How Does GraphQL Differ from REST?**

In a RESTful API, you typically have multiple endpoints that return predefined data structures. This can result in over-fetching (retrieving more data than needed) or under-fetching (not retrieving enough data). With GraphQL, you can request precisely the data you need, reducing unnecessary data transfers.

GraphQL also provides a strongly-typed schema, allowing clients to understand the available data and perform introspection. This enables powerful tools and developer experiences, such as auto-completion and documentation generation.

### **Advantages of Using GraphQL**

1. **Efficiency**: GraphQL allows you to retrieve multiple resources in a single request, minimizing network overhead.
2. **Flexibility**: Clients can request only the specific fields they need, avoiding over-fetching and reducing the payload size.
3. **Versioning**: With GraphQL, you can introduce new fields and types without breaking existing clients. This eliminates the need for versioning endpoints.
4. **Real-Time Updates**: GraphQL supports real-time data updates through subscriptions, allowing clients to receive data changes in real-time.

### **GraphQL Core Concepts**

Before diving into the practical implementation, let's explore the core concepts of GraphQL:

1. **Schema**: The GraphQL schema defines the available types, fields, and operations in your API. It acts as a contract between the server and clients.
2. **Queries**: Queries are used to retrieve data from the server. They specify the fields and relationships that clients want to fetch.
3. **Mutations**: Mutations allow clients to modify data on the server. Examples include creating, updating, or deleting records.
4. **Subscriptions**: Subscriptions enable real-time updates. Clients can subscribe to specific events and receive data changes as they occur.
5. **Types**: GraphQL has a rich type system, including scalar types (e.g., String, Int, Boolean), object types, interfaces, and unions. These types define the shape and structure of the data in your API.

### **Setting Up a GraphQL Server**

To work with GraphQL, you need a server-side implementation. Some popular options include Apollo Server, GraphQL Yoga, and express-graphql. Choose the one that best fits your tech stack and follow the installation instructions.

Once you have a server in place, you'll need to define your schema using the GraphQL Schema Definition Language (SDL). The schema outlines the types, queries, mutations, and subscriptions available in your API.

### **Querying Data with GraphQL**

In GraphQL, you fetch data by sending queries to the server. A query specifies the fields you want to retrieve and any parameters required. Let's say you have a simple API for fetching user information. Here's an example query:

```graphql
query {
  user(id: 123) {
    id
    name
    email
    posts {
      title
      createdAt
    }
  }
}
```

In this query, we are asking for some information about a user with an ID of 123. It's like asking the server, "Hey, can you give me details about user number 123?"

We want to know the following things about the user:

- `id`: This tells us the user's unique identification number.
- `name`: This gives us the user's name.
- `email`: This gives us the user's email address.

We also want to know about the user's posts. Each post has a `title` and a `createdAt` date. It's like saying, "Can you also give me the titles and creation dates of the user's posts?"

By sending this query to the server, we are asking it to find the user with the ID 123 and give us their ID, name, email, and the titles and creation dates of their posts.

That's the basic idea of how this query works! It helps us get specific information about a user and their posts from the server.

### **Mutating Data with GraphQL**

In addition to fetching data, GraphQL allows you to modify data on the server using mutations. Mutations follow a similar syntax to queries but are used for creating, updating, and deleting data. For example:

```graphql
mutation {
  createUser(name: "Nawaz", email: "nawaz@mail.com") {
    id
    name
    email
  }
}
```

Sure! Let's break down the mutation for a 5-year-old:

```bash
graphqlCopy codemutation {
  createUser(name: "Nawaz", email: "nawaz@mail.com") {
    id
    name
    email
  }
}
```

In this mutation, we are asking the server to create a new user with a name of "Nawaz" and an email of "[**nawaz@mail.com**](mailto:nawaz@mail.com)". It's like telling the server, "Hey, can you please create a new user with the name Nawaz and the email [**nawaz@mail.com**](mailto:nawaz@mail.com)?"

After creating the user, we want to know the following information about the user:

- `id`: This tells us the unique identification number of the newly created user.
- `name`: This gives us the name of the user we just created.
- `email`: This gives us the email address of the user we just created.

By sending this mutation to the server, we are asking it to create a new user with the specified name and email, and then give us back the ID, name, and email of the newly created user.

That's the basic idea of how this mutation works! It helps us create a new user on the server and retrieve the information about the user that was created.

Remember, mutations are used when we want to modify or add data on the server. They allow us to perform actions like creating, updating, or deleting data.

### **Real-Time Updates with Subscriptions**

One of the exciting features of GraphQL is real-time updates through subscriptions. Subscriptions allow clients to subscribe to specific events and receive data changes in real-time. For example, you can subscribe to receive new post notifications:

```graphql
subscription {
  newPost {
    id
    title
    createdAt
  }
}
```

In this subscription, we are telling the server that we want to be notified whenever a new post is created. It's like saying, "Hey, server, can you please let me know whenever there's a new post?"

We want to know the following information about the new post:

- `id`: This tells us the unique identification number of the new post.
- `title`: This gives us the title of the new post.
- `createdAt`: This tells us the date and time when the new post was created.

By sending this subscription to the server, we are asking it to send us the ID, title, and creation date of any new post as soon as it's created. It's like having a special alert that notifies us whenever there's something new to see.

That's the basic idea of how this subscription works! It helps us stay updated and receive real-time notifications about new posts being created on the server.

Remember, subscriptions are a powerful feature of GraphQL that allow us to receive real-time updates and stay connected to the server for dynamic data.

### **Fetching and Adding Hello Messages Example**

To demonstrate the practical implementation of GraphQL, let's build a simple chat application. We'll use Apollo Client in the frontend (React) and Apollo Server in the backend.

#### Backend (Apollo Server):

Start by setting up the backend using the Apollo Server. Install the required dependencies:

```bash
npm install @apollo/server graphql
```

Create a new file named `server.js` and add the following code:

```javascript
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

async function startServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const messages = [];

  const typeDefs = `
    type Message {
      id: ID!
      content: String!
    }

    type Query {
      messages: [Message]
    }

    type Mutation {
      addMessage(content: String!): Message
    }
  `;

  const resolvers = {
    Query: {
      messages: () => messages,
    },
    Mutation: {
      addMessage: (_, { content }) => {
        const message = {
          id: String(messages.length + 1),
          content: content,
        };
        messages.push(message);
        return message;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(5000, () => console.log("Server Started at PORT 5000"));
}

startServer();
```

In this code, we are setting up a server to handle messages for our chat application.

First, we import some special things that help us create the server.

Next, we define a function called `startServer`. This function is like the main part of our server.

Inside `startServer`, we create an `express` app. It's like a special place where our server will live.

We add some extra things to the app, like `body-parser` and `cors`. They help us handle incoming data and allow other websites to talk to our server.

Then, we create an empty list called `messages`. This is where we will store all the messages people send.

We define a special thing called `typeDefs`. It tells the server what kinds of data we have and what we can do with it. In our case, we have a "Message" type with an ID and content, and we can get all the messages or add new messages.

We also define a special thing called `resolvers`. It tells the server how to get the messages and how to add new messages. When someone asks for messages, we give them the list of messages we have. When someone wants to add a new message, we create a new message and add it to the list.

After that, we create a new `ApolloServer`. It's like a boss who manages everything related to our server and handles requests from other places.

We start the server by calling `server.start()`.

We tell our app to use the `/graphql` endpoint and connect it to the Apollo server using `expressMiddleware`.

Finally, we make our server listen on port 5000. It's like saying, "Hey server, start listening for messages at port 5000!"

That's the basic idea of how this code works! It sets up a server using Express and Apollo Server, defines the data structure and operations we can do with messages, and makes the server listen for requests.

#### Frontend (React) with Apollo Client:

Next, set up the frontend with React and Apollo Client. Install the necessary dependencies:

```bash
npm install @apollo/client graphql
```

`App.jsx`:

```javascript
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

// The GraphQL query
const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
    }
  }
`;

// The GraphQL mutation
const ADD_MESSAGE = gql`
  mutation ($content: String!) {
    addMessage(content: $content) {
      id
      content
    }
  }
`;

function App() {
  // Fetching the messages using the useQuery hook
  const { loading, error, data } = useQuery(GET_MESSAGES);

  // The mutation function using the useMutation hook
  const [addMessage] = useMutation(ADD_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.message.value;
    if (content) {
      // Add a new message using the addMessage mutation
      await addMessage({ variables: { content } });
      e.target.message.value = "";
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <h1>GraphQL Chat</h1>
      <ul>
        {data.messages.map((message) => (
          <li className="message" key={message.id}>
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
```

In this code, we are building a simple chat application. Imagine it as a chatbox where people can send messages to each other.

The code uses a special library called Apollo Client that helps us work with GraphQL. GraphQL is a way to get and send data between different parts of our application.

First, we import some things we need to make our chat app work.

Then, we define two special things called `GET_MESSAGES` and `ADD_MESSAGE`. These are like messages we send to the server to ask for data or add new messages.

Next, we have a function called `App`. This function is like the main part of our chat app.

Inside `App`, we use a special function called `useQuery` to get the messages from the server. It's like asking the server, "Hey, can you give me all the messages?"

We also use another special function called `useMutation`. This function helps us add new messages to the server. It's like telling the server, "Hey, I want to send a new message!"

When someone submits a message in the form, we call a function called `handleSubmit`. This function takes the message and sends it to the server using the `addMessage` function we mentioned earlier.

Finally, we show the messages on the screen. Each message is displayed as a list item. We also have a form where people can type a message and send it by clicking the "Send" button.

`main.jsx`:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Create the Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // Replace with your backend GraphQL endpoint
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```

In this code first, we import some special things we need to create our app.

Then, we create an Apollo Client. Think of it as a helper that helps us communicate with the server and fetch data. We tell it where our server is located by providing the `uri` property. It's like telling the client, "Hey, our server is at this web address!"

We also create a cache, which is a place where the client stores data it fetches from the server. It helps make things faster.

Inside the `createRoot` function, we use the `render` function to actually show our app on the screen. We wrap our app with some special components called `React.StrictMode` and `ApolloProvider`. These components help make our app better and communicate with the server using Apollo Client.

Finally, we're done! The app is ready, and it will appear on the screen for people to use and chat with each other.

**Running the Example:**

Start the backend server by running the following command in your terminal:

```bash
node server.js
```

Start the frontend React app by running the following command in another terminal window:

```bash
npm start
```

Now, open your browser and navigate to [`http://localhost:3000`](http://localhost:3000). You should see a simple chat interface where you can enter messages and send them. The messages will be fetched from the backend GraphQL server and displayed dynamically in the React app.

Feel free to modify and enhance this example to suit your needs. Experiment with different features and explore the possibilities of GraphQL in your applications.

### **Conclusion**

Congratulations on completing the beginner's journey into GraphQL! You now have a solid understanding of the basics and core concepts of GraphQL. By using GraphQL, you can create efficient and flexible APIs that empower your clients with precise data requests.

Continue exploring GraphQL's rich features, experiment with different use cases, and leverage the vast resources available to deepen your GraphQL knowledge. Check out the official documentation of Apollo Client and Apollo Server for more in-depth information and advanced features.

Enjoy your GraphQL journey and happy coding!

For a detailed reference and access to the complete code implementation, you can visit my [GitHub repository](https://github.com/shaikahmadnawaz/graphql-chat). The repository contains the backend and frontend code, along with instructions on setting up the project and running it locally.

And don't forget to connect with me on social media to stay updated with the latest tips, tutorials, and guides:

- Connect with me on LinkedIn: [shaikahmadnawaz](https://www.linkedin.com/in/shaikahmadnawaz)
- Follow me on Twitter: [shaikahmadnawaz](https://twitter.com/shaikahmadnawaz)

I also encourage you to check out my GitHub repository for more code samples and projects:

- Explore my GitHub: [**shaikahmadnawaz**](https://github.com/shaikahmadnawaz)
