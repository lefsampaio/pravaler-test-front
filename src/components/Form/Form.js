
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Headers from "../Header/Header";
import { TextInput } from '../TextInput/TextInput'
import { Select } from '../Select/Select'
import { ButtonSimular, ButtonSubmit } from "../Button/Button";
import { currencyMask, CPFmask, removeCurrencyMask, maskOnlyLetters, phoneMask } from "../../utils/Masks";

import styled from "styled-components";

import { schema } from "../../utils/Validations";
import getAllSchools from "../../services/schools";
import createPOST from '../../services/students'

import { ErrorMessage } from "@hookform/error-message";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ERROR = styled.p`
color: #de0252;
font-size:14px;
float: left;
clear: left;
text-align: left;
margin: 0;
padding: 0;
min-height: 10px;
::before {
    display: inline;
    content: "⚠ ";
  }
`
const MESSAGE = styled.p`
color: #FF6315;
font-size:19px;
`
const Form = () => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [rendaAluno, setRendaAluno] = useState("");
    const [rendaGarantidor, setRendaGarantidor] = useState("");
    const [schools, setSchool] = useState([]);
    const [{ course, school }, setData] = useState({
        school: "",
        course: ""
    });
    const onSubmit = ((values) => {
        const newStudent = formatPOST(values);
        createPOST(newStudent).then(
            () => {
                if (approved === true) {
                    toast.success('Enviado com sucesso!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (approved === false) {
                    toast.error('❌ Aluno foi Reprovado :(', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            },
            () => {
                toast.error('❌ Ocorreu um erro no envio!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },

        );

    })
    const calculateIncome = () => {
        const renda = getValues("renda")
        const garantidor = getValues("garantidor")
        setRendaGarantidor(removeCurrencyMask(garantidor))
        setRendaAluno(removeCurrencyMask(renda))
    }
    const formatAmount = (amount) =>
        amount
            .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    let somaMensalidade = rendaAluno && rendaGarantidor ?
        `valor máximo de mensalidade da faculdade que você pode financiar: ${formatAmount((rendaAluno + rendaGarantidor) / 2.2)}`
        : ""

    const handleSchoolChange = (event) => {
        setData(data => ({ course: '', school: event.target.value }));
    }
    function handleCourseChange(event) {
        setData(data => ({ ...data, course: event.target.value }));
    }

    useEffect(() => {
        getAllSchools().then(
            (school) => {
                setSchool(school.data.schools)

            },
        );
    }, []);

    const score = Math.floor(Math.random() * 100)
    const approved = score >= 70 ? true : false
    const formatPOST = (student) => ({
        approved: approved,
        courseId: student.curso,
        document: student.cpf,
        email: student.email,
        income: removeCurrencyMask(student.renda),
        name: student.nome,
        phone: student.telefone,
        schoolId: student.escola,
        score: score
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Headers />
            <TextInput
                id="nome"
                type="text"
                name="nome"
                placeholder="Nome completo"
                maxLength="99"
                {...register("nome")}
                onChange={(e) => setValue("nome", maskOnlyLetters(e.target.value))}

            />
            <ErrorMessage as={<ERROR />} errors={errors} name="nome" />

            <TextInput
                id="cpf"
                type="text"
                inputMode="numeric"
                placeholder="CPF"
                name="cpf"
                maxLength="14"
                {...register("cpf")}
                onChange={(e) => setValue("cpf", CPFmask(e.target.value))}

            />
            <ErrorMessage as={<ERROR />} errors={errors} name="cpf" />

            <TextInput
                id="email"
                type="email"
                name="email"
                inputMode="email"
                placeholder="Email"
                {...register("email")}

            />
            <ErrorMessage as={<ERROR />} errors={errors} name="email" />

            <TextInput
                id="confirmemail"
                type="text"
                inputMode="email"
                name="confirmEmail"
                placeholder="Confirmação do e-mail"
                {...register("confirmEmail")}

            />
            <ErrorMessage as={<ERROR />} errors={errors} name="confirmEmail" />
            <TextInput
                id="tel"
                type="tel"
                inputMode="tel"
                name="telefone"
                placeholder="Telefone"
                maxLength="15"
                {...register("telefone")}
                onChange={(e) => setValue("telefone", phoneMask(e.target.value))}
            />
            <ErrorMessage as={<ERROR />} errors={errors} name="telefone" />

            <TextInput
                id="renda"
                type="text"
                name="renda"
                inputMode="numeric"
                placeholder="Renda"
                {...register("renda")}
                onChange={(e) => setValue("renda", currencyMask(e.target.value))}
            />
            <ErrorMessage as={<ERROR />} errors={errors} name="renda" />

            <TextInput
                id="garantidor"
                type="text"
                name="garantidor"
                inputMode="numeric"
                placeholder="Renda do garantidor"
                {...register("garantidor")}
                onChange={(e) => setValue("garantidor", currencyMask(e.target.value))}
            />
            <ErrorMessage as={<ERROR />} errors={errors} name="renda" />

            <ButtonSimular type="button" onClick={calculateIncome}>SIMULAR</ButtonSimular>
            <MESSAGE>{somaMensalidade}</MESSAGE>

            <Select {...register("escola")} id="school" value={school} onChange={handleSchoolChange}>
                <option value="Selecione a escola">Selecione a escola</option>
                {schools.map((school) => {
                    return (
                        <option key={school.name} value={school.id}>
                            {school.name}
                        </option>
                    )
                })}
            </Select>
            <ErrorMessage as={<ERROR />} errors={errors} name="escola" />

            <Select {...register("curso")} value={course} onChange={handleCourseChange} id="courses">
                <option value="Selecione o curso">Selecione o curso</option>
                {schools.find(item => item.id === school)?.courses.map((course) => {
                    return (
                        <option key={course.name} value={course.id}>
                            {course.name}
                        </option>
                    )
                })}
            </Select>
            <ErrorMessage as={<ERROR />} errors={errors} name="curso" />
            <ButtonSubmit id="enviar" type="submit">ENVIAR</ButtonSubmit>
        </form>
    );
}
export default Form;

