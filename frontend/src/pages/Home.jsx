import React from "react";
import EmploiToday from "../components/EmploiToday";
import TodoList from "../components/Todolist";
import MeteoToday from   "../components/meteoToday";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="page-container">
      <div className="left-column">
        <EmploiToday />
      </div>
      <div className="middle-column">
        <h2>Section centrale</h2>
        {/* Ici tu peux mettre ton todo, météo, etc. */}
      </div>
      <div className="right-column">
        <div className="right-column-up">
          <h3>ToDo List</h3>
            <TodoList />
        </div>
        <div className="right-column-down">
          <MeteoToday />
        </div>
      </div>
    </div>
  );
}
