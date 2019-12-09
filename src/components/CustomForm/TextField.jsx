import React from 'react'
import { string, func, arrayOf } from 'prop-types'

InputText.propTypes = {
  name: string.isRequired,
  label: string,
  type: string.isRequired,
  value: string,
  onChange: func.isRequired,
  onBlur: func,
  errors: arrayOf(string),
  className: string
}

export default function InputText({
  name,
  label,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  errors,
  className,
  disable
}) {

  return (
    <React.Fragment>
      <input
        placeholder={ placeholder }
        id={ name }
        data-testid={ name }
        name={ name }
        type={ type }
        value={ value }
        onChange={ onChange }
        onBlur={ onBlur }
        className={ `${ className} ${ errors && errors.length > 0 ? "form-field-invalid" : "" }` }
        disabled={ disable }
      />
      <br />
      <div style={{
            color: 'red',
            padding: 0,
            height: '1.5rem'
          }}
          >
          {errors && errors.length > 0 && (
            errors[0]
          )}
        </div>
    </React.Fragment>
  )
}