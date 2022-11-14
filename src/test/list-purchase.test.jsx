import { render, screen } from "@testing-library/react";
import ListPurchase from "../components/ListPurchase.jsx";

beforeEach(() => render(<ListPurchase />));

it("Must contain quote value", async () => {
    expect(screen.getByText("Precio abonado")).toBeInTheDocument();
  });
  