import { nanoid } from "nanoid";
import React from "react";
import Split from "react-split";
import Styles from './sass/notes.module.scss'
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

export default function NoteApp () {

    React.useEffect(()=>{
        document.title = 'Note App' // Document Title for NoteApp
    })

    
    // UseState Properties
    
    const [Notes,setNotes] = React.useState( () => JSON.parse(localStorage.getItem('Notes')) || [])
    const [CurrentNoteID,setCurrentNoteID] = React.useState((
            Notes[0] && Notes[0].id) || '')
            
            React.useEffect(()=>{
                localStorage.setItem('Notes',JSON.stringify(Notes))
            },[Notes])
    
            // Create New Notes
    function CreateNewNotes () {
        const NewNote = {
            id:nanoid(),
            body: '# Type your markdown notes title here.. #'
        }
        setNotes(prevNotes => [NewNote,...prevNotes])
        setCurrentNoteID(NewNote.id)
    }

    // Update Current Note

    function UpdateNote(text) {
        setNotes(oldNotes => {
            const NewArry = []
            for(let i = 0; i < oldNotes.length; i ++){
                const oldNote = oldNotes[i]
                {oldNote.id === CurrentNoteID 
                    ? NewArry.unshift({...oldNote,body: text}) :
                     NewArry.push(oldNote)}
            }
            return NewArry
        })
        // setNotes(oldNotes => oldNotes.map(oldNotes => {
        //     return oldNotes.id === CurrentNoteID
        //     ? {...oldNotes,body:text}
        //     : oldNotes
        // }))
    }


    // Find Current Note

    function FindCurrentNote(){
        return Notes.find(Note => {
            return Note.id === CurrentNoteID
        }) || Notes[0]
    }

    function DeleteNote(event,NoteID) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(Note => Note.id !== NoteID))
    }

    return (
        <main>
            {
                Notes.length > 0
                ?
                <Split
                    sizes={[30,70]}
                    direction="horizontal"
                    className={Styles.split}
                >
                    <Sidebar 
                        Notes={Notes}
                        CurrentNote={FindCurrentNote()}
                        setCurrentNoteID={setCurrentNoteID}
                        NewNote={CreateNewNotes}
                        DeleteNote={DeleteNote}
                    />

                    {
                        CurrentNoteID &&
                        Notes.length > 0 &&
                        <Editor
                            CurrentNote={FindCurrentNote()}
                            UpdateNote={UpdateNote}
                        />
                    }

                </Split>
                :
                <div className={Styles['no-notes']}>
                    <h1 className={Styles.Notes}>
                        <span className="em pen"></span>
                        You have no notes
                        </h1>
                    <button
                        className={Styles['first-note']}
                        onClick={CreateNewNotes}
                    >
                        Create one now
                    </button>
                </div>
            }
        </main>
    )
}