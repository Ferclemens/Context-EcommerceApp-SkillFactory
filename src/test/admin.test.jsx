import { render, screen } from "@testing-library/react";
import Admin from "../components/Admin.jsx"

beforeEach(() => render(<Admin />));

describe("Admin text in component Admin", () => {
  it("Must display the title for Admin page", () => {
    expect(screen.getByRole("heading", { name: /Admin/i })).toBeInTheDocument();
  });
});
