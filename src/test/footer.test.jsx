import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer.jsx";

beforeEach(() => render(<Footer />));

describe("Quotes List", () => {
    it("Must display 4 quotes", async () => {
      expect(await screen.findAllByRole("listitem")).toHaveLength(4);
    });
  });