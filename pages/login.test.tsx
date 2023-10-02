import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginScreen from "./login";

describe("LoginScreen component", () => {
  test("renders Weight Gym! as text", () => {
    render(<LoginScreen />);
    const weightGymElement = screen.getByText(/Weight/);
    expect(weightGymElement).toBeInTheDocument();
  });
});
