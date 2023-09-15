package com.backend.rssparser.controller;

import com.backend.rssparser.entity.Rss;
import com.backend.rssparser.mapper.RssCRUD;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/rss-reader")
public class RssController {

    @Resource
    RssCRUD rssCRUD;

    @GetMapping ("/get")
    public List<Rss> getRss(){
        List<Rss> list = rssCRUD.selectList(null);
        return list;
    }
}
