import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../components/header/Header";
import MenuBar from "../components/menubar/MenuBar";
import SAMroad from "../modules/samroad/SAMroad";
import "./Pages.css";

export default function MainPage() {
  const authToken = useSelector(state => state.sign.authToken);
  if (authToken) {
    return (
      <div className="MainPage">
        <Header />
        <SAMroad />
        <MenuBar />
      </div>
    );
  }
  return <Redirect to="/sign" />;
}
