package com.uestc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    private String openid;
    private String nickName;
    private String imgURL;
    private Character gender;
    private String phone;

}
