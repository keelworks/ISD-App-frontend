import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import Home from "../pages/Home/Home";
import { Provider } from "react-redux";

const mockStore = configureStore();

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should render Log In button and navigate to /login", () => {
    const logInButton = screen.getByText("Log In");
    expect(logInButton).toBeInTheDocument();

    fireEvent.click(logInButton);

    const pathname = window.location.pathname;
    expect(pathname).toBe("/login");
  });

  it("should render Sign Up button and navigate to /signup", () => {
    const signUpButton = screen.getByText("Sign Up");
    expect(signUpButton).toBeInTheDocument();

    fireEvent.click(signUpButton);
    const pathname = window.location.pathname;
    expect(pathname).toBe("/signup");
  });
});
