import { useState, useMemo } from 'react'
import {
  setInputValue,
  updateInputValue,
  resetInputValue,
  clearInputErrors,
  validateForm,
  validateInputValue,
  getInitialFormErrors
} from './CustomFormUtils'

export function useFormValues( initialFormValues ) {
  const [ formValues, setFormValues ] = useState( initialFormValues )

  return {
    formValues,
    resetFormValues: () => setFormValues( initialFormValues ),
        resetInputValue: name =>
      resetInputValue( name, setFormValues, initialFormValues ),
    
    updateInputValue: event => updateInputValue( event, setFormValues ),
    setInputValue: ( input, value ) => setInputValue( input, value, setFormValues ),
    setFormValues
  }
}

export function useFormErrors( formValidations = {} ) {
  const initialFormErrors = useMemo(
    () => getInitialFormErrors( formValidations ),
    [ formValidations ]
  )
  const [ formErrors, setFormErrors ] = useState( initialFormErrors )

  return {
    formErrors,
    numberOfErrors: Object.values( formErrors ).filter( value => value.length > 0 )
      .length,
    validateForm: formValues =>
      validateForm( formValues, setFormErrors, formValidations ),
    validateInputValue: ( input, value = null ) =>
      validateInputValue( input, value, setFormErrors, formValidations ),
    clearFormErrors: () => setFormErrors( initialFormErrors ),
    clearInputErrors: input => clearInputErrors( input, setFormErrors ),
    setInputErrors: ( name, errors ) =>
      setFormErrors( prevFormErrors => ({
        ...prevFormErrors,
        [ name ]: errors
      }))
  }
}