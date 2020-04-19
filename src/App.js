import React from 'react';
import EditorComponent from './editor/editor';
import SidebarComponent from './sidebar/sidebar';
import './App.css';

const firebase = require('firebase');

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  render() {
    return(
      <div className='app-container'>
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}></SidebarComponent>
          {
            this.state.selectedNote ?
            <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}></EditorComponent> :
            null
          }
      </div>
    )
  }

  selectNote = (note, idx) => {
    this.setState({selectedNoteIndex: idx, selectedNote: note});
  }

  deleteNote = (note) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();

    const newNotesArr = this.state.notes.filter( _note => _note.id !== note.id);
    if (this.state.selectedNote && (this.state.selectedNote.id !== note.id)){
      this.setState({selectedNoteIndex: newNotesArr.indexOf(this.state.selectedNote)});
    } else {
      this.setState({selectedNoteIndex: null, selectedNote: null});
    }
  }

  newNote = async (title) => {
    const note =  {title,body: ''};
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        ...note,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        ...noteObj,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log('app did mount:', notes);
        this.setState({notes});
      });
  }
};

export default App;
