package com.uestc.mapper;


import com.uestc.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {

    @Select("select * from user where openid = #{openid}")
    UserInfo select(String openid);


}
