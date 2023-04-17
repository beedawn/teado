import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../../styles/styles.css";
function CommentNavBar(props:{setCommentView:Function}) {
const setCommentView = props.setCommentView;
    return (
       <div>
    <Button onClick={()=>{setCommentView("add"); console.log("yolo")}}>Add Comment </Button>
    </div>

    )}

export default CommentNavBar;
