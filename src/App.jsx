import React, { useEffect, useState, useCallback } from "react";

import useHttp from "./hooks/use-http";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const { isLoading, error, data, sendRequest } = useHttp();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    sendRequest({
      url: "https://react-http-da165-default-rtdb.firebaseio.com/tasks.json",
      method: "GET",
    });
  }, [sendRequest]);

  useEffect(() => {
    if (data) {
      setTasks(() => {
        return Object.keys(data).reduce((acc, curr) => {
          acc.push({
            id: curr,
            text: data[curr].text,
          });
          return acc;
        }, []);
      });
    }
  }, [data]);

  const taskAddHandler = useCallback((task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }, []);

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
