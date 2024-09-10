package com.uestc.controller;


import com.uestc.entity.Result;
import com.uestc.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weixin/miniapp/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @GetMapping("/{code}")
    public Result login(@PathVariable String code){
        return loginService.login(code);
    }

}
