import React, { useState} from 'react';
import useStyles from './styles';
import { Button, Typography, Paper, TextField } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';

const Form = () => {

  const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: '',});
  const classes = useStyles();
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    console.log(dispatch(createPost(postData)));
};

  const clear = () => {
    
  }

  return (
    <Paper className={ classes.paper }>
      <form autoComplete="off" noValidate className={ `${classes.root} ${classes.form}` } onSubmit={ handleSubmit }>
        <Typography variant="h6">Share your best moments</Typography>
        <TextField name='creator' variant='outlined' label='Creator' fullWidth value={ postData.creator } onChange={(e) => setPostData({...postData, creator: e.target.value })}
          // ^^^ Have to use the spread operator. If I just put setPostData to e.target.value if only one area is changed it will reset all fields without spread operator.
           />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase 
            type='file' 
            multiple={false} 
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} 
            />
            <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth={true}>
              Submit
            </Button>
            <Button variant='contained' color='secondary' size='small' fullWidth={true}
              onClick={ clear }
            >
              Clear
            </Button>
        </div>
      </form>
    </Paper>
  )
}

export default Form