import { createContext, useContext, Dispatch, FC, ReactNode } from "react"
import { appStateReducer, AppState, List, Task } from "./appStateReducer"
import { Action } from "./actions"
import { useImmerReducer } from "use-immer"



// Types for the Application State
// type Task = {
//     id: string
//     text: string
// }

// type List = {
//     id: string
//     text: string
//     tasks: Task[]
// }

// export type AppState = {
//     lists: List[]
// }




// Application Data
const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn TypeScript" }]
        },
        {
            id: "0",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}


//Context Definition
type AppStateContextProps = {
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>( {} as AppStateContextProps )





//Context Provider Definition
interface Props {
    children: ReactNode
}

export const AppStateProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData)

    const { lists } = state

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }

    return (
        <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
            {children}  
        </AppStateContext.Provider>
    )
}

//Use Data from Global Context
export const useAppState = () => {
    return useContext(AppStateContext)
}