import React, { useState, useContext } from 'react'
import { Context } from './context'

export const TodoItem = (props) => {

    const { dispatch } = useContext(Context)
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.title);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    const editingTemplate = (
        <label style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <input className="todo-text" type="text" value={newName} onChange={handleChange} />
            <div>
                <i className="material-icons red-text" onClick={() => {
                    setEditing(false)
                    setNewName(props.title)
                }}>close</i>
                <i
                    className="material-icons green-text"
                    onClick={() => {
                        dispatch({
                            type: 'edit',
                            id: props.id,
                            payload: newName,
                        })
                        setEditing(false)
                    }}
                >check</i>
            </div>
        </label>
    );
    const viewTemplate = (
        <>
            <span className='todo--date'>{new Date(props.id).toLocaleString()}</span>
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
                <span>{props.title} </span>
                <div>
                    {props.completed ? null : <i
                        className="material-icons green-text"
                        onClick={() => setEditing(true)}
                    >
                        create
                    </i>}
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
                </div>
            </label>
        </>
    );

    return (
        <li className={`todo ${props.completed ? 'completed' : ''}`}>{isEditing ? editingTemplate : viewTemplate}</li>
        // <li className={`todo ${props.completed ? 'completed' : ''}`}>
        //     <span className='todo--date'>{new Date(props.id).toLocaleString()}</span>
        //     <label>
        //         <input
        //             type="checkbox"
        //             className="filled-in"
        //             checked={props.completed}
        //             onChange={() => {
        //                 dispatch({
        //                     type: 'toggle',
        //                     payload: props.id,
        //                 })
        //             }}
        //         />
        //         <span>{props.title} </span>
        //         <i
        //             className="material-icons red-text"
        //             onClick={() => {
        //                 dispatch({
        //                     type: 'remove',
        //                     payload: props.id,
        //                 })
        //             }}
        //         >
        //             delete
        //         </i>
        //     </label>
        // </li>
    )
}
