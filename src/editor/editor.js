import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      body: '',
      title: '',
      id: ''
    }
  }

  componentDidMount = () => {
    this.setState({...this.props.selectedNote})
  }

  componentDidUpdate = () => {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState({...this.props.selectedNote})
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
      <BorderColorIcon
      className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder='Note Title..'
        value={this.state.title ? this.state.title: ''}
        onChange={(e) => this.updateTitle(e.target.value)}></input>
      <ReactQuill 
        value={this.state.body} 
        onChange= {this.updateBody}>
      </ReactQuill>
      </div>
    );
  }
  updateBody = async (body) => {
    await this.setState({body});
    this.update();
  }

  updateTitle = async (title) => {
    await this.setState({title});
    this.update();
  }
  update = debounce((id, noteObj) => {
    this.props.noteUpdate(this.state.id,{
      title: this.state.title,
      body: this.state.body
    })
  }, 1500)
}

export default withStyles(styles)(EditorComponent);