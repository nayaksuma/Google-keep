import { useContext, useEffect,useState } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const Note = ({ note }) => {

    const { notes,setCountTrue,countTrue,count,setCount, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);
    
    const archiveNote = (singleNote) => {
        let index=notes.findIndex((items)=>items.n_id==singleNote.n_id)
        let updatedSingleNote={
            ...singleNote,
            status:"archieved"
        }
        let finalNote=[...notes];
        finalNote.splice(index,1,updatedSingleNote);
                setCountTrue(!countTrue)

        localStorage.setItem("Notes",JSON.stringify(finalNote))

    }

    const deleteNote = (note) => {
            let index=notes.findIndex((items)=>items.n_id==note.n_id)
            let updatedSingleNote={
                ...note,
                status:"deleted"
            }
            let finalNote=[...notes];
            finalNote.splice(index,1,updatedSingleNote);
            setCountTrue(!countTrue)
            localStorage.setItem("Notes",JSON.stringify(finalNote))
    }

    return (
        <StyledCard>
                <CardContent>
                    <Typography>{note.heading}</Typography>
                    <Typography>{note.text}</Typography>
                </CardContent>
                <CardActions>
                    <Archive 
                        sx={{fontSize:"30px",cursor:'pointer'}}
                        color='primary'
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => archiveNote(note)}
                    />
                    <Delete 
                        sx={{fontSize:"30px",cursor:'pointer'}}
                        color='error'
                        onClick={() => deleteNote(note)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Note;