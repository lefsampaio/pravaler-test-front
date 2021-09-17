import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Header from "./Header";

describe("<Header />", () => {
    it("should render a header tag", () => {
        render(<Header />);

        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should render 'Pravaler' text", () => {
        render(<Header />);

        expect(screen.getByText("Pravaler")).toBeInTheDocument();
    });
});