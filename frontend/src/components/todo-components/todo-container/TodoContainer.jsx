// TodoContainer.jsx
import { useState, useEffect, useContext } from "react";
import TaskItem from "../task-item/TaskItem";
import AddTask from "../add-task/AddTask";
import "../todo-container/todoContainer.css";
import "../../../style/App.css";
import CredentialContext from "../../../context/CredentialContext";

const TodoContainer = () => {
    const { token } = useContext(CredentialContext);
    const [tasks, setTasks] = useState([]);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    const getTasks = async () => {
        if (!token) {
            console.warn("No token found, redirecting...");
            window.location.href = "/login";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/tasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                console.error("Token invalid or expired");
                window.location.href = "/login";
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setTasks(data);
                console.log("Fetched tasks:", data);
            } else {
                console.error("Server error:", response.status);
            }
        } catch (err) {
            console.error("Network error fetching tasks:", err);
        }
    };

    useEffect(() => {
        getTasks();
    }, [token]);

    const toggleDeleteMode = () => {
        setIsDeleteMode(!isDeleteMode);
        setSelectedTasks(new Set());
    };

    const toggleTaskSelection = (taskId) => {
        const idString = String(taskId); // Convert to string for consistency
        setSelectedTasks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(idString)) {
                newSet.delete(idString);
            } else {
                newSet.add(idString);
            }
            console.log("Selected tasks after toggle:", Array.from(newSet));
            return newSet;
        });
    };

    const handleDeleteSelected = async () => {
        if (selectedTasks.size === 0) {
            alert("Please select at least one task to delete");
            return;
        }

        // Convert selected IDs to strings for comparison
        const selectedIdsArray = Array.from(selectedTasks);
        const tasksToDelete = tasks.filter(task => 
            selectedIdsArray.includes(String(task._id))
        );
        const taskNames = tasksToDelete.map(t => t.taskName).join(", ");
        
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${selectedTasks.size} task(s)?\n\n${taskNames}`
        );

        if (!confirmDelete) return;

        try {
            console.log("Deleting task IDs:", selectedIdsArray);

            const response = await fetch("http://localhost:3000/api/tasks/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ taskIds: selectedIdsArray })
            });

            const result = await response.json();
            console.log("Delete response:", result);

            if (response.ok) {
                // Refresh tasks after deletion
                await getTasks();
                setSelectedTasks(new Set());
                setIsDeleteMode(false);
                
                alert(`Successfully deleted ${result.deletedCount} task(s)`);
            } else {
                console.error("Delete failed:", result);
                alert(`Failed to delete tasks: ${result.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error("Error deleting tasks:", err);
            alert("Network error. Please check your connection and try again.");
        }
    };

    const selectAll = () => {
        const allTaskIds = tasks.map(task => String(task._id));
        console.log("Selecting all:", allTaskIds);
        setSelectedTasks(new Set(allTaskIds));
    };

    const deselectAll = () => {
        console.log("Deselecting all tasks");
        setSelectedTasks(new Set());
    };

    return (
        <div className="container todo-container">
            <div className="header-section">
                <p className="title">Task</p>
                <div className="action-buttons">
                    <button 
                        className={`toggle-delete-btn ${isDeleteMode ? 'active' : ''}`}
                        onClick={toggleDeleteMode}
                    >
                        {isDeleteMode ? 'Cancel' : 'Delete Tasks'}
                    </button>
                </div>
            </div>

            {isDeleteMode && (
                <div className="delete-controls">
                    <div className="selection-buttons">
                        <button onClick={selectAll} className="select-btn">
                            Select All ({tasks.length})
                        </button>
                        <button onClick={deselectAll} className="select-btn">
                            Deselect All
                        </button>
                    </div>
                    <button 
                        onClick={handleDeleteSelected}
                        className="delete-selected-btn"
                        disabled={selectedTasks.size === 0}
                    >
                        Delete Selected ({selectedTasks.size})
                    </button>
                </div>
            )}

            <div id="my-task-container">
                <p>My task</p>
                <div className="bar"></div>

                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            taskId={task._id}
                            taskName={task.taskName}
                            taskDetail={task.taskDetail || "No details provided"}
                            priorityLevel={task.priorityLevel}
                            dateAdded={task.dateAdded}
                            isResolved={task.isResolved}
                            isDeleteMode={isDeleteMode}
                            isSelected={selectedTasks.has(String(task._id))} // CONVERT HERE TOO!
                            onToggleSelect={toggleTaskSelection}
                        />
                    ))
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>

            {!isDeleteMode && <AddTask refreshTasks={getTasks} />}
        </div>
    );
}

export default TodoContainer;

