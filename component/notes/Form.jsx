import { useState, useRef, useContext } from 'react';

import { Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';

import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

const note = {
    id: '',
    heading: '',
    text: ''
}

const Form = () => {

    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({
        heading:"",
        text:""
    });
    
    // const [noteValue, setNoteValue] = useState();

    const { countTrue,setCountTrue,setNotes,setCount,notes } = useContext(DataContext);
    
    const containerRef = useRef();

    const handleClick = () => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        
        setAddNote({heading:"",text:""})
        let id=notes.length==0?1:notes[notes.length-1].n_id+1;
        let fulNote={
            n_id:id,
            ...addNote,
            status:"New"
        }
        let updatedNote=[...notes,fulNote]
        setNotes(updatedNote)
        setCountTrue(!countTrue)
        localStorage.setItem("Notes",JSON.stringify(updatedNote))
        
    }
    
    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value };
        setAddNote(changedNote);
    }

    return (
        < >
            <Container ref={containerRef}>
                {   showTextField && 
                    <TextField 
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='heading'
                        value={addNote.heading}
                    />
                }
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={(e) => onTextChange(e)}
                    name='text'
                    value={addNote.text}
                />
                <Button onClick={handleClick}>Save</Button>
            </Container>
        </>
    )
}

export default Form;