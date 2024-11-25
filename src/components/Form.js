import React, { useState } from "react";

function Form() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");

    // Añadir una nueva tarea
    function handleSubmit(event) {
        event.preventDefault();
        if (task.trim() !== "") {
            setTodos([{ text: task, completed: false }, ...todos]);
            setTask("");
        }
    }

    // Cambiar el estado de completado de una tarea
    function handleCheck(index) {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    }

    // Eliminar una tarea
    function handleDelete(index) {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    }

    // Activar el modo edición para una tarea
    function handleEdit(index) {
        setEditIndex(index);
        setEditText(todos[index].text);
    }

    // Guardar los cambios de la tarea editada
    function handleSaveEdit(event) {
        event.preventDefault();
        const updatedTodos = todos.map((todo, i) =>
            i === editIndex ? { ...todo, text: editText } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditText("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="What’s next?"
                    type="text"
                    className="input"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
                <button type="submit" className="submit-btn">➕</button>
            </form>

            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleCheck(index)}
                        />
                        {editIndex === index ? (
                            <form onSubmit={handleSaveEdit} style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(event) => setEditText(event.target.value)}
                                    style={{ marginRight: "10px" }}
                                />
                                <button type="submit" className="save-btn">💾</button>
                            </form>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed ? "line-through" : "none",
                                        color: todo.completed ? "gray" : "black",
                                        marginRight: "10px",
                                        flex: 1,
                                    }}
                                >
                                    {todo.text}
                                </span>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(index)}
                                >
                                    🗑️
                                </button>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(index)}
                                >
                                    ✏️
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Form;
