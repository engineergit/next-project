"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentsType, PostType } from "@/app/_interfaces/home.types";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";
import logo from "../../../assets/images/profile.jpg";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addComment, getAllPosts } from "@/lib/Redux/PostsSlice";
import { reduxStore } from "@/lib/Redux/ReduxStore";
import toast from "react-hot-toast";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({
  postObj,
  isAllComments = false,
}: {
  postObj: PostType;
  isAllComments?: boolean;
}) {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [expanded, setExpanded] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      content: "",
      post: postObj._id,
    },
    onSubmit: function (values) {
      console.log(values);
      dispatch(addComment(values)).then((res: any) => {
        if (res.payload.data.message == "success") {
          toast.success("Comment added Successfuly", { position: "top-right" });

          console.log(res);
         
           dispatch(getAllPosts(30));
        } else {
          //toast.error("incorrect Email or Password", { position: "top-right" });
          console.log(res);
        }
      });
    },
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const router = useRouter();

  const handleNavigate = (id: string) => {
    router.push(`/user/${id}`);
  };

  const handleImageSrc = (
    imagePath: string | undefined
  ): string | StaticImageData => {
    if (typeof imagePath == "undefined") return logo;
    const allKeywords = imagePath.split("/");
    const lastKeyword = allKeywords[allKeywords.length - 1];
    if (lastKeyword == "undefined") {
      return logo;
    }
    return imagePath;
  };

  const handleViewPostInfo = (id: string) => {
    router.push(`/post/${id}`);
  };

  return (
    <>
  
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            onClick={() => handleNavigate(postObj.user._id)}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            <Image
              src={handleImageSrc(postObj.user.photo)}
              alt={postObj.user.name}
              height={50}
              width={50}
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postObj.user.name}
        subheader={postObj.createdAt}
        titleTypographyProps={{
          sx: {
            width: "fit-content",
            cursor: "pointer",
          },
          onClick: () => handleNavigate(postObj.user._id),
        }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postObj.body}
        </Typography>
      </CardContent>
      {!!postObj.image && (
        <CardMedia
          component="img"
          height="194"
          image={postObj.image}
          alt={postObj.user.name}
          sx={{ objectFit: "contain" }}
        />
      )}

      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      <Box component="section">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            placeholder="add your comment"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="content"
            id="content"
          />
          <Button
            sx={{
              backgroundColor: "blue",
              color: "white",
              marginInline: "auto",
              display: "block",
              ":hover": { backgroundColor: "green" },
              marginTop: "2px",
            }}
            type="submit"
          >
            add comment
          </Button>
        </form>

        {!!postObj.comments?.length && isAllComments ? (
          postObj.comments.map((comment: CommentsType) => (
            <Box key={comment._id}>
              <CardHeader
                avatar={
                  <Avatar
                    onClick={() => handleNavigate(comment.commentCreator._id!)}
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  >
                    <Image
                      src={handleImageSrc(comment.commentCreator.photo)}
                      alt={comment.commentCreator.name}
                      height={50}
                      width={50}
                    />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={comment.commentCreator.name}
                subheader={postObj.createdAt}
                titleTypographyProps={{
                  sx: {
                    width: "fit-content",
                    cursor: "pointer",
                  },
                  onClick: () =>
                    handleNavigate(postObj.comments?.[0].commentCreator._id!),
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {comment.content}
                </Typography>
              </CardContent>
            </Box>
          ))
        ) : (
          <Box>
            <CardHeader
              avatar={
                <Avatar
                  onClick={() =>
                    handleNavigate(postObj.comments?.[0]?.commentCreator._id!)
                  }
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                >
                  <Image
                    src={handleImageSrc(
                      postObj.comments?.[0]?.commentCreator.photo!
                    )}
                    alt={postObj.comments?.[0]?.commentCreator.name!}
                    height={50}
                    width={50}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={postObj.comments?.[0]?.commentCreator.name}
              subheader={postObj.createdAt}
              titleTypographyProps={{
                sx: {
                  width: "fit-content",
                  cursor: "pointer",
                },
                onClick: () =>
                  handleNavigate(postObj.comments?.[0]?.commentCreator._id!),
              }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {postObj.comments?.[0]?.content}
              </Typography>
            </CardContent>
            {(postObj.comments?.length || 0) > 1 && (
              <Typography
                onClick={() => handleViewPostInfo(postObj._id)}
                component="p"
                variant="h6"
                sx={{
                  color: "white",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "fit-content",
                  backgroundColor: "yellowgreen",
                  marginInline: "auto",
                  my: "5px",
                  p: "10px",
                  borderRadius: "10px",
                  transition: "all 300ms",
                  ":hover": {
                    backgroundColor: "goldenrod",
                  },
                }}
              >
                view more comments
              </Typography>
            )}
          </Box>
        )}
      </Box>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
    </>
    
  
    
    
  );
}
