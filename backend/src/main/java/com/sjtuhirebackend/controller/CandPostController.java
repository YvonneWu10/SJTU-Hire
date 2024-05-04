package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CandPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.ArrayList;

@RestController
@Slf4j
public class CandPostController {
    @Autowired
    private CandPostService candPostService;
    @Autowired
    private AuthService authService;

    @RequestMapping("/candidate_view/DeliveredPost")
    public ResponseEntity<Map<String, Object>> getCandPostForCandidate(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candPostService.getCandPostDetailByCandId(id), HttpStatus.OK);
    }
}