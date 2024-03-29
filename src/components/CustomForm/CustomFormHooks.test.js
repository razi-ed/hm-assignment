import React, { useState } from 'react'
import { object, string, oneOf } from 'prop-types'
import {
    render,
    getByTestId,
    fireEvent,
    queryByTestId
} from '@testing-library/react'
import InputText from './TextField'
import { required } from './validations'
import { useFormErrors,useFormValues } from './CustomFormHooks'

TestInput.propTypes = {
    initialValue: string.isRequired,
    newValue: string,
    formValidations: object,
    customErrorMessage: string,
    onBlurMethod: oneOf(['validate', 'clear'])
}

function TestInput({
    initialValue,
    newValue,
    formValidations,
    customErrorMessage,
    onBlurMethod = 'validate'
}) {
    const initialFormValues = { name: initialValue }
    const {
        formValues,
        resetInputValue,
        updateInputValue,
        setInputValue
    } = useFormValues(initialFormValues)
    const {
        formErrors,
        validateInputValue,
        clearInputErrors,
        setInputErrors
    } = useFormErrors(formValidations)
    const [inputIsValid, setInputIsValid] = useState(true)
    return (
        <React.Fragment>
            <span data-testid="inputIsValid">{inputIsValid.toString()}</span>
            <InputText
                name="name"
                label="Name"
                type="text"
                value={formValues.name}
                onChange={updateInputValue}
                onBlur={
                    onBlurMethod === 'validate' ? validateInputValue : clearInputErrors
                }
                errors={formErrors.name}
            />
            <button
                data-testid="resetButton"
                type="button"
                onClick={() => resetInputValue('name')}
            />
            <button
                data-testid="setButton"
                type="button"
                onClick={() => setInputValue('name', newValue)}
            />
            <button
                data-testid="clearInputErrorsButton"
                type="button"
                onClick={() => clearInputErrors('name')}
            />
            <button
                data-testid="setInputErrorsButton"
                type="button"
                onClick={() => setInputErrors('name', [customErrorMessage])}
            />
            <button
                data-testid="validateInputValueButton"
                type="button"
                onClick={() => {
                    setInputIsValid(validateInputValue('name', formValues.name))
                }}
            />
        </React.Fragment>
    )
}

describe('useFormValues - input', () => {
    it('renders with its initial form value', () => {
        const initialValue = ''
        const { container } = render(<TestInput initialValue={initialValue} />)

        const inputTextName = getByTestId(container, 'name')
        expect(inputTextName.value).toMatch(initialValue)
    })

    test('updateInputValue', () => {
        const { container } = render(<TestInput initialValue="" />)

        const inputTextName = getByTestId(container, 'name')
        const newName = 'John Smith'
        fireEvent.change(inputTextName, { target: { value: newName } })

        expect(inputTextName.value).toBe(newName)
    })

    test('resetInputValue', () => {
        const initialValue = 'John Smith'
        const { container } = render(<TestInput initialValue={initialValue} />)

        const inputTextName = getByTestId(container, 'name')
        const newName = 'Bob Brown'
        fireEvent.change(inputTextName, { target: { value: newName } })

        const resetButton = getByTestId(container, 'resetButton')
        fireEvent.click(resetButton)

        expect(inputTextName.value).toBe(initialValue)
    })

    test('setInputValue(string)', () => {
        const newValue = 'Bob Brown'
        const { container } = render(
            <TestInput initialValue="John Smith" newValue={newValue} />
        )

        const inputTextName = getByTestId(container, 'name')

        const setButton = getByTestId(container, 'setButton')
        fireEvent.click(setButton)

        expect(inputTextName.value).toBe(newValue)
    })

    test('setInputValue(event)', () => {
        const { container } = render(<TestInput initialValue="" />)

        const inputTextName = getByTestId(container, 'name')
        const newName = 'John Smith'
        fireEvent.change(inputTextName, { target: { value: newName } })

        expect(inputTextName.value).toBe(newName)
    })
})

describe('useFormErrors - input', () => {
    it('renders initially with no errors', () => {
        const { container } = render(<TestInput initialValue="" />)

        const errors = queryByTestId(container, 'name-errors')
        expect(errors.textContent).toMatch('')
    })

    test('validateInputValue(string)', () => {
        const { container } = render(
            <TestInput initialValue="" formValidations={{ name: [required] }} />
        )

        const validateInputValueButton = getByTestId(
            container,
            'validateInputValueButton'
        )
        fireEvent.click(validateInputValueButton)

        const errors = getByTestId(container, 'name-errors')
        const errorMessage = errors.childNodes[0].textContent
        const inputIsValid = getByTestId(container, 'inputIsValid').textContent

        expect(errors.childNodes.length).toEqual(1)
        expect(errorMessage).toMatch('required')
        expect(inputIsValid).toBe(String(false))
    })

    test('validateInputValue(event)', () => {
        const { container } = render(
            <TestInput initialValue="" formValidations={{ name: [required] }} />
        )

        const inputTextName = getByTestId(container, 'name')
        fireEvent.blur(inputTextName)

        const error = getByTestId(container, 'name-errors')
        const errorMessage = error.textContent

        expect(errorMessage).toMatch('required')
    })

    test('clearInputErrors(string)', () => {
        const { container } = render(
            <TestInput initialValue="" formValidations={{ name: [required] }} />
        )

        const inputTextName = getByTestId(container, 'name')
        fireEvent.blur(inputTextName)

        const clearInputErrorsButton = getByTestId(
            container,
            'clearInputErrorsButton'
        )
        fireEvent.click(clearInputErrorsButton)

        const errors = queryByTestId(container, 'name-errors')

        expect(errors.textContent).toMatch('')
    })

    test('clearInputErrors(event)', () => {
        const { container } = render(
            <TestInput
                initialValue=""
                onBlurMethod="clear"
                formValidations={{ name: [required] }}
            />
        )

        const setInputErrorsButton = getByTestId(container, 'setInputErrorsButton')
        fireEvent.click(setInputErrorsButton)

        const inputTextName = getByTestId(container, 'name')
        fireEvent.blur(inputTextName)

        const errors = queryByTestId(container, 'name-errors')

        expect(errors.textContent).toMatch('')
    })

    test('setInputErrors', () => {
        const { container } = render(
            <TestInput initialValue="" customErrorMessage="Whoops!" />
        )

        const setInputErrorsButton = getByTestId(container, 'setInputErrorsButton')
        fireEvent.click(setInputErrorsButton)

        const errors = queryByTestId(container, 'name-errors')
        const errorMessage = errors.textContent

        expect(errorMessage).toMatch('Whoops!')
    })
})

TestForm.propTypes = {
    initialFormValues: object.isRequired,
    newFormValues: object
}

function TestForm({ initialFormValues, newFormValues }) {
    const {
        formValues,
        resetFormValues,
        updateInputValue,
        setFormValues
    } = useFormValues(initialFormValues)

    const {
        formErrors,
        numberOfErrors,
        validateForm,
        clearFormErrors
    } = useFormErrors({ name: [required], email: [required] })

    const [formIsValid, setFormIsValid] = useState(true)

    function validate() {
        setFormIsValid(validateForm(formValues))
    }

    return (
        <React.Fragment>
            <span data-testid="numberOfErrors">{numberOfErrors}</span>
            <span data-testid="formIsValid">{formIsValid.toString()}</span>
            <InputText
                name="name"
                label="Name"
                type="text"
                value={formValues.name}
                onChange={updateInputValue}
                errors={formErrors.name}
            />
            <InputText
                name="email"
                label="Email"
                type="email"
                value={formValues.email}
                onChange={updateInputValue}
                errors={formErrors.email}
            />
            <button
                data-testid="resetButton"
                type="button"
                onClick={() => resetFormValues()}
            />
            <button
                data-testid="setButton"
                type="button"
                onClick={() =>
                    setFormValues({
                        name: newFormValues.name,
                        email: newFormValues.email
                    })
                }
            />
            <button
                data-testid="validateFormButton"
                type="button"
                onClick={validate}
            />
            <button
                data-testid="clearFormErrorsButton"
                type="button"
                onClick={() => clearFormErrors()}
            />
        </React.Fragment>
    )
}

describe('useFormValues - form', () => {
    test('setFormValues', () => {
        const newFormValues = { name: 'Bob Brown', email: 'bob@email.com' }

        const { container } = render(
            <TestForm
                initialFormValues={{ name: 'John Smith', email: 'john@email.com' }}
                newFormValues={newFormValues}
            />
        )

        const inputTextName = getByTestId(container, 'name')
        const inputTextEmail = getByTestId(container, 'email')
        const setButton = getByTestId(container, 'setButton')

        fireEvent.click(setButton)

        expect(inputTextName.value).toBe(newFormValues.name)
        expect(inputTextEmail.value).toBe(newFormValues.email)
    })

    test('resetFormValues', () => {
        const initialFormValues = { name: '', email: '' }

        const { container } = render(
            <TestForm
                initialFormValues={initialFormValues}
                newFormValues={{ name: 'Bob Brown', email: 'bob@email.com' }}
            />
        )

        const inputTextName = getByTestId(container, 'name')
        const inputTextEmail = getByTestId(container, 'email')
        const setButton = getByTestId(container, 'setButton')
        const resetButton = getByTestId(container, 'resetButton')

        fireEvent.click(setButton)
        fireEvent.click(resetButton)

        expect(inputTextName.value).toBe(initialFormValues.name)
        expect(inputTextEmail.value).toBe(initialFormValues.email)
    })
})

describe('useFormErrors - form', () => {
    test('validateForm', () => {
        const { container } = render(
            <TestForm
                initialFormValues={{ name: '', email: '' }}
                formValidations={{ name: [required], email: [required] }}
            />
        )

        const validateFormButton = getByTestId(container, 'validateFormButton')
        fireEvent.click(validateFormButton)

        const nameErrors = getByTestId(container, 'name-errors')
        const emailErrors = getByTestId(container, 'email-errors')

        expect(nameErrors).not.toBeNull()
        expect(emailErrors).not.toBeNull()
    })

    test('clearFormErrors', () => {
        const { container } = render(
            <TestForm
                initialFormValues={{ name: '', email: '' }}
                formValidations={{ name: [required], email: [required] }}
            />
        )

        const validateFormButton = getByTestId(container, 'validateFormButton')
        fireEvent.click(validateFormButton)

        const clearFormErrorsButton = getByTestId(
            container,
            'clearFormErrorsButton'
        )
        fireEvent.click(clearFormErrorsButton)

        const nameErrors = queryByTestId(container, 'name-errors')
        const emailErrors = queryByTestId(container, 'email-errors')

        expect(nameErrors.textContent).toMatch('')
        expect(emailErrors.textContent).toMatch('')
    })
})