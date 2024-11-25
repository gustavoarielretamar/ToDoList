import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <div className="App-theader">
        <h1>To Do List!</h1>
      </div>
      <div className="App-tbody">
        <Form />
      </div>
    </div>
  );
}

export default App;
