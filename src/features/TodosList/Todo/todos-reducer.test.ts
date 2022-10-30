import {addTodoAC, removeTodoAC, todosReducer, TodoType, updateTodoAC, UpdateTodoType} from "../todos-reducer";
import {v1} from "uuid";

let currentState: TodoType[];

beforeEach(() => {
  currentState = [
    {id: '1', title: 'What to learn', filter: 'all',},
    {id: '2', title: 'What to buy', filter: 'all',},
    {id: '3', title: 'Exercise to do', filter: 'all',},
    {id: '4', title: 'Learn in english', filter: 'all',},
  ];
})

describe('group tests for todolists reducer', () => {

  it('list should be removed correctly', () => {

    const deletingTodoId = '3'
    const action = removeTodoAC(deletingTodoId)
    const newState = todosReducer(currentState, action)

    expect(newState.length).toBe(3)
    expect(newState.filter(tl => tl.id === deletingTodoId)).toStrictEqual([])
    expect(newState.map(tl => tl.id)).toStrictEqual(['1', '2', '4'])
  })

  it('list should be added correctly', () => {

    const newTodoID = v1()
    const newTodoTitle = 'NEWEST TODO'
    const action = addTodoAC(newTodoTitle, newTodoID)
    const newState = todosReducer(currentState, action)

    expect(newState.length).toBe(5)
    expect(newState[0].title).toBe('NEWEST TODO')
  })

  it('list should be updated correctly', () => {

    const updatingTodoId = '2'
    const payload: UpdateTodoType = {
      title: 'Updated title',
      filter: 'completed'
    }
    const action = updateTodoAC(updatingTodoId, payload)
    const newState = todosReducer(currentState, action)

    expect(newState.length).toBe(4)
    expect(newState[1].title).toBe('Updated title')
    expect(newState[1].filter).toBe('completed')
  })

})