
'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, CheckCircle2, ClipboardList } from 'lucide-react'

const AddTask = () => {
  const [tasks, setTasks] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success,setSuccess] = useState(false)

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!tasks.trim()) return

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await axios.post(
        'https://expence-tracker-9rco.onrender.com/task/',
        { tasks }
      )

      console.log(res.data)
      setTasks('')
      setSuccess(true)

      setTimeout(()=>{
        setSuccess(false)
      },2500)

    } catch (err) {
      setError('Unable to add task')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='min-h-[70vh] flex items-center justify-center px-4'>
      <motion.div
        initial={{ opacity:0, y:40, scale:.95 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:.6 }}
        className='w-full max-w-3xl rounded-4xl bg-white shadow-2xl border border-neutral-200 p-6 md:p-10'
      >

        {/* Header */}
        <motion.div
          initial={{opacity:0,y:-20}}
          animate={{opacity:1,y:0}}
          transition={{delay:.15}}
          className='text-center mb-10'
        >
          <motion.div
            animate={{ y:[0,-6,0] }}
            transition={{ repeat:Infinity, duration:3 }}
            className='inline-flex mb-5 p-4 rounded-3xl shadow-md'
          >
            <ClipboardList size={42}/>
          </motion.div>

          <h1 className='text-3xl md:text-5xl font-bold tracking-tight mb-3'>
            Add New Task
          </h1>

          <p className='text-neutral-500 text-base md:text-lg'>
            Capture ideas, todos and daily goals.
          </p>
        </motion.div>


        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{opacity:0,y:-15}}
              animate={{opacity:1,y:0}}
              exit={{opacity:0}}
              className='mb-5 rounded-2xl border p-4 font-medium'
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{opacity:0,scale:.9}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0}}
              className='mb-5 rounded-2xl p-4 flex items-center gap-3 shadow-sm'
            >
              <CheckCircle2 />
              Task added successfully
            </motion.div>
          )}
        </AnimatePresence>


        <form
          onSubmit={handleForm}
          className='flex flex-col md:flex-row gap-4 items-stretch'
        >

          <motion.div
            whileFocus={{ scale:1.01 }}
            className='flex-1'
          >
            <input
              type='text'
              placeholder='Enter your next task...'
              value={tasks}
              onChange={(e)=>setTasks(e.target.value)}
              className='w-full h-16 rounded-2xl border-2 border-neutral-300 px-6 text-lg outline-none focus:border-black transition-all shadow-sm'
            />
          </motion.div>

          <motion.button
            whileHover={{ scale:1.04 }}
            whileTap={{ scale:.96 }}
            disabled={loading}
            type='submit'
            className='h-16 px-8 rounded-2xl font-semibold shadow-xl flex items-center justify-center gap-2 min-w-42.5'
          >
            {loading ? (
              <motion.div
                animate={{ rotate:360 }}
                transition={{ repeat:Infinity, duration:1, ease:'linear' }}
                className='w-6 h-6 rounded-full border-2 border-t-transparent'
              />
            ) : (
              <>
                <Plus size={20}/>
                Add Task
              </>
            )}
          </motion.button>
        </form>


        {/* Decorative bottom cards */}
       

      </motion.div>
    </section>
  )
}

export default AddTask
