package com.uestc.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result {

    private Integer code; // 1 代表成功, 0 代表失败
    private String msg; // 相应信息
    private Object data; // 返回数据

    public static Result success(){
        return new Result(1, "success", null);
    }

    public static Result success(Object data){
        return new Result(1, "success", data);
    }

    public static Result error(String msg){
        return new Result(0, msg, null);
    }


}
