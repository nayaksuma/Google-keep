import { useContext,useEffect,useState } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const Archive = ({ archive }) => {

    const { countTrue,setCountTrue,count,setCount,archiveNotes, setNotes,notes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);
    
    const unArchiveNote = (singleNote) => {
        let index=notes.findIndex((items)=>items.n_id==singleNote.n_id)
        let updatedSingleNote={
            ...singleNote,
            status:"New"
        }
        let finalNote=[...notes];
        finalNote.splice(index,1,updatedSingleNote);
        setCountTrue(!countTrue)
        localStorage.setItem("Notes",JSON.stringify(finalNote))
    }

    const deleteNote = (singleNote) => {
        let index=notes.findIndex((items)=>items.n_id==singleNote.n_id)
        let updatedSingleNote={
            ...singleNote,
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
                    <Typography>{archive.heading}</Typography>
                    <Typography>{archive.text}</Typography>
                </CardContent>
                <CardActions>
                    <Unarchive 
                    sx={{fontSize:"30px",cursor:'pointer'}}
                    color='primary'
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => unArchiveNote(archive)}
                    />
                    <Delete 
                    sx={{fontSize:"30px",cursor:'pointer'}}
                    color='error'
                        fontSize="small"
                        onClick={() => deleteNote(archive)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Archive;