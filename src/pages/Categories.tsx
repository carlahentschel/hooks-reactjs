import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CategoryType from '../types/CategoryType';
import generateID from '../utils/generateID';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [titleCategory, setTitleCategory] = useState('');
  const [description, setDescription] = useState('');
  const [valid, setValid] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [categoryRemove, setCategoryRemove] = useState<CategoryType | undefined>(undefined);

  useEffect(()=>{
    if(titleCategory.length > 3){
      const existCategory = categories.find(item => item.title === titleCategory);
      if(existCategory) {
        setValid(false);
      } else {
        setValid(true);
      }
    }else{
      setValid(false);
    }
  }, [titleCategory]);

  const addCategory = () => {
    console.log('Adicionando uma categoria');
    setCategories([...categories,{
      id : generateID(),
      title: titleCategory,
      description
    }]);

    setTitleCategory('');
    setDescription('');

  };

  const openModalRemove = (category: CategoryType) => {
    setCategoryRemove(category);
    setOpen(true); 
  };

  const confirmRemove = () => {
    const index = categories.findIndex(item => item.id === categoryRemove?.id);

    if(index !== -1) {
      setCategories(prevstate => {
        prevstate.splice(index, 1);
        return [...prevstate];
      });
    } 

    setCategoryRemove(undefined);
    setOpen(false);
  };

  const handleClose = () => {
    setCategoryRemove(undefined);
    setOpen(false);
  };
    
  
 
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h3">Categorias</Typography>
      </Grid>

      <Grid item xs={5}>
        <TextField fullWidth value={titleCategory}  onChange={(ev)=> setTitleCategory(ev.target.value) } label="Titulo da categoria" />
      </Grid>
      <Grid item xs={5}>
        <TextField fullWidth value={description}  onChange={(ev)=> setDescription(ev.target.value) } label="Descrição" />
      </Grid>
      <Grid item xs={2}>
        <Button  variant="contained" disabled={!valid} onClick={addCategory} >Cadastrar</Button>
      </Grid>

      <Grid item xs={12}>
        {categories.map(item => {
          return (
            <React.Fragment key={item.id}>
              <ListItem
                secondaryAction={
                  <IconButton onClick={() => openModalRemove(item)} edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>{item.title[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={item.description} />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </Grid>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Você realmente desejar apagar esta categoria?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {categoryRemove?.title}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={confirmRemove} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Grid>
  );
};

export default Categories;
