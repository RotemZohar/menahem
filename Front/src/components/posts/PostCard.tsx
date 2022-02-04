import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function PostCard(props: { imgUrl: string, title: string, text: string }) {
    const { imgUrl, title, text } = props;

  return (
    <Card sx={{ maxWidth: 345, marginTop: 5 }}>
    <CardMedia
      component="img"
      height="140"
      image={imgUrl}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </CardContent>
  </Card>
  );
}

export default PostCard;