package com.sjtuhirebackend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private int status;
    private String msg;
    private Object data;

    public Message(MessageEnumInterface msg, Object data){
        this.status = msg.getStatus();
        this.msg = msg.getMsg();
        this.data = data;
    }
    public Message(MessageEnumInterface msg){
        this.status = msg.getStatus();
        this.msg = msg.getMsg();
        this.data = "";
    }

    private static final ObjectMapper mapper = new ObjectMapper();
    @Override
    public String toString() {
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}