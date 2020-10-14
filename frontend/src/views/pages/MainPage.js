import React from "react";
import Header from "../components/header/Header";
import MenuBar from "../components/menubar/MenuBar";
import SAMroad from "../../modules/samroad/SAMroad";
import "./Pages.css";

export default function MainPage() {
  return (
    <div className="MainPage">
      <Header />
      <SAMroad />
      <MenuBar />
    </div>
  );
}
