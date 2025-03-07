// import { useState, useEffect } from "react";
import { todoApi } from "../api/todos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // TODO: 필수: useQuery 로 리팩터링 하세요.
  // TODO: 선택: useQuery 로 리팩터링 후, 커스텀훅 useTodosQuery 로 정리해 보세요.

  // const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await todoApi.get("/todos");
    // setData(response.data);
    return response.data;
  };

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });
  // console.log("data", todos);
  if (isLoading) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (isError) {
    // console.error(error);
    return <div style={{ fontSize: 24 }}>에러가 발생했습니다</div>;
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm />
      <TodoList todos={todos} />
    </>
  );
}
