import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export default function DatePicker({ dateVal, handleChange, minDate, maxDate, error }) {

  return (
    <ReactDatePicker
      minDate={minDate}
      maxDate={maxDate}
      selected={dateVal}
      onChange={handleChange}
      disabledKeyboardNavigation
      id={'react-date-picker'}
      onChangeRaw={(e) => {
        e.preventDefault()
      }}
    />
  )
}

DatePicker.defaultProps = {
  disabled: false,
  error: '',
  value: '',
}
