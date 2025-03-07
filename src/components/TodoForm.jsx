import { useState } from "react";
import { todoApi } from "../api/todos";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // TODO: 필수: useMutation 으로 리팩터링 하세요.
  // TODO: 선택: useMutation 으로 리팩터링 후, useTodoMutation 커스텀훅으로 정리해 보세요.
  // const handleAddTodo = async (e) => {
  //   e.preventDefault();
  //   setTitle("");
  //   setContents("");
  //   await todoApi.post("/todos", {
  //     id: Date.now().toString(),
  //     title,
  //     contents,
  //     isCompleted: false,
  //     createdAt: Date.now(),
  //   });
  //   await fetchData();
  // };
  const queryClient = useQueryClient();
  //api 통신 함수
  const addTodo = async () => {
    await todoApi.post("/todos", {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    });
    setContents("");
    setTitle("");
  };

  const addTodoMutate = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    addTodoMutate.mutate();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
