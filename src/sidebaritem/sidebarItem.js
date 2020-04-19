import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { removeHTMLTags } from '../helpers';

const SidebarItem = ({_idx, _note, classes, selectedNoteIndex, deleteNote, selectNote}) => {

  const selNote = (n, i) => {
    selectNote(n, i);
  }

  const delNote = (n) => {
    if (window.confirm(`Are you sure you want to delete: ${n.title}`)) {
      deleteNote(n);
    }
  }
  
  return (
    <div>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _idx}
        alignItems='flex-start'>
        <div
          className={classes.textSection}
          onClick={() => {selNote(_note, _idx)}}>
          <ListItemText
          primary={_note.title}
          secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}>
          </ListItemText>
        </div>
        <DeleteForeverIcon 
        onClick={() => delNote(_note)}
        className={classes.deleteIcon}></DeleteForeverIcon>
      </ListItem> 
    </div>   
  )
}

export default withStyles(styles)(SidebarItem);