
import * as yup from "yup";
import { validateCPF } from 'validations-br';
import { validatePhone } from 'validations-br';

export const validateName = (nome) => {
  return !!nome.match(/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/);
}

export const schema = yup.object().shape({
  nome: yup
    .string()
    .test(
      "nome",
      "Preencha com seu nome completo",
      (value) => validateName(value))
    .required('campo obrigatório')
    .min(2, 'Preencha com seu nome completo'),
  cpf: yup
    .string()
    .test(
      "cpf",
      "cpf inválido",
      (value) => validateCPF(value)
    )
    .min(11, 'CPF inválido')
    .required('campo obrigatório'),
  email: yup
    .string()
    .email('email inválido')
    .required('campo obrigatório'),
  confirmEmail: yup
    .string()
    .email('email inválido')
    .required('campo obrigatório'),
  telefone: yup
    .string()
    .min(11, 'telefone inválido')
    .test(
      "telefone",
      "telefone inválido",
      (value) => validatePhone(value)
    )
    .required('campo obrigatório'),
  renda: yup
    .string()
    .min(1, 'preencha a o valor')
    .required('campo obrigatório'),
  garantidor: yup
    .string()
    .min(1, 'preencha a o valor')
    .required('campo obrigatório'),
});