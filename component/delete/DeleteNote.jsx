import { useContext,useEffect,useState } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`
const DeleteNote = ({ deleteNote }) => {

    const { notes,countTrue,setCountTrue,setCount,deleteNotes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);
    const restoreNote = (deleteNote) => {
        let index=notes.findIndex((items)=>items.n_id==deleteNote.n_id)
        let updatedSingleNote={
            ...deleteNote,
            status:"New"
        }
        let finalNote=[...notes];
        finalNote.splice(index,1,updatedSingleNote);
        setCountTrue(!countTrue)
        localStorage.setItem("Notes",JSON.stringify(finalNote))
    }

    const removeNote = (deleteNote) => {
        let remaining=notes.filter((items)=>items.n_id!=deleteNote.n_id);
        localStorage.setItem("Notes",JSON.stringify(remaining))
        setCountTrue(!countTrue)
    }

    return (
        <StyledCard>
                <CardContent>
                    <Typography>{deleteNote.heading}</Typography>
                    <Typography>{deleteNote.text}</Typography>
                </CardContent>
                <CardActions>
                    <Delete 
                        sx={{fontSize:"30px",cursor:'pointer'}}
                        color='error'
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => removeNote(deleteNote)}
                    />
                    <Restore 
                        sx={{fontSize:"30px",cursor:'pointer'}}
                        color='success'
                        onClick={() => restoreNote(deleteNote)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default DeleteNote;