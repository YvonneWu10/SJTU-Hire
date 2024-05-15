package com.sjtuhirebackend.utils;

import java.util.Random;


public class TokenGenerator {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String generateToken(int length) {
        StringBuilder token = new StringBuilder(length);
        Random rnd = new Random();

        for (int i = 0; i < length; i++) {
            int index = rnd.nextInt(CHARACTERS.length());
            token.append(CHARACTERS.charAt(index));
        }

        return token.toString();
    }
}