import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentType from "../../../interfaces/CommentInterface";
import commentApiCall from "../../../apiCall/commentApiCall";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";
import "../../../styles/styles.css";
import TicketType from "../../../interfaces/TicketInterface";
import Sort from "../Sort";
import CommentNavBar from "./CommentNavBar";
import EditComment from "./EditComment";
function CommentView(props: {
    comments: Array<CommentType>;
    setComments: Function;
    ticket: TicketType;
    commentAdded?:boolean;
    setCommentAdded?:Function;
}) {
    
    const comments = props.comments;
    const setComments = props.setComments;
    const [sortPref, setSortPref] = useState(true);
    const [commentView, setCommentView]=useState("");
    const [singleComment, setSingleComment]=useState();
    const commentAdded=props.commentAdded;
    const setCommentAdded=props.setCommentAdded;
    comments.sort((a: CommentType, b: CommentType) =>
        a.date > b.date ? 1 : -1
    );
   

    function newComment (comment:CommentType){
        commentApiCall(setComments,"/","POST",comment);
    }
    function deleteComment(comment:CommentType){
        commentApiCall(setComments, comment.id.toString(), "DELETE", comment);
    }
    function editComment(comment:CommentType){
        commentApiCall(setComments,comment.keyValue,"PUT",comment);
    }
   
    if (sortPref === false) {
       comments.sort((a: CommentType, b: CommentType) =>
            a.date > b.date ? -1 : 1
        );
    }
    // if(commentView==="add"){
    //     return(<AddComment ticket={props.ticket} newComment={newComment} setCommentView={setCommentView}/>)
    // }
    if(commentView==="edit"){
        return(<div>edit
<EditComment setCommentView={setCommentView} editComment={editComment} singleComment={singleComment} setSingleComment={setSingleComment}/>
          
        </div>)
    }

    if(comments!==undefined){
       console.log(comments)
    return (
       <div>
        {/* <CommentNavBar setCommentView={setCommentView}/> */}
        {comments.length>0?<Sort sortPref={sortPref} setSortPref={setSortPref} />:<></>}
        <div className="commentContainer">{comments.map((comment: CommentType) => (<SingleComment key={comment.id} comment={comment} setCommentView={setCommentView} deleteComment={deleteComment} setSingleComment={setSingleComment} commentAdded={commentAdded} setCommentAdded={setCommentAdded}/>))}
        </div>
    </div>

    )}

   
else{ return(<></>)}}

export default CommentView;
