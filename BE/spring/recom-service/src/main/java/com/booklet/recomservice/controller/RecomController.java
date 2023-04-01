package com.booklet.recomservice.controller;

import com.booklet.recomservice.service.RecomService;
import com.booklet.recomservice.util.RequestTools;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1/recom")
@RequiredArgsConstructor
public class RecomController {

    private final RecomService recomService;

    @GetMapping("/score/{username}")
    public ResponseEntity findScoreRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("score",username);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/like/{username}")
    public ResponseEntity findLikeRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("like",username);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/genre/{username}")
    public ResponseEntity findGenreRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("genre",username);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity findUserRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("user",username);
        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/cover/{username}")
    public ResponseEntity findRecomBookCover(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookCoverRecom(username);
        if (result == null) {
            HashMap<String, Object> failresult = new HashMap<>();
            failresult.put("message", "fail");
            return new ResponseEntity<>(failresult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }
}
