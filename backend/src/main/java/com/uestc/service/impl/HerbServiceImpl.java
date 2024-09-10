package com.uestc.service.impl;

import com.uestc.entity.Herb;
import com.uestc.entity.History;
import com.uestc.entity.Result;
import com.uestc.entity.Search;
import com.uestc.mapper.HerbMapper;
import com.uestc.service.HerbService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class HerbServiceImpl implements HerbService {


    @Autowired
    private HerbMapper herbMapper;

    @Override
    public Result searchHerb(Search search) {
        Herb herb = herbMapper.searchHerb(search.getName());
        if(herb != null){
            saveHistory(search.getUserId(), search.getImage(), herb);
            return Result.success(herb);
        }
        else{
            return Result.error("对不起，没有找到您查询的中草药...");
        }
    }

    @Override
    public void saveHistory(String userId, String image, Herb herb) {
        History history = new History();
        history.setUserId(userId);
        history.setImage(image);
        history.setHerbName(herb.getName());
        history.setHerbOrigin(herb.getOrigin());
        history.setHerbAppearance(herb.getAppearance());
        history.setHerbFunction(herb.getFunction());
        history.setSearchTime(LocalDateTime.now());
        herbMapper.saveHistory(history);
    }

    @Override
    public Result searchHistory(String userId) {

        List<History> histories = herbMapper.searchHistory(userId);
        log.info("{}",histories);

        return Result.success(histories);
    }


}
