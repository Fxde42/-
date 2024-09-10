package com.uestc.mapper;

import com.uestc.entity.Herb;
import com.uestc.entity.History;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HerbMapper {

    @Select("select * from herbs where name = #{name}")
    Herb searchHerb(String name);

    @Insert("insert into history(userId, image, herbName, herbOrigin, herbAppearance, herbFunction, searchTime)" +
            "value (#{userId}, #{image}, #{herbName}, #{herbOrigin}, #{herbAppearance}, #{herbFunction}, #{searchTime})")
    void saveHistory(History history);

    @Select("select * from history where userId = #{userId}")
    List<History> searchHistory(String userId);
}
