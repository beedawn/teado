package com.teado.teado.controller;

import com.teado.teado.model.Comment;
import com.teado.teado.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins="http://localhost:3001")
@RestController
@RequestMapping("/api")
public class CommentController {


    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getAllComments(@RequestParam(required = false) String title) {
        try {
            List<Comment> comments = new ArrayList<Comment>();
            if (title == null) {
                commentRepository.findAll().forEach(comments::add);
            } else {
                commentRepository.findByTitleContaining(title).forEach(comments::add);
            }

            if (comments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable("id") long id){
        Optional<Comment> commentData = commentRepository.findById(id);

        if(commentData.isPresent()) {
            return new ResponseEntity<>(commentData.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/comments")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment){    //public Ticket(String title, String name, String email, String description)
        try{
            Comment _comment = commentRepository.save(new Comment(comment.getTitle(),comment.getUser(),comment.getComment(),comment.getDate(),comment.getTicketNumber(),comment.getKeyValue(),comment.getTicketId()));
            return new ResponseEntity<>(_comment,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable("id") String id, @RequestBody Comment comment){
        List<Comment> commentData = commentRepository.findByKeyValue(id);
        if(commentData.get(0).isPresent()){
            Comment _comment = commentData.get(0);
            _comment.setTitle(comment.getTitle());
            _comment.setComment(comment.getComment());
            _comment.setUser(comment.getUser());
            _comment.setDate(comment.getDate());
            _comment.setTicketNumber(comment.getTicketNumber());


            return new ResponseEntity<>(commentRepository.save(_comment), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable("id") long id){
        try{
            commentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @DeleteMapping("/comments")
    public ResponseEntity<HttpStatus> deleteAllComments(){
        try{
            commentRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
