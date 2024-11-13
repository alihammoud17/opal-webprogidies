/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
    type?: 'text' | 'email' | 'password' | 'number',
    inputType?: 'input' | 'textarea' | 'select',
    options?: { value: string, label: string, id: string }[],
    label?: string,
    placeholder?: string,
    register?: UseFormRegister<any>,
    errors?: FieldErrors<FieldValues>,
    lines?: number
}

function FormGenerator({
    type,
    inputType,
    options,
    label,
    placeholder,
    register,
    errors,
    lines
}: Props) {

}

export default FormGenerator;