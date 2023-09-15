import React, { ReactNode, useState } from 'react'
import { createContext } from 'vm'

interface DragAndDropProvider{
  childrean:ReactNode;
}

// export const DragAndDropStateContext=React.createContext();

const DragAndDropState:React.FC<DragAndDropProvider>= ({childrean}) => {
  const [dragAndDropData, setDragAndDropData] = useState();
  return (
    <div>
      {/* <DragAndDropStateContext.Provider value={{dragAndDropData}}>
        {childrean}
      </DragAndDropStateContext.Provider> */}
    </div>
  )
}

export default DragAndDropState