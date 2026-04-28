interface Task {
  id: number
  tasks: string
}

export default async function taskApi(): Promise<Task[]> {
  try {
    const res = await fetch(
      'https://expence-tracker-9rco.onrender.com/task/',
      {
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch tasks')
    }

    const data: Task[] = await res.json()
    return data

  } catch (error) {
    throw new Error(`Failed to fetch data ${error}`)
  }
}