package com.uestc.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Herb {

    private String name;
    private String origin;
    private String appearance;
    private String function;

}
