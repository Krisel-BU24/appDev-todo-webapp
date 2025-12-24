import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
    priorityLevel: { type: String, enum: ["low", "med", "high"], default:"low"},
    dateAdded: {type: Date, default: Date.now},
    isResolved: {type: Boolean, default: false} 
});

// export the model for standalone 
export const Task = mongoose.model("Task", taskSchema);

// export as nested schema
export {taskSchema};
