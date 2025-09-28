import React from 'react'
import TaskCard from '../components/TaskCard'


function Tasks() {
  return (
    <>
        <div className="p-5 flex gap-5 overflow-x-auto w-[80vw] scrollbar">
          <TaskCard title="Design few mobile screens" detail="Dropbox mobile app" progress="8" total="10" date="26 AUG 2025"></TaskCard>
          <TaskCard title="Create wireframe for ios app" detail="Oreo ios app project" progress="7" total="10" date="14 NOV 2025"></TaskCard>
          <TaskCard title="Make twitter banner" detail="Twitter Marketing" progress="9" total="10" date="08 JUN 2025"></TaskCard>
          <TaskCard title="Design few mobile screens" detail="Dropbox mobile app" progress="8" total="10" date="26 AUG 2025"></TaskCard>
          <TaskCard title="Create wireframe for ios app" detail="Oreo ios app project" progress="7" total="10" date="14 NOV 2025"></TaskCard>
          <TaskCard title="Make twitter banner" detail="Twitter Marketing" progress="9" total="10" date="08 JUN 2025"></TaskCard>
        </div>
    </>
  )
}

export default Tasks