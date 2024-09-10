package com.uestc.mapper;

import com.uestc.entity.UserInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    void update(UserInfo userInfo);

    @Insert("insert into user(openid, nickName, imgURL, gender, phone) values(#{openid},#{nickName},#{imgURL},#{gender},#{phone})")
    void insert(UserInfo userInfo);

}
