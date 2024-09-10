package com.uestc.controller;



import com.uestc.entity.History;
import com.uestc.entity.Result;
import com.uestc.entity.Search;
import com.uestc.service.HerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/weixin/miniapp/herb")
public class HerbController {

    @Autowired
    private HerbService herbService;

    @PostMapping ("/search")
    public Result searchHerb(@RequestBody Search search){
        return herbService.searchHerb(search);
    }

    @GetMapping("/history/{userId}")
    public Result searchHistory(@PathVariable String userId){
        return herbService.searchHistory(userId);
    }

}