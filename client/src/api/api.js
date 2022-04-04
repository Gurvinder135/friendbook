import axios from "axios";
const url = "http://localhost:5000/";
export const readTodos = async () => {
  try {
    const data = await axios.get(url);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createTodo = async (newTodo) => {
  try {
    const data = await axios.post(url, newTodo);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (id) => {
  try {
    const data = await axios.delete(url + id);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const sendUpdateTodo = async (id, newTodo) => {
  try {
    const data = await axios.put(url + id, newTodo);
    return data;
  } catch (err) {
    console.log(err);
  }
};
