import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider} from '@material-ui/core';
import SidebarItem from '../sidebaritem/sidebarItem';
import AddSideBarItem from './AddSideBarItem';

const SidebarComponent = ({ notes, classes, selectedNoteIndex, newNote, selectNote, deleteNote }) => {
  if (notes) {
    return(
      <div className={classes.sidebarContainer}>
        <AddSideBarItem 
        classes={classes}
        newNote={newNote}
        />
        <List>
          {
            notes.map((_note, _idx) => {
              return(
                <div key={_idx} >
                  <SidebarItem
                    _note = {_note}
                    _idx = {_idx}
                    selectedNoteIndex = {selectedNoteIndex}
                    selectNote = {selectNote}
                    deleteNote = {deleteNote}>
                  </SidebarItem>
                  <Divider></Divider>
                </div>
              )
            })
          }
        </List>
      </div>
    )
  } else {
   return(<div>No notes found</div>)
  }
}

export default withStyles(styles)(SidebarComponent);