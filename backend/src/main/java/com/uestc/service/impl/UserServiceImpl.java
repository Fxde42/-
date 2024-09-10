package com.uestc.service.impl;

import com.uestc.entity.UserInfo;
import com.uestc.mapper.UserMapper;
import com.uestc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void update(UserInfo userInfo) {
        userMapper.update(userInfo);
    }

}
