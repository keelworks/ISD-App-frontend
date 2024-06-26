import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { LogIn } from "../pages";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should render create button and navigate to /signup", () => {
    const createButton = screen.getByText("Create");
    expect(createButton).toBeInTheDocument();

    fireEvent.click(createButton);

    const pathname = window.location.pathname;
    expect(pathname).toBe("/signup");
  });

  it("should render sign in with Google button", () => {
    const signInWithGoogleButton = screen.getByText("Sign in with Google");
    expect(signInWithGoogleButton).toBeInTheDocument();
  });

  it("should give an error if email is empty", async () => {
    const emailLabel = screen.getByLabelText("Email");
    expect(emailLabel).toBeInTheDocument();

    const logInButton = screen.getByText("Log In");

    fireEvent.change(emailLabel, { target: { value: "" } });
    fireEvent.click(logInButton);
    await waitFor(() => {
      const errorMessage = screen.getByText("Enter email.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should give an error if password is empty", async () => {
    const passwordLabel = screen.getByLabelText("Password");
    expect(passwordLabel).toBeInTheDocument();

    const logInButton = screen.getByText("Log In");

    fireEvent.change(passwordLabel, { target: { value: "" } });
    fireEvent.click(logInButton);
    await waitFor(() => {
      const errorMessage = screen.getByText("No password provided.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should give an error if email is not valid", async () => {
    const emailLabel = screen.getByLabelText("Email");
    expect(emailLabel).toBeInTheDocument();

    const logInButton = screen.getByText("Log In");

    fireEvent.change(emailLabel, { target: { value: "sdf" } });
    fireEvent.click(logInButton);
    await waitFor(() => {
      const errorMessage = screen.getByText("email must be a valid email");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
