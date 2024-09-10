package com.uestc.service.impl;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.util.WxMaConfigHolder;
import com.uestc.entity.Result;
import com.uestc.entity.UserInfo;
import com.uestc.mapper.LoginMapper;
import com.uestc.mapper.UserMapper;
import com.uestc.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class LoginServiceImpl implements LoginService {

    private final WxMaService wxMaService;

    @Autowired
    private LoginMapper loginMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public Result login(String code) {

        try{
            WxMaJscode2SessionResult session = wxMaService.getUserService().getSessionInfo(code);
            String openid = session.getOpenid();
            UserInfo userInfo = loginMapper.select(openid);
            if(userInfo == null){
                userMapper.insert(new UserInfo(openid,null,null,null,null));
                return Result.success(loginMapper.select(openid));
            }
            else return Result.success(userInfo);
        }catch (WxErrorException e) {
            log.error(e.getMessage(), e);
            return Result.error(e.toString());
        }finally {
            WxMaConfigHolder.remove();
        }
    }


}
