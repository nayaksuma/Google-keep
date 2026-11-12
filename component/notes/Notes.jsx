import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable  } from 'react-beautiful-dnd';

import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';

//components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {
    let nav=useNavigate()
    useEffect(()=>{
        let access=JSON.parse(localStorage.getItem("Login"))
        if(localStorage.getItem("Login")==access){
            nav("/login")
        }
    },[])
    const { notes, setNotes } = useContext(DataContext);

    const onDragEnd = (result) => {
        if (!result.destination) 
          return;
    
        const items = reorder(notes, result.source.index, result.destination.index);    
        setNotes(items);
    }
    
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                { notes.length > 0 ? 
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <Grid container style={{ marginTop: 16}}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                {
                                    notes
                                    .filter((item)=>item.status=="New")
                                    .map((note, index) => (
                                        <Draggable key={note.id} draggableId={note.id} index={index}>
                                            {(provided, snapshot) => (
                                                <Grid ref={provided.innerRef}
                                                   
                                                >
                                                    <Note note={note} />
                                                </Grid>
                                            )}
                                        </Draggable >
                                    ))
                                }
                                </Grid>
                            )}
                        </Droppable >
                    </DragDropContext>
                : <EmptyNotes /> }
            </Box>
        </Box>
    )
}

export default Notes;