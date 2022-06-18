import { useEffect } from "react";

import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, data, sendRequest } = useHttp();
  const { onAddTask } = props;

  const enterTaskHandler = (taskText) => {
    sendRequest({
      url: "https://react-http-da165-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: JSON.stringify({ text: taskText }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    if (data) {
      onAddTask({
        id: data.name,
        text: JSON.parse(data.body).text,
      });
    }
  }, [data, onAddTask]);

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
