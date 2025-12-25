// TaskItem.jsx
import "../task-item/TaskItem.css"
import { useState } from "react";

const TaskItem = ({ 
    taskName, 
    taskDetail, 
    priorityLevel, 
    dateAdded, 
    isResolved,
    isDeleteMode,
    isSelected,
    onToggleSelect,
    onToggleResolved,
    taskId
}) => {
    const taskColor = {"none": "gray", "low": "yellow", "med": "orange", "high": "red" };
    const [showPopup, setShowPopup] = useState(false);
    const activeColor = taskColor[priorityLevel];

    const dateObj = new Date(dateAdded);
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = dateObj.toLocaleDateString('en-GB');
    const formattedDate = `${time} ${date}`;

    const handleCardClick = () => {
        if (isDeleteMode) {
            onToggleSelect(taskId);
        } else {
            setShowPopup(true);
        }
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        onToggleSelect(taskId);
    };

    const handleRadioClick = (e) => {
        e.stopPropagation(); // Prevent event from bubbling to the card
        onToggleResolved(taskId, !isResolved);
    };

    return (
        <>
            <div
                style={{"--shadow-color": activeColor}}
                className={`task-item-card ${isDeleteMode && isSelected ? 'selected' : ''}`}
                onClick={handleCardClick}
            >
                {/* Text Group */}
                <div className="task-info-wrapper">
                    <span className="task-title">{taskName}</span>
                    <span className="task-date">{formattedDate}</span>
                </div>

                {/* Checkbox/Radio Group */}
                {isDeleteMode ? (
                    <input
                        type="checkbox"
                        className="delete-checkbox"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        onClick={(e) => e.stopPropagation()} // Add this
                    />
                ) : (
                    <input
                        type="checkbox"
                        className="resolve-checkbox"
                        checked={isResolved}
                        onChange={handleRadioClick}
                        onClick={(e) => e.stopPropagation()} // Add this too
                    />
                )}
            </div>

            {showPopup && !isDeleteMode && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <span>Task Name:</span>
                        <span className="task-title">{taskName}</span>
                        <hr />
                        <span>Task Details:</span>
                        <span className="task-detail">{taskDetail}</span>
                        <hr />
                        <span>Status:</span>
                        <span>{isResolved ? '✅ Completed' : '⏳ Pending'}</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskItem;