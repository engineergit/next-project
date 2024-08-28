"use client";
import styles from "../../page.module.css";
import { Box, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { reduxStore } from "@/lib/Redux/ReduxStore";
import { useState } from "react";
import { useFormik } from "formik";
import { PhotoCamera } from '@mui/icons-material';
import Button from "@mui/material/Button";
import { addPost } from "@/lib/Redux/PostsSlice";
import AnimatedTick from './Animation/AnimatedTick';

interface FormValues {
  postText: string;
  image: File | null;
}

export default function CreatePost() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [showTick, setShowTick] = useState<boolean>(false); // State for animated tick visibility
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  const formik = useFormik<FormValues>({
    initialValues: {
      postText: '',
      image: null,
    },
    onSubmit: (values) => {
      if (selectedImage) {
        dispatch(addPost({ body: values.postText, image: selectedImage }))
          .then(() => {
            // Show animated tick on successful submission
            setShowTick(true);
            setTimeout(() => {
              setShowTick(false); // Hide tick after animation
            }, 2000); // Match this duration with your animation
            formik.resetForm();
            setSelectedImage(null);
            setImageName("");
          })
          .catch((error) => {
            console.error("Submission error: ", error);
          });
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setImageName(file.name);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        className={styles.container}
      >
        <Typography variant="h6" className={styles.heading}>
          Create a Post
        </Typography>
        <TextField
          name="postText"
          placeholder="What's on your mind?"
          multiline
          rows={isSmallScreen ? 3 : 4}
          variant="outlined"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.postText}
          className={styles.textField}
        />
        <Box className={styles.actions}>
          <Box className={styles.uploadContainer}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              className={styles.uploadButton}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
              <PhotoCamera titleAccess="Upload picture" />
            </IconButton>
            <Box className={styles.fileNames}>
              {imageName && (
                <Typography className={styles.fileName}>
                  {imageName}
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            className={styles.postButton}
          >
            Post
          </Button>
        </Box>
      </Box>
      <AnimatedTick visible={showTick} />
    </>
  );
}
