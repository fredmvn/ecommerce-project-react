import "./App.css";
import LoginForm from "./components/LoginForm";

/* 5f. Create a new React Setup using npx create-vite@version (use the same version of create-vite as the lesson). Name it login-form.
- Move the LoginForm from exercise 4e into to this new setup (if needed get the code for exercise 4d and 4e from the solutions)
- Separate the code into JSX and CSS files (one file per component
- Run the project using npm install and then npm run dev 
*/

// For next challenge exercises check the 'chatbot-project' file

function App() {
  return (
    <div className="app-container">
      <p>Hello, welcome to my website</p>
      <LoginForm />
    </div>
  );
}

export default App;
