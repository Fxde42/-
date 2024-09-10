package com.uestc.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class History {
    private String userId;
    private String image;
    private String herbName;
    private String herbOrigin;
    private String herbAppearance;
    private String herbFunction;
    private LocalDateTime searchTime;
}
