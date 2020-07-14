import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GradeIcon from '@material-ui/icons/Grade';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

export default function ImageItem(props) {

  const { image, handleSavePhoto, savedPhotos} = props;
  const isSaved = savedPhotos.some(sImage => sImage.id === image.id)
  
  return (
    <Box style={styles.listItem}>
      <div style={styles.imageWrapper}>
        <img style={styles.image} src={image.largeImageURL} />
        <Button onClick={handleSavePhoto(image)} disabled={isSaved} style={styles.imageButton}>
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </div>
      <Box p={2} style={styles.listItemMeta}>
        <Box style={styles.chips}>
          {
            image.tags && image.tags.split(",").map(tag => (
              <Chip style={styles.chip} size="small" label={tag} />
            ))
          }
        </Box>
        <Grid container spacing={3}>
          <Grid item>
            {image.likes}<ThumbUpIcon style={styles.metaIcon} />
          </Grid>
          <Grid item>
            {image.favorites}<GradeIcon style={styles.metaIcon}/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
const styles = {
  imageWrapper: {
    width: '350px', 
    position: 'relative', 
    flex: 'none' 
  },
  image: {
    width: '100%'
  },
  imageButton: {
    width: '100%', 
    position: 'absolute', 
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 14px',
    borderRadius: 0,
    boxSizing: 'border-box'
  },
  listItem: {
    display: 'flex',
    marginBottom: '20px',
  },
  listItemMeta: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  metaIcon: {
    fontSize: '12px',
    marginLeft: '4px',
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