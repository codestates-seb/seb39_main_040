package seb39_40.coffeewithme.common.service;

import org.springframework.security.core.context.SecurityContextHolder;

public class GetUserInfo {
    public static String getUserId(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
