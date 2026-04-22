
import React from 'react'
import AddExpense from './AddExpense'
import AddCategory from './AddCategory'
const Buttons = () => {
  return (
     <div className=' flex md:flex-row flex-col justify-end md:items-center items-end-safe py-4 px-2 md:gap-5 gap-2'>
      <AddExpense/>
      <AddCategory/>
      
    </div>
  )
}

export default Buttons
