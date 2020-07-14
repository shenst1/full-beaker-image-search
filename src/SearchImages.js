import React from 'react';
import fetch from 'node-fetch';
import ImageItem from './ImageItem';
import Loading from './Loading';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import qs from 'qs';


import categories from './categories';


/*
Ways to improve the app going forward
-localstorage is temporary, would need a back-end
-remove saved photos
-clear all saved photos
-generic handleChange method for any text input
-handle error when calling pixabay
-unify css strategy
-Set images as center cropped background images in
order to have a consistent height
-Move components to a components folder
*/


export default function SearchImages() {
  const imageSource = 'https://pixabay.com/api/';
  const pixabayApiKey = "13136421-266c28a6d61717bc2e4e6a83e";
  const [searchTerm, setSearchTerm] = React.useState();
  const [category, setCategory] = React.useState();
  const [images, setImages] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedPhotos, setSavedPhotos] = React.useState(
    JSON.parse(localStorage.getItem('savedPhotos') || '[]')
  );
 
  React.useEffect(() => {
    localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos));
  }, [savedPhotos]);

  async function getImages() {
    try {
      const params = qs.stringify({
        key: pixabayApiKey,
        q: searchTerm,
        per_page: 10,
        category
      });
      const getURL = `${imageSource}?${params}`;
      const response = await fetch(getURL);
      const images = await response.json();
      setImages(images);
      setIsLoading(false);
    } catch(e) {
      console.log(e)
    }
  }

  const handleSubmit = (evt) => {
    setIsLoading(true)
    getImages()
  }
  
  /* 
    Keeping it sample and making them named handlers.
    Long term, a generic `handleChange` method would be better
    where the state is set based off the input fields name prop
  */
  const handleCategoryChange = (event, value) => {
    setCategory(value)
  }

  const handleSearchChange = (event) => {
    let value = event.target.value;
    value = value.toLowerCase().replace(/\s/g, '')
    setSearchTerm(value);
  }
  
  const handleSavePhoto = (photo) => () => {
    setSavedPhotos(savedPhotos.concat(photo));
  }
  
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box m={2}>
          <form noValidate autoComplete="off">
            <TextField style={{width: '100%'}} 
              id="search-keyword" 
              onChange={handleSearchChange} 
              name="searchKeyword" 
              variant="outlined"
              label="Search keyword" />
            <Autocomplete
                id="category"
                freeSolo
                options={categories}
                onChange={handleCategoryChange}
                renderInput={(params) => (
                  <TextField {...params} name="category " label="Category" margin="normal" variant="outlined" />
                )}
              />
            <Button style={{width: '100%'}} variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
          </form>
          {
            isLoading ? (
              <Loading />
            ) : (
              <Box mt={2}>
                {
                  images && images.hits && images.hits.map(image => (
                    <ImageItem 
                      image={image} 
                      handleSavePhoto={handleSavePhoto}
                      savedPhotos={savedPhotos}
                      />
                  ))
                }
              </Box>
            )
          }
       </Box>
      </Container>
      <nav style={styles.savedContainer}>
          <h3>Saved</h3>
          <List>
            {
              savedPhotos.map(photo => (
                <ListItem component="a" target="_blank" href={photo.pageURL}>
                  <ListItemText primary={`#${photo.id}`} />
                  <ListItemIcon >
                    <OpenInNewIcon fontSize="small"/>
                  </ListItemIcon>
                </ListItem>
              ))
            }
          </List>
        </nav>
    </React.Fragment>
  )
}
const styles = {
  container: {
    display: 'flex'
  },
  savedContainer: {
    width: '300px',
    height: '100vh',
    padding: '16px 16px 16px 0px',
    position: 'sticky',
    overflowY: 'auto',
    top: 0,
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    marginBottom: '10px',
    marginRight: '10px'
  }
}