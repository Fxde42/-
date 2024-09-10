package com.uestc.service;

import com.uestc.entity.Herb;
import com.uestc.entity.Result;
import com.uestc.entity.Search;

public interface HerbService {
    Result searchHerb(Search search);
    void saveHistory(String userId, String image, Herb herb);

    Result searchHistory(String userId);
}
