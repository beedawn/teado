import React, { useState, useEffect } from 'react';

import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentType from '../../../interfaces/CommentInterface';
function EditComment(props: {
  setCommentView: Function;
  editComment: Function;
  setSingleComment: Function;
  singleComment: CommentType | undefined;
}) {
  const setCommentView = props.setCommentView;
  const editComment = props.editComment;
  const commentData = props.singleComment;
  const setCommentData = props.setSingleComment;
  const singleComment = props.singleComment;
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (commentData) {
      setTitle(commentData.title);
      setUser(commentData.user);
      setComment(commentData.comment);
    }
  }, []);
  if (commentData === undefined) {
    setCommentData({
      title: '',
      user: '',
      date: new Date(),
      comment: '',
    });
  }
  if (commentData !== undefined) {
    return (
      <div>
        <div
          onClick={() => {
            setCommentView('');
          }}
        >
          Back to Comments
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formTicket">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter comment"
              value={comment}
              onChange={(e: any) => {
                setComment(e.target.value);
              }}
            />
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={user}
              onChange={(e: any) => {
                setUser(e.target.value);
              }}
            />
          </Form.Group>{' '}
          <Button
            type="submit"
            onClick={() => {
              editComment({
                ticketNumber: commentData.ticketNumber,
                keyValue: commentData.keyValue,
                title: title,
                date: new Date(),
                comment: comment,
                user: user,
              });
              setCommentView('');
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
}

export default EditComment;
