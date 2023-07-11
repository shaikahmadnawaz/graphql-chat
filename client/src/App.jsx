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
