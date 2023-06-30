import React from 'react'

export default function AuthFormWrapper ({nameForm, title, submit, children}){
  return (
      <div className = 'auth-form-wrapper'>
        <h2 className = 'auth-form-wrapper__title'>{title}</h2>
        <form
          name={`profile-${nameForm}-redactor`}
          onSubmit ={submit}
          className="form isvalid"
          noValidate>
          {children}
        </form>
      </div>
  )
}
