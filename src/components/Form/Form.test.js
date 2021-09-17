import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Form from "./Form";

const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  )
describe("<Form />", () => {
    it("render a form tag", () => {
        render(<Form />)
    });
    it("should render the basic fields", () => {
        expect(screen.findByRole("textbox", { id: "nome" }));
        expect(screen.findByRole("textbox", { id: "cpf" }));
        expect(screen.findByRole("textbox", { id: "email" }));
        expect(screen.findByRole("textbox", { id: "confirmemail" }));
        expect(screen.findByRole("textbox", { id: "telefone" }));
        expect(screen.findByRole("textbox", { id: "renda" }));
        expect(screen.findByRole("textbox", { id: "garantidor" }));
        expect(screen.findByRole("button", { id: "enviar" }));
    });
    it('calls onClick prop when clicked', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click Me</Button>)
        fireEvent.click(screen.getByText(/click me/i))
        expect(handleClick).toHaveBeenCalledTimes(1)
      })
});