package com.example.demo_hemant.dto;

import com.example.demo_hemant.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserDto user;

    @Data
    @AllArgsConstructor
    public static class UserDto {
        private Long id;
        private String username;
        private String email;

        public static UserDto fromUser(User user) {
            return new UserDto(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail()
            );
        }
    }
}
