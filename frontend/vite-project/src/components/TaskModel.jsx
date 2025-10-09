import React, { useEffect, useState } from "react";
import InputBlock from "./InputBlock";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DraggableProgressBar from "./DraggableProcessBar";
import ResponsiblePersonSelect from "./ResponsiblePersonSelect";

function TaskModel({ setTaskModelOpen, isEditing = false, selectedTask }) {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState("");
  const [responsiblePerson, setResponsiblePerson] = useState({});
  const [priority, setPriority] = useState("low");
  const queryClient = useQueryClient();

  useEffect(() => {
    setProjectName(isEditing && selectedTask ? selectedTask.projectName : "");
    setTaskName(isEditing && selectedTask ? selectedTask.taskName : "");
    setProgress(isEditing && selectedTask ? selectedTask.progress : 0);
    setDate(
      isEditing && selectedTask
        ? new Date(selectedTask.date).toISOString().split("T")[0]
        : ""
    );
    setResponsiblePerson(
      isEditing && selectedTask ? selectedTask.responsiblePerson : ""
    );
    setPriority(isEditing && selectedTask ? selectedTask.priority : "");
  }, [selectedTask, isEditing]);

  const editOrCreateTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const endpoint = isEditing
        ? `http://localhost:5000/tasks/${selectedTask.id}`
        : "http://localhost:5000/tasks";

      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditing ? "updating" : "creating"} task`
        );
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success(`Task ${isEditing ? "updated" : "created"} successfully!`);
      queryClient.invalidateQueries(["tasks"]);
      setTaskModelOpen(false);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateTask = () => {
    if (!projectName.trim()) {
      toast.error("Project name is required!");
      return;
    }
    if (!taskName.trim()) {
      toast.error("Task name is required!");
      return;
    }
    if (!date) {
      toast.error("Date is required!");
      return;
    }

    if(priority === ''){
      toast.error("Priority is required!");
      return;
    }

    if (!responsiblePerson || responsiblePerson === "") {
      toast.error("Responsible person is required!");
      return;
    }


    const newTask = {
      projectName,
      taskName,
      progress,
      date,
      responsiblePerson,
      priority,
    };

    // editOrCreateTaskMutation.mutate(newTask);
    console.log(newTask);
    setTaskModelOpen(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray bg-opacity-90 backdrop-blur-sm z-9"
        onClick={() => setTaskModelOpen(false)}
      ></div>

      <div className="text-violet-500 pl-10 p-10 rounded-md absolute bg-white shadow-md w-[50rem] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <h4 className="text-center text-3xl my-5">
          {isEditing ? "Edit Task" : "Create Task"}
        </h4>
        <button
          className="text-3xl ml-auto absolute right-5 top-2 hover:opacity-50 cursor-pointer transition-all ease-in-out"
          onClick={() => setTaskModelOpen(false)}
        >
          &times;
        </button>

        <InputBlock
          id="projectName"
          label="Project Name"
          required={true}
          type="text"
          value={projectName}
          onChange={setProjectName}
        />
        <InputBlock
          id="taskName"
          label="Task Name"
          required={true}
          type="text"
          value={taskName}
          onChange={setTaskName}
        />
        <InputBlock
          id="date"
          label="Date"
          required={true}
          type="date"
          value={date}
          onChange={setDate}
        />
        <div className="grid grid-cols-[.3rem_15rem_1fr] ml-5 gap-5 mt-10 items-center">
          <span className='text-red-500 text-2xl'></span>
          <label htmlFor="progress" className="text-2xl">
            Progress
          </label>
          <DraggableProgressBar progress={progress} setProgress={setProgress} />
        </div>
        <div className="grid grid-cols-[.3rem_15rem_1fr] ml-5 gap-5 mt-10 items-center">
          <span className='text-red-500 text-2xl'>*</span>
          <label htmlFor="priority" className="text-2xl">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="
                border border-violet-300 
                rounded-xl 
                px-3 py-2 
                text-violet-800 
                focus:outline-none 
                focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                hover:border-violet-400 
                transition 
                duration-200 
                shadow-sm 
                bg-white
            "
          >
            <option value="" disabled hidden>
              Select priority
            </option>
            <option value="low" className="text-violet-700">
              Low
            </option>
            <option value="medium" className="text-violet-700">
              Medium
            </option>
            <option value="high" className="text-violet-700">
              High
            </option>
          </select>
          
        </div>
        <ResponsiblePersonSelect
          responsiblePerson={responsiblePerson}
          setResponsiblePerson={setResponsiblePerson}
          required={true}
        />
        <div className="text-center mt-10">
          <button
            onClick={handleCreateTask}
            className="bg-violet-500 py-2 px-5 ml-5 rounded-md text-white cursor-pointer hover:bg-violet-600 transition-all ease-in-out"
          >
            {isEditing ? "Edit Task" : "Create Task"}
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskModel;
