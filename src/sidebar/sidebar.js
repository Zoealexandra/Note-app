import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    }
  }
  render() {
    const { notes, classes, selectedNoteIndex  } = this.props;
    if (notes) {
      return(
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}>
            {this.state.addingNote ? 'Cancel' : 'New Note'}
          </Button>
          {
            this.state.addingNote ?
            <div>
              <input 
                type='text'
                className={classes.newNoteInput}
                placeholder='Enter note title'
                onKeyUp={(e) => {this.updateTitle(e.target.value)}}>
              </input>
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}>Submit note
              </Button>
            </div> : 
            null
          }
          <List>
            {
              notes.map((_note, _idx) => {
                return(
                  <div key={_idx} >
                    <SidebarItemComponent
                      _note = {_note}
                      _idx = {_idx}
                      selectedNoteIndex = {selectedNoteIndex}
                      selectNote = {this.selectNote}
                      deleteNote = {this.deleteNote}>
                    </SidebarItemComponent>
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
  newNoteBtnClick = () => {
    this.setState({title: null, addingNote: !this.state.addingNote})
  }

  updateTitle = (txt) => {
    this.setState({title: txt});
    console.log('txt here:', txt);
  }

  newNote = () => {
    this.props.newNote(this.state.title)
    this.setState({
      title: null, 
      addingNote: false
    })
  }

  selectNote = (n, i) => {
    this.props.selectNote(n, i);
  }

  deleteNote = (note) => {
    this.props.deleteNote(note)
  }
}

export default withStyles(styles)(SidebarComponent);