import React, { useContext } from 'react'
import { Context } from './context'

export const TodoItem = (props) => {

    const { dispatch } = useContext(Context)

    return (
        <li className={`todo ${props.completed ? 'completed' : ''}`}>
            <label>
                <input
                    type="checkbox"
                    className="filled-in"
                    checked={props.completed}
                    onChange={() => {
                        dispatch({
                            type: 'toggle',
                            payload: props.id,
                        })
                    }}
                />
                <span>{props.title}</span>
                <i
                    className="material-icons red-text"
                    onClick={() => {
                        dispatch({
                        type: 'remove',
                        payload: props.id,
                    })
                }}
                >
                    delete
                </i>
            </label>
        </li>
    )
}
