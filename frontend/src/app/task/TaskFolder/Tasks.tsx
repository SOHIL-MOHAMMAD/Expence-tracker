
'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ClipboardList, Loader2 } from 'lucide-react'
import TaskApi from './Taskapi'

interface Task {
 id:number
 tasks:string
}

const Tasks = () => {

 const [tasks,setTasks] = useState<Task[]>([])
 const [loading,setLoading] = useState(true)
 const [error,setError] = useState('')

 useEffect(()=>{

   const fetchTasks = async()=>{
      try{
        const data = await TaskApi()
        setTasks(data)
      }
      catch(err){
        setError(`failed to fetch data ${err}`)
      }
      finally{
        setLoading(false)
      }
   }

   fetchTasks()

 },[])


 if(loading){
   return(
     <div className='min-h-[60vh] flex items-center justify-center'>
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          className='flex flex-col items-center gap-5'
        >
           <motion.div
             animate={{ rotate:360 }}
             transition={{ repeat:Infinity, duration:1, ease:'linear' }}
           >
             <Loader2 size={42}/>
           </motion.div>
           <p className='text-xl font-medium'>Loading tasks...</p>
        </motion.div>
     </div>
   )
 }


 if(error){
  return(
    <div className='min-h-[40vh] flex justify-center items-center'>
      <motion.div
       initial={{opacity:0,y:20}}
       animate={{opacity:1,y:0}}
       className='rounded-3xl border px-8 py-6 shadow-lg text-xl font-semibold'
      >
        {error}
      </motion.div>
    </div>
  )
 }


 return (
   <section className='max-w-5xl mx-auto px-4 py-12'>

      {/* Header */}
      <motion.div
        initial={{opacity:0,y:-30}}
        animate={{opacity:1,y:0}}
        className='text-center mb-12'
      >
        <motion.div
         animate={{y:[0,-8,0]}}
         transition={{repeat:Infinity,duration:3}}
         className='inline-flex p-4 rounded-3xl shadow-md mb-5'
        >
          <ClipboardList size={42}/>
        </motion.div>

        <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-3'>
          My Tasks
        </h2>

        <p className='text-neutral-500 text-lg'>
          {tasks.length} active task{tasks.length !==1 && 's'}
        </p>
      </motion.div>


      {/* Empty State */}
      {tasks.length === 0 && (
        <motion.div
         initial={{opacity:0}}
         animate={{opacity:1}}
         className='rounded-4xl border shadow-xl p-12 text-center'
        >
           <h3 className='text-2xl font-semibold mb-3'>No Tasks Yet</h3>
           <p className='text-neutral-500'>Create your first task above.</p>
        </motion.div>
      )}


      {/* Task Grid */}
      <div className='grid md:grid-cols-2 gap-6'>
        <AnimatePresence>
        {tasks.map((task,index)=>(

          <motion.div
            key={task.id}
            initial={{opacity:0,y:35}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,scale:.95}}
            transition={{delay:index*.08}}
            whileHover={{y:-8,scale:1.02}}
            className='group rounded-[28px] border shadow-xl p-6 hover:shadow-2xl transition-all'
          >

            <div className='flex items-start justify-between gap-4'>
               <div>
                  <p className='text-sm opacity-60 mb-2'>Task #{task.id}</p>

                  <h3 className='text-xl md:text-2xl font-semibold leading-relaxed'>
                    {task.tasks}
                  </h3>
               </div>

               <motion.div
                 whileHover={{rotate:12}}
                 className='shrink-0'
               >
                  <CheckCircle2 size={30}/>
               </motion.div>
            </div>

            <div className='mt-6 h-2 rounded-full overflow-hidden'>
               <motion.div
                 initial={{width:0}}
                 animate={{width:'70%'}}
                 transition={{delay:.4 + index*.08,duration:.8}}
                 className='h-full rounded-full'
               />
            </div>

          </motion.div>

        ))}
        </AnimatePresence>
      </div>


      {/* Stats Cards */}
      {tasks.length > 0 && (
        <div className='grid md:grid-cols-3 gap-5 mt-12'>

          {[
            `${tasks.length} Total Tasks`,
          ].map((item,i)=>(
            <motion.div
             key={item}
             initial={{opacity:0,y:20}}
             animate={{opacity:1,y:0}}
             transition={{delay:.2 + i*.1}}
             whileHover={{y:-6}}
             className='rounded-3xl border shadow-lg p-6'
            >
              <p className='font-semibold text-lg'>
                {item}
              </p>
            </motion.div>
          ))}

        </div>
      )}

   </section>
 )
}

export default Tasks
