import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Button } from '@material-ui/core';

const AddSideBarItem = ({classes, newNote}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    setIsAddingNote(!isAddingNote)
  }

  const updateTitle = (txt) => {
    setTitle(txt)
  }

  const createNewNote = () => {
    newNote(title)
    setIsAddingNote(!isAddingNote)
    setTitle(null)
  }

  return(
    <div>
      <Button
        onClick={newNoteBtnClick}
        className={classes.newNoteBtn}>
        {isAddingNote ? 'Cancel' : 'New Note'}
      </Button>
      {
        isAddingNote ?
        <div>
          <input 
            type='text'
            className={classes.newNoteInput}
            placeholder='Enter note title'
            onKeyUp={(e) => {updateTitle(e.target.value)}}>
          </input>
          <Button
            className={classes.newNoteSubmitBtn}
            onClick={createNewNote}>Submit note
          </Button>
        </div> : 
        null
      }
    </div>
  ) 
}

export default withStyles(styles)(AddSideBarItem);