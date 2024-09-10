package com.uestc.controller;

import com.uestc.entity.UserInfo;
import com.uestc.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/weixin/miniapp/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/update")
    public void update(@RequestBody UserInfo userInfo){
        userService.update(userInfo);
    }

}
