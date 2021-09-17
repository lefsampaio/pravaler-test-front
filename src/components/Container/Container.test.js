import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Container from "./Container";


const container = (
    <Container>
        <h1>Pravaler test</h1>
    </Container>
);

describe("<Container />", () => {
    it("render a div passed as props", () => {
        render(container);

        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("render text passed as props", () => {
        render(container);

        expect(screen.findByText("Pravaler test"));
    });
});
