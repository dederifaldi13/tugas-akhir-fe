import React from 'react'
import SelectSearch from 'react-select-search'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Skeleton from 'react-loading-skeleton'
// import {isPos} from './function'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

export const ReanderTextArea = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  id,
  tabIndex,
  ref,
  customeCss,
  stylelabel,
  maxLength,
  height,
  width,
  meta: {touched, error, warning},
}: any) => (
  <div className='form-group'>
    <label htmlFor='' className={stylelabel ? 'text-white' : 'text-black'}>
      {label || <> &nbsp; </>}
    </label>
    <textarea
      {...input}
      tabIndex={tabIndex}
      ref={ref}
      autoComplete='off'
      type={type}
      id={id}
      className={'form-control ' + customeCss}
      readOnly={readOnly}
      rows={height}
      cols={width}
      maxLength={maxLength}
      placeholder={placeholder}
    />
    {touched &&
      ((error && (
        <ul className='parsley-errors-list filled'>
          <li className='parsley-required'> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
)

export const RenderFieldGroup = ({
  input,
  label,
  readOnly,
  placeholder,
  onInputChange,
  disabled,
  tabIndex,
  inputValue,
  isivalue,
  onKeyDown,
  onChange,
  isClearable,
  isMulti,
  meta: {touched, error, warning},
  textColor = 'text-black',
}: any) => (
  <div className='form-group'>
    <label htmlFor='' className={textColor}>
      {label}
    </label>
    <CreatableSelect
      {...input}
      isClearable={isClearable}
      isMulti={isMulti}
      inputValue={inputValue}
      readOnly={readOnly}
      menuIsOpen={false}
      onChange={(value) => input.onChange(value)}
      onBlur={() => input.onBlur(input.value)}
      components={{DropdownIndicator: null}}
      onInputChange={onInputChange}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      disabled={disabled}
      placeholder={placeholder}
      value={isivalue}
    />
    {touched &&
      ((error && (
        <ul className='parsley-errors-list filled'>
          <li className='parsley-required'> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
)
export const ReanderSelect2 = ({
  input,
  label,
  defaultValue,
  readOnly,
  placeholder,
  options,
  onChange,
  id,
  disabled,
  tabIndex,
  meta: {touched, error, warning},
  value,
  textColor = 'text-black',
}: any) => (
  <div className='form-group'>
    <label htmlFor='' className={textColor}>
      {label}
    </label>
    <Select
      {...input}
      id={id}
      readOnly={readOnly}
      onChange={(value) => input.onChange(value)}
      onBlur={() => input.onBlur(input.value)}
      tabIndex={tabIndex}
      disabled={disabled}
      placeholder={placeholder}
      options={options}
      styles={{
        // Fixes the overlapping problem of the component
        menu: (provided) => ({...provided, zIndex: 9999}),
      }}
      value={defaultValue}
    />
    {touched &&
      ((error && (
        <ul className='parsley-errors-list filled'>
          <li className='parsley-required'> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
)
export const HiidenFiled = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  value,
  id,
  tabIndex,
  meta: {touched, error, warning},
}: any) => (
  <>
    <input
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault() //<===== This stops the form from being submitted
        } else {
        }
      }}
      {...input}
      tabIndex={tabIndex}
      autoComplete='off'
      type={type}
      id={id}
      className='form-control'
      readOnly={readOnly}
      defaultValue={value}
      placeholder={placeholder}
    />
  </>
)

export const inputGroup = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  id,
  tabIndex,
  textValue,
  ref,
  customeCss,
  meta: {touched, error, warning},
}: any) => (
  <div className='form-group'>
    <label htmlFor='' className='text-black'>
      {label || <> &nbsp; </>}
    </label>
    <div className='input-group mb-3'>
      <input
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault() //<===== This stops the form from being submitted
          } else {
          }
        }}
        {...input}
        tabIndex={tabIndex}
        ref={ref}
        autoComplete='off'
        type={type}
        id={id}
        style={{textTransform: 'uppercase'}}
        className={'form-control ' + customeCss}
        readOnly={readOnly}
        // defaultValue={defaultValue}
        placeholder={placeholder}
      />
      <div className='input-group-prepend'>
        <span className='input-group-text'>{textValue}</span>
      </div>
      {touched &&
        ((error && (
          <ul className='parsley-errors-list filled'>
            <li className='parsley-required'> {error}.</li>
          </ul>
        )) ||
          (warning && <p>{warning}</p>))}
    </div>
  </div>
)
export const ReanderField = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  id,
  tabIndex,
  autoFocus,
  ref,
  customeCss,
  minLength,
  defaultValue,
  maxLength,
  nouperCase,
  textColor = 'text-black',
  meta: {touched, error, warning},
}: any) => (
  <div className='form-group'>
    <label htmlFor='' className={textColor}>
      {label || <> &nbsp; </>}
    </label>
    <input
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault() //<===== This stops the form from being submitted
        } else {
        }
      }}
      {...input}
      tabIndex={tabIndex}
      ref={ref}
      autoComplete='off'
      type={type}
      id={id}
      style={{textTransform: !nouperCase ? 'uppercase' : 'none'}}
      className={'form-control ' + customeCss}
      readOnly={readOnly}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
    />
    {touched &&
      ((error && (
        <ul className='parsley-errors-list filled'>
          <li className='parsley-required'> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
)
export const ReanderCheckBox = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  id,
  tabIndex,
  autoFocus,
  ref,
  customeCss,
  defaultValue,
  meta: {touched, error, warning},
}: any) => (
  <div className='form-group'>
    {/* <label htmlFor="" className="text-black">
      {label || <> &nbsp; </>}  
    </label> */}
    <br />
    {label || <> &nbsp; </>}
    <br />
    <div className='switcher'>
      {/* <input
        type="checkbox"
        name="switcher_checkbox_1"
        id="switcher_checkbox_1"
        defaultChecked
        value="1"
      /> */}
      <input
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault() //<===== This stops the form from being submitted
          } else {
          }
        }}
        {...input}
        defaultChecked
        // value="1"
        tabIndex={tabIndex}
        ref={ref}
        autoComplete='off'
        type={type}
        id={id}
        // className={}
        readOnly={readOnly}
        // defaultValue={defaultValue}
        placeholder={placeholder}
      />{' '}
      <label htmlFor='switcher_checkbox_1'></label>
    </div>

    {touched &&
      ((error && (
        <ul className='parsley-errors-list filled'>
          <li className='parsley-required'> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
)

export const SkeletonLoading = ({label}: any) => (
  <div className='form-group'>
    <label> {label} </label>
    <Skeleton className='form-control' />
  </div>
)

export const ReanderSelect = ({
  input,
  label,
  readOnly,
  placeholder,
  options,
  value,
  id,
  disabled,
  tabIndex,
  meta: {touched, error, warning},
  textColor = 'text-black',
}: any) => (
  <div className='form-group'>
    <label htmlFor='' className={textColor}>
      {label}
    </label>
    <SelectSearch
      autoComplete='off'
      onInputKeyDown={(event: any) => {
        if (event.key === 'Enter') {
          event.preventDefault() //<===== This stops the form from being submitted
        } else {
        }
      }}
      {...input}
      id={id}
      readOnly={readOnly}
      search
      tabIndex={tabIndex}
      disabled={disabled}
      placeholder={placeholder}
      options={options}
    />
    {/* <Select
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        options={options}
     
      /> */}

    {touched &&
      ((error && (
        <ul className='parsley-errors-list filled'>
          <li className='parsley-required'> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
)

export const InputDate = ({
  input,
  label,
  readOnly,
  placeholder,
  id,
  selected,
  customInput,
  minDate,
  maxDate,
  meta: {touched, error, warning},
}: any) => (
  <div className='input-group mb-3'>
    <label htmlFor='' className='text-black'>
      {label}
    </label>
    <div className='customDatePickerWidth'>
      <DatePicker
        id={id}
        maxDate={maxDate}
        todayButton='Hari Ini'
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        dateFormat='yyyy-MM-dd'
        autoComplete='off'
        minDate={minDate}
        {...input}
        onKeyDown={(event) => {
          event.preventDefault() //<===== This stops the form from being submitted
          return false
        }}
        // onFocus={() =>
        //   setTimeout(() => {
        //     if (isPos()) {
        //       // eslint-disable-next-line no-undef
        //       HideKeyboard.postMessage('')
        //     }
        //   }, 50)
        // }
        selected={selected}
        disabledKeyboardNavigation={true}
        className='form-control'
        readOnly={readOnly}
        placeholder={placeholder}
        customInput={customInput}
      />
      {touched &&
        ((error && (
          <ul className='parsley-errors-list filled'>
            <li className='parsley-required'> {error}.</li>
          </ul>
        )) ||
          (warning && <p>{warning}</p>))}
    </div>
  </div>
)
